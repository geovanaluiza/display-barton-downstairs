/**
 * Command executor — Phase 4.
 *
 * Pure functions that perform the side-effects for each
 * display_commands.command value. The Realtime listener
 * (useCommandListener) is responsible for calling the right
 * executor and acknowledging the command in Supabase.
 *
 * Reload and go_home are implemented here directly. Blackout
 * and emergency_message mutate persistent state in
 * displayState.ts, and the corresponding <BlackoutOverlay> /
 * <EmergencyOverlay> components render based on that state.
 */

import { setBlackout, setEmergency } from '../lib/displayState'

/**
 * Hard reload the page. The most common command — admin uses
 * it when a display is showing stale data after a deploy.
 */
export async function executeReload(): Promise<void> {
  if (typeof window === 'undefined') return
  // Use location.reload() so the browser re-fetches the static
  // index.html from Vercel (catches fresh prerendered HTML).
  window.location.reload()
}

/**
 * Navigate the kiosk back to its home page. Works on both the
 * initial home ('/') and after a user has navigated elsewhere.
 */
export async function executeGoHome(): Promise<void> {
  if (typeof window === 'undefined') return
  const router = useRouter()
  await router.push('/')
}

/**
 * Turn the blackout overlay on or off. The overlay itself is
 * rendered by app.vue so it survives route changes.
 */
export async function executeBlackout(on: boolean): Promise<void> {
  setBlackout(on)
}

/**
 * Show or update the emergency overlay. `on=true` requires a
 * non-empty message. `on=false` clears the overlay.
 */
export async function executeEmergency(
  on: boolean,
  message: string | null | undefined,
): Promise<void> {
  if (on) {
    const text = (message ?? '').toString().trim()
    if (text.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('[commandExecutor] emergency_message with empty payload — ignored')
      return
    }
    setEmergency(text)
  } else {
    setEmergency(null)
  }
}