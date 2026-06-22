import { onMounted, onUnmounted, ref, readonly } from 'vue'
import { getSupabase, isSupabaseConfigured } from '~/lib/supabase'
import { DISPLAY_ID } from '~/lib/heartbeat'
import {
  executeReload,
  executeGoHome,
  executeBlackout,
  executeEmergency,
} from '~/services/commandExecutor'

/**
 * useCommandListener — Phase 4.
 *
 * Subscribes to Supabase Realtime INSERTs on `display_commands`
 * filtered by `display_id = DISPLAY_ID`. For every new row:
 *   1. Skip if already executed (Realtime can deliver the same
 *      row twice on reconnect).
 *   2. Run the matching executor.
 *   3. Write executed_at = now() back to the row.
 *
 * Diagnostics: the composable exposes `status`, `lastReceived`,
 * `lastError`, `receivedCount`, `lastAckId`, `lastAckError` so the
 * debug overlay (components/CommandDebugOverlay.vue) can render
 * the live state of the listener without console-only output.
 *
 * Failure modes we handle explicitly:
 *   - Supabase not configured → status='disabled', no subscription
 *   - Realtime subsystem rejects subscribe → status='error'
 *   - Channel CLOSED / CHANNEL_ERROR → status='closed'
 *   - payload missing → handler returns early (no ack written)
 *   - ackCommand() failure → logged + surfaced via lastAckError
 *     but the executor still ran (so the kiosk action happened)
 */

export type CommandName =
  | 'reload' | 'go_home' | 'blackout' | 'emergency_message'

export type ListenerStatus =
  | 'idle'
  | 'subscribing'
  | 'subscribed'
  | 'closed'
  | 'error'
  | 'disabled'

export type CommandRow = {
  id: string
  display_id: string
  command: CommandName
  payload: Record<string, unknown> | null
  created_at: string
  executed_at: string | null
}

/* -----------------------------------------------------------------
 * Shared reactive state — singleton across the app. Multiple calls
 * to useCommandListener() are de-duplicated via _started so HMR /
 * navigation doesn't open duplicate channels.
 * ----------------------------------------------------------------- */

const status = ref<ListenerStatus>('idle')
const lastReceived = ref<CommandRow | null>(null)
const lastError = ref<string | null>(null)
const receivedCount = ref(0)
const lastAckId = ref<string | null>(null)
const lastAckError = ref<string | null>(null)

let channel: ReturnType<ReturnType<typeof getSupabase>['channel']> | null = null
let _started = false

export function useCommandListener() {
  onMounted(() => {
    if (_started) {
      log('already started; not opening a second channel')
      return
    }
    _started = true
    start()
  })

  onUnmounted(() => {
    // Intentionally NOT removing the channel — the composable lives
    // in app.vue which never unmounts during a kiosk session. We
    // only close it if we explicitly shut down (HMR teardown).
  })

  return {
    status: readonly(status),
    lastReceived: readonly(lastReceived),
    lastError: readonly(lastError),
    receivedCount: readonly(receivedCount),
    lastAckId: readonly(lastAckId),
    lastAckError: readonly(lastAckError),
  }
}

