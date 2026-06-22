/**
 * Command executor — Phase 4.
 *
 * Pure functions that perform the side-effects for each
 * display_commands.command value. The Realtime listener
 * (useCommandListener) is responsible for calling the right
 * executor and acknowledging the command in Supabase.
 *
 * Reload, go_home, clear_blackout, clear_emergency are
 * implemented here. Blackout and emergency_message mutate
 * persistent state in displayState.ts; the corresponding
 * <BlackoutOverlay> / <EmergencyOverlay> components render
 * based on that state.
 */

import { setBlackout, setEmergency, clearAllStates } from '../lib/displayState'
import { WORLDS } from '../composables/useDisplayState'

/**
 * Hard reload the page. The most common command — admin uses
 * it when a display is showing stale data after a deploy.
 *
 * Reload does NOT clear blackout/emergency state — those are
 * intentional display modes that should survive a reload. Use
 * clear_blackout / clear_emergency (or go_home) to recover.
 */
export async function executeReload(): Promise<void> {
  if (typeof window === 'undefined') return
  // Use location.reload() so the browser re-fetches the static
  // index.html from Vercel (catches fresh prerendered HTML).
  window.location.reload()
}

/**
 * Navigate the kiosk back to its home page. This is the
 * UNIVERSAL RECOVERY COMMAND — it must always work, even when
 * the display is in blackout or emergency mode.
 *
 * The order matters:
 *   1. Clear blackout + emergency state (so the overlays vanish
 *      on the next render).
 *   2. Remove the localStorage keys (so a future reload doesn't
 *      bring them back).
 *   3. Force-clear any overlay DOM nodes that already mounted
 *      (defensive — they listen to the same reactive state, so
 *      step 1 should already remove them, but if a render is
 *      queued this guarantees the user sees the home screen).
 *   4. Navigate to the home path via hard navigation
 *      (window.location.href), so Vercel static serves the
 *      correct prerendered index.html.
 *
 * Resolution order for the home path:
 *   1. VITE_DISPLAY_HOME_PATH if it matches a known route
 *   2. The 'home' world route (always present)
 *   3. '/' as a safe fallback
 */
export async function executeGoHome(): Promise<void> {
  if (typeof window === 'undefined') return
  clearAllStates()
  forceRemoveOverlayDOM()
  const home = resolveHomePath()
  logRecovery(`go_home → ${home} (from ${window.location.pathname})`)
  if (home && home !== window.location.pathname) {
    window.location.href = home
  } else if (home === window.location.pathname) {
    // Already on home — soft reload so the button press is
    // satisfying and the cleared state re-renders cleanly.
    window.location.reload()
  }
  // If resolveHomePath() somehow returns null we stay put.
}

/**
 * Explicit recovery command — clear blackout without navigating.
 * The dashboard's "End Blackout" button and any future quick
 * recovery flows use this command.
 */
export async function executeClearBlackout(): Promise<void> {
  if (typeof window === 'undefined') return
  setBlackout(false)
  forceRemoveOverlayDOM()
  logRecovery('clear_blackout → blackout removed')
}

/**
 * Explicit recovery command — clear emergency without navigating.
 */
export async function executeClearEmergency(): Promise<void> {
  if (typeof window === 'undefined') return
  setEmergency(null)
  forceRemoveOverlayDOM()
  logRecovery('clear_emergency → emergency removed')
}

/**
 * Turn the blackout overlay ON. (Off → use clear_blackout or go_home.)
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

/**
 * Resolve the canonical home path for this kiosk.
 *
 * The source of truth is `composables/useDisplayState.ts` — WORLDS
 * is the single list of routable worlds (auto-generated from the
 * pages/ directory). We never want a hardcoded '/swoop-shop' or '/'
 * here because the canonical home can change per project.
 */
export function resolveHomePath(): string {
  const routes = WORLDS.map((w) => w.route)
  const configured =
    (typeof import.meta !== 'undefined' &&
      (import.meta as { env?: Record<string, string> }).env?.VITE_DISPLAY_HOME_PATH) ||
    '/'
  if (routes.includes(configured)) return configured
  const homeWorld = WORLDS.find((w) => w.key === 'home')
  if (homeWorld) return homeWorld.route
  return '/'
}

/**
 * Defensive DOM cleanup. The blackout/emergency overlays are
 * reactive to displayState, so step 1 of executeGoHome()
 * (clearAllStates()) already removes them. But there is a
 * window of time between the state change and the next render.
 * If a user presses Go Home and the kiosk is also reloading
 * (slow CPU), we want the blackout to vanish synchronously
 * so they don't see a flash of black on the way to home.
 */
export function forceRemoveOverlayDOM(): void {
  if (typeof document === 'undefined') return
  const sels = ['.blackout-root', '.emergency-root']
  for (const sel of sels) {
    document.querySelectorAll(sel).forEach((el) => el.remove())
  }
}

function logRecovery(msg: string): void {
  // eslint-disable-next-line no-console
  console.log(`[commandExecutor] ${msg}`)
}