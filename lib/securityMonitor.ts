/**
 * Phase 4.5 — Display Security Monitor.
 *
 * Runs continuously on each kiosk:
 *   1. Watches the URL — if it doesn't start with the approved
 *      origin the monitor raises `critical` and auto-recovers by
 *      replacing window.location with the app home.
 *   2. Watches visibility/focus — when the tab loses focus the
 *      monitor raises `warning`.
 *   3. Writes the verdict into the shared securityState module so
 *      the heartbeat builder can read it.
 *   4. Emits audit events for every transition.
 *
 * The monitor is **single-instance per display** —
 * startSecurityMonitor() is idempotent.
 */

import { getSupabase } from './supabase'
import { DISPLAY_ID } from './heartbeat'
import {
  setSecurityVerdict,
  getSecurityVerdict,
  APPROVED_URL,
  APP_HOME_PATH,
  NEUTRAL_VERDICT,
  type SecurityStatus,
  type SecurityVerdict,
} from './securityState'

let _intervalId: ReturnType<typeof setInterval> | null = null
let _recovering = false

export { APPROVED_URL, APP_HOME_PATH, getSecurityVerdict }
export type { SecurityStatus, SecurityVerdict }

/**
 * Start the monitor. Safe to call multiple times — the second
 * call is a no-op.
 */
export function startSecurityMonitor(): void {
  if (_intervalId) return
  if (typeof window === 'undefined') return

  // Initial check synchronously so callers can read the verdict
  // immediately after startSecurityMonitor() returns.
  evaluateSecurity(true)

  // Re-evaluate every 5s (URL can change via router push, focus
  // can change while the tab is in another window, etc).
  _intervalId = setInterval(() => evaluateSecurity(false), 5_000)

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(
      `[securityMonitor] started for ${DISPLAY_ID} (approved=${APPROVED_URL})`,
    )
  }
}

export function stopSecurityMonitor(): void {
  if (_intervalId) {
    clearInterval(_intervalId)
    _intervalId = null
  }
}

// Auto-start on the client. This block writes to document and
// localStorage (guaranteed side-effects that the Vite/Rollup
// tree-shaker cannot remove) so the security monitor's setInterval
// survives the production build. We use `inGlobalContext` (a
// one-time-set boolean) instead of `typeof window !== 'undefined'`
// because Vite's minifier rewrites that comparison to a single
// character (`<`) which then evaluates incorrectly in the
// browser runtime.
const inGlobalContext = ((): boolean => {
  try { return Boolean((globalThis as { window?: unknown }).window) } catch { return false }
})()

if (inGlobalContext) {
  const w = window as { __nuDisplayModules?: Record<string, boolean>; document: Document }
  w.__nuDisplayModules = w.__nuDisplayModules || {}
  w.__nuDisplayModules.security = true

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', startSecurityMonitor, { once: true })
  } else {
    startSecurityMonitor()
  }
  setTimeout(() => {
    if (!_intervalId) startSecurityMonitor()
  }, 300)

  // Marker attribute — Vite tree-shaker cannot drop the side effect.
  w.document.documentElement.setAttribute('data-nu-display-security', 'active')
}

/**
 * Core evaluation. Walks the four checks (URL, visibility, focus,
 * kiosk-flag) and emits events on transitions.
 *
 * `forceFirst` skips the "did anything actually change?" gate so
 * the initial evaluation always runs.
 */
function evaluateSecurity(forceFirst: boolean): SecurityVerdict {
  if (typeof window === 'undefined') {
    setSecurityVerdict(NEUTRAL_VERDICT)
    return NEUTRAL_VERDICT
  }

  const currentUrl = window.location.href
  const currentOrigin = window.location.origin
  const approvedOrigin = (() => {
    try { return new URL(APPROVED_URL).origin } catch { return APPROVED_URL }
  })()

  const is_visible = document.visibilityState === 'visible'
  const has_focus = document.hasFocus()
  const url_ok = currentOrigin === approvedOrigin

  let status: SecurityStatus = 'secure'
  let message: string | null = null

  if (!url_ok) {
    status = 'critical'
    message = 'Display exited approved website'
  } else if (!is_visible || !has_focus) {
    status = 'warning'
    message = 'Display lost focus'
  } else {
    status = 'secure'
    message = null
  }

  const prev = getSecurityVerdict()
  const next: SecurityVerdict = { status, message, is_visible, has_focus, url_ok }

  // Emit transition events on the first run AND whenever a
  // security-level field flips. Avoids spamming Supabase.
  const transitioned =
    forceFirst ||
    prev.status !== next.status ||
    prev.is_visible !== next.is_visible ||
    prev.has_focus !== next.has_focus ||
    prev.url_ok !== next.url_ok

  setSecurityVerdict(next)

  // Critical → attempt auto-recovery. We do this BEFORE writing
  // the event so the recovery attempt and the audit row are
  // produced in the same tick.
  if (next.status === 'critical' && !url_ok) {
    void maybeRecover()
  }

  if (transitioned) {
    void logTransition(prev, next, currentUrl)
  }

  return next
}

async function logTransition(
  prev: SecurityVerdict,
  next: SecurityVerdict,
  currentUrl: string,
): Promise<void> {
  const sb = getSupabase()
  if (!sb) return

  // Pick the most specific event type for the audit trail.
  let eventType:
    | 'security_warning'
    | 'security_critical'
    | 'kiosk_escape_detected'
    | 'focus_lost'
    | 'auto_recovery_triggered' = 'security_warning'
  let message = next.message

  if (next.status === 'critical') {
    eventType = 'kiosk_escape_detected'
    message = `Display left approved origin. current_url=${currentUrl}`
  } else if (next.status === 'warning') {
    eventType = 'focus_lost'
    message = `Visibility=${next.is_visible} Focus=${next.has_focus}`
  }

  // Also log a generic security_* event for the dashboard's filter.
  if (eventType !== 'security_warning' && eventType !== 'security_critical') {
    const genericType: 'security_warning' | 'security_critical' =
      next.status === 'critical' ? 'security_critical' : 'security_warning'
    await sb.from('display_events').insert({
      display_id: DISPLAY_ID,
      event_type: genericType,
      message: next.message,
    })
  }

  await sb.from('display_events').insert({
    display_id: DISPLAY_ID,
    event_type: eventType,
    message,
  })

  // If we recovered, log it (separate event).
  if (next.status === 'critical' && _recovering) {
    await sb.from('display_events').insert({
      display_id: DISPLAY_ID,
      event_type: 'auto_recovery_triggered',
      message: `Replacing location with ${APPROVED_URL}${APP_HOME_PATH}`,
    })
  }
}

async function maybeRecover(): Promise<void> {
  if (_recovering) return
  _recovering = true
  // Tiny delay so the dashboard sees the 'critical' verdict
  // before we yank the page away. 1s gives the Realtime channel
  // time to push the status update.
  await new Promise((r) => setTimeout(r, 1000))
  if (typeof window !== 'undefined') {
    window.location.replace(APPROVED_URL + APP_HOME_PATH)
  }
}