async function start() {
  if (!isSupabaseConfigured()) {
    status.value = 'disabled'
    lastError.value = 'Supabase env vars missing'
    log('Supabase not configured — listener disabled')
    return
  }
  const sb = getSupabase()
  if (!sb) {
    status.value = 'disabled'
    return
  }

  status.value = 'subscribing'
  log(`opening channel commands:${DISPLAY_ID} filter=display_id=eq.${DISPLAY_ID}`)

  channel = sb
    .channel(`commands:${DISPLAY_ID}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'display_commands',
        filter: `display_id=eq.${DISPLAY_ID}`,
      },
      (payload) => {
        const row = (payload as unknown as { new: CommandRow }).new
        log(`RAW payload received: ${JSON.stringify(payload).slice(0, 200)}`)
        if (!row) {
          lastError.value = 'Empty payload'
          return
        }
        void handleCommand(row)
      },
    )

  try {
    const result = await channel.subscribe((subStatus, err) => {
      log(`subscribe() callback: status=${subStatus} err=${err?.message ?? 'none'}`)
      if (subStatus === 'SUBSCRIBED') {
        status.value = 'subscribed'
        log('Realtime SUBSCRIBED ✓')
      } else if (subStatus === 'CHANNEL_ERROR') {
        status.value = 'error'
        lastError.value = err?.message ?? 'channel error'
        log(`Realtime CHANNEL_ERROR: ${lastError.value}`)
      } else if (subStatus === 'CLOSED') {
        status.value = 'closed'
        log('Realtime CLOSED')
      } else if (subStatus === 'TIMED_OUT') {
        status.value = 'error'
        lastError.value = 'subscribe timed out'
        log('Realtime TIMED_OUT')
      }
    })
    log(`subscribe() resolved: ${String(result)}`)
  } catch (err) {
    status.value = 'error'
    lastError.value = err instanceof Error ? err.message : String(err)
    log(`subscribe() threw: ${lastError.value}`)
  }
}

async function handleCommand(row: CommandRow) {
  // Realtime can deliver the same row twice on reconnect; skip if
  // already executed.
  if (row.executed_at) {
    log(`row ${row.id} already executed at ${row.executed_at}; skipping`)
    return
  }
  lastReceived.value = row
  receivedCount.value += 1
  log(`received #${receivedCount.value} ${row.command} (id=${row.id})`)

  try {
    switch (row.command) {
      case 'reload':
        // window.location.reload() tears down the page. ack first
        // with keepalive so the request survives the navigation.
        await ackCommand(row.id)
        await executeReload()
        break
      case 'go_home':
        // window.location.href navigation starts immediately; ack
        // first (keepalive) so the request survives the unload.
        await ackCommand(row.id)
        await executeGoHome()
        log(`navigated to home=${window.location.pathname}`)
        break
      case 'blackout': {
        const on = Boolean((row.payload as { on?: unknown } | null)?.on ?? true)
        await executeBlackout(on)
        await ackCommand(row.id)
        break
      }
      case 'emergency_message': {
        const msg = (row.payload as { message?: unknown } | null)?.message
        const on = (msg ?? '').toString().length > 0
        await executeEmergency(on, msg == null ? null : String(msg))
        await ackCommand(row.id)
        break
      }
      default:
        lastError.value = `unknown command: ${row.command}`
        log(`unknown command ${row.command}`)
    }
  } catch (err) {
    lastError.value = err instanceof Error ? err.message : String(err)
    log(`execution failed: ${lastError.value}`)
  }
}

async function ackCommand(id: string): Promise<void> {
  const sb = getSupabase()
  if (!sb) return
  const { error } = await sb
    .from('display_commands')
    .update({ executed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) {
    lastAckError.value = `${id.slice(0, 8)}: ${error.message}`
    log(`ack FAILED for ${id}: ${error.message} (code=${error.code})`)
  } else {
    lastAckId.value = id
    lastAckError.value = null
    log(`ack OK for ${id}`)
  }
}

/* -----------------------------------------------------------------
 * Logging — always writes to console (Vercel users can inspect via
 * DevTools) and also mirrors to localStorage so the debug overlay
 * can show the last N entries even when DevTools is closed.
 * ----------------------------------------------------------------- */
const LOG_KEY = `nu-display:${DISPLAY_ID}:cmdLog`
function log(msg: string): void {
  const line = `[${new Date().toISOString()}] ${msg}`
  // eslint-disable-next-line no-console
  console.log(line)
  if (typeof window === 'undefined') return
  try {
    const prev = window.localStorage.getItem(LOG_KEY)
    const arr = prev ? (JSON.parse(prev) as string[]) : []
    arr.push(line)
    while (arr.length > 50) arr.shift()
    window.localStorage.setItem(LOG_KEY, JSON.stringify(arr))
  } catch {
    // localStorage might be full or disabled — non-fatal
  }
}