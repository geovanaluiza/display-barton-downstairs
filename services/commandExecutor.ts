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
import { WORLDS } from '../composables/useDisplayState'

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
 * Navigate the kiosk back to its home page.
 *
 * Resolution order:
 *   1. The path in VITE_DISPLAY_HOME_PATH (if it's a known route).
 *   2. The 'home' world route (always present, always valid).
 *   3. '/'
 *
 * Why a hard `window.location.href` and not router.push?
 *   - Vercel static deploys serve the pre-rendered HTML for each
 *     prerendered route; a real navigation guarantees the browser
 *     fetches the correct prerendered index.html.
 *   - Some kiosk modes (fullscreen, locked-down Chromium) intercept
 *     router.push() in unexpected ways; a hard navigation is
 *     rock-solid.
 *
 * If we're already on the home path, do a soft reload so the
 * button press is still satisfying.
 */
export async function executeGoHome(): Promise<void> {
  if (typeof window === 'undefined') return
  const home = resolveHomePath()
  if (home && home !== window.location.pathname) {
    window.location.href = home
  } else if (home === window.location.pathname) {
    window.location.reload()
  }
  // If resolveHomePath() somehow returns null we stay put rather
  // than navigating to a guaranteed-404 root.
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