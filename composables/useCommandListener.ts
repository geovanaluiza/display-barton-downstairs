import { onMounted, onUnmounted, ref } from 'vue'
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
 *   1. Skip if already executed (Realtime can fire the same row
 *      twice on reconnect)
 *   2. Run the matching executor
 *   3. Write executed_at = now() back to the row
 *
 * Failures are logged but never throw — a flaky network must
 * never bring down the kiosk UI.
 */

type CommandRow = {
  id: string
  display_id: string
  command: 'reload' | 'go_home' | 'blackout' | 'emergency_message'
  payload: Record<string, unknown> | null
  created_at: string
  executed_at: string | null
}

const lastReceived = ref<CommandRow | null>(null)
const lastError = ref<string | null>(null)
const receivedCount = ref(0)
let channel: ReturnType<ReturnType<typeof getSupabase>['channel']> | null = null

export function useCommandListener() {
  onMounted(() => {
    if (!isSupabaseConfigured()) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn('[useCommandListener] Supabase not configured — command listener disabled')
      }
      return
    }
    const sb = getSupabase()
    if (!sb) return

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
        async (payload) => {
          const row = (payload as unknown as { new: CommandRow }).new
          await handleCommand(row)
        },
      )
      .subscribe()

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[useCommandListener] listening for commands → display_id=${DISPLAY_ID}`)
    }
  })

  onUnmounted(() => {
    const sb = getSupabase()
    if (sb && channel) {
      sb.removeChannel(channel)
      channel = null
    }
  })

  return { lastReceived, lastError, receivedCount }
}

async function handleCommand(row: CommandRow) {
  // Realtime can deliver the same row twice on reconnect; skip if
  // already executed.
  if (row.executed_at) return
  lastReceived.value = row
  receivedCount.value += 1

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(
      `[useCommandListener] received #${receivedCount.value} ${row.command} (id=${row.id})`,
    )
  }

  try {
    switch (row.command) {
      case 'reload':
        await executeReload()
        // executeReload() calls window.location.reload() which
        // never returns. The ack below is for documentation; in
        // practice the page is destroyed before this line runs.
        await ackCommand(row.id)
        break
      case 'go_home':
        await executeGoHome()
        await ackCommand(row.id)
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log(`[useCommandListener] navigated to home=${window.location.pathname}`)
        }
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
      default: {
        // eslint-disable-next-line no-console
        console.warn('[useCommandListener] unknown command', row.command)
      }
    }
  } catch (err) {
    lastError.value = err instanceof Error ? err.message : String(err)
    // eslint-disable-next-line no-console
    console.error('[useCommandListener] execution failed', err)
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
    // eslint-disable-next-line no-console
    console.warn('[useCommandListener] ack failed', error.message)
  }
}