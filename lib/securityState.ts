/**
 * Phase 4.5 — Security verdict (shared shape, no Vue/Supabase deps).
 *
 * Lives in its own module so `lib/heartbeat.ts` can import it
 * without creating a circular dependency with `lib/securityMonitor.ts`.
 */

export type SecurityStatus = 'secure' | 'warning' | 'critical'

export type SecurityVerdict = {
  status: SecurityStatus
  message: string | null
  is_visible: boolean
  has_focus: boolean
  url_ok: boolean
}

/** Default approved URL. Can be overridden via
 *  VITE_DISPLAY_APPROVED_URL at build time. */
export const APPROVED_URL =
  (typeof import.meta !== 'undefined' &&
    (import.meta as { env?: Record<string, string> }).env?.VITE_DISPLAY_APPROVED_URL) ||
  'https://display-barton-downstairs.vercel.app'

/** Path the kiosk should be redirected to when it leaves the
 *  approved origin. */
export const APP_HOME_PATH = '/'

/** A neutral default used until the monitor has run at least once. */
export const NEUTRAL_VERDICT: SecurityVerdict = {
  status: 'secure',
  message: null,
  is_visible: true,
  has_focus: true,
  url_ok: true,
}

/** Module-scoped mutable slot. securityMonitor writes here on
 *  each evaluation; heartbeat reads from here on each send. */
let _current: SecurityVerdict = { ...NEUTRAL_VERDICT }

export function setSecurityVerdict(v: SecurityVerdict): void { _current = v }
export function getSecurityVerdict(): SecurityVerdict { return _current }