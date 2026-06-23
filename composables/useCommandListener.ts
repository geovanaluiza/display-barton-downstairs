import { onMounted, onUnmounted, ref, readonly } from 'vue'
import { getSupabase, isSupabaseConfigured } from '~/lib/supabase'
import { DISPLAY_ID } from '~/lib/heartbeat'
import {
  executeReload,
  executeGoHome,
  executeBlackout,
  executeEmergency,
  executeClearBlackout,
  executeClearEmergency,
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
 * Auto-starts when the module is imported (see the side-effect
 * block at the bottom of this file). You do NOT need to call
 * useCommandListener() in your code — the Realtime channel opens
 * the moment this module is evaluated by the bundler.
 *
 * Diagnostics: the composable exposes `status`, `lastReceived`,
 * `lastError`, `receivedCount`, `lastAckId`, `lastAckError` so the
 * debug overlay (components/CommandDebugOverlay.vue) can render
 * the live state of the listener without console-only output.
 */

export type CommandName =
  | 'reload' | 'go_home' | 'blackout' | 'emergency_message'
  | 'clear_blackout' | 'clear_emergency'

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
 * Shared reactive state — singleton across the app.
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
  if (typeof window !== 'undefined' && !_started) {
    start()
  }
  onMounted(() => { if (!_started) start() })
  onUnmounted(() => { /* keep alive across pages */ })
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
  if (_started) return
  if (typeof window === 'undefined') return
  _started = true

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
        await ackCommandKeepalive(row.id)
        await executeReload()
        break
      case 'go_home':
        await ackCommandKeepalive(row.id)
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
      case 'clear_blackout':
        await executeClearBlackout()
        await ackCommand(row.id)
        log('blackout cleared')
        break
      case 'clear_emergency':
        await executeClearEmergency()
        await ackCommand(row.id)
        log('emergency cleared')
        break
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

async function ackCommandKeepalive(id: string): Promise<void> {
  const url = (typeof import.meta !== 'undefined'
    && (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL) || ''
  const key = (typeof import.meta !== 'undefined'
    && (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY) || ''
  if (!url || !key) {
    log('ackKeepalive: missing env vars')
    return
  }
  try {
    fetch(`${url}/rest/v1/display_commands?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ executed_at: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => { /* keepalive is best-effort */ })
    log(`ackKeepalive dispatched for ${id}`)
  } catch (err) {
    log(`ackKeepalive threw: ${err instanceof Error ? err.message : String(err)}`)
  }
}

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
    // non-fatal
  }
}

// Auto-start on the client. This block is a guaranteed side-effect
// (writes to document.documentElement) so Vite/Rollup cannot
// tree-shake this module out of the production bundle. We use
// `inGlobalContext` (a one-time-set boolean) instead of
// `typeof window !== 'undefined'` because Vite's minifier rewrites
// that comparison to a single character (`<`) which then evaluates
// incorrectly in the browser runtime.
const inGlobalContext = ((): boolean => {
  try { return Boolean((globalThis as { window?: unknown }).window) } catch { return false }
})()

if (inGlobalContext) {
  const w = window as { __nuDisplayModules?: Record<string, boolean>; document: Document }
  w.__nuDisplayModules = w.__nuDisplayModules || {}
  w.__nuDisplayModules.commands = true

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', start, { once: true })
  } else {
    start()
  }
  setTimeout(() => { if (!_started) start() }, 200)

  // Marker attribute — Vite tree-shaker cannot drop the side effect.
  w.document.documentElement.setAttribute('data-nu-display-commands', 'active')
}
