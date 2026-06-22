import { getSupabase, isSupabaseConfigured } from './supabase'
import { getSecurityVerdict } from './securityState'

/**
 * The unique id of this display in the Supabase `displays` table.
 * Must match the row seeded by 002_seed.sql.
 */
export const DISPLAY_ID = 'barton-downstairs'

/** Human-readable version, also stored in the heartbeat payload. */
export const DISPLAY_VERSION = '0.1.0'

/** How often this display reports in to Supabase. */
export const HEARTBEAT_INTERVAL_MS = 30_000

export type HeartbeatPayload = {
  status: 'online'
  current_page: string
  current_url: string
  software_version: string
  last_touch: string
  // Phase 4.5 — security snapshot
  security_status: 'secure' | 'warning' | 'critical'
  security_message: string | null
  is_visible: boolean
  has_focus: boolean
}

/**
 * Builds a fresh heartbeat payload from the current browser state.
 * Falls back gracefully in SSR / pre-render contexts.
 *
 * Phase 4.5: the security verdict is included on every heartbeat so
 * the dashboard sees status changes without needing a separate
 * event stream.
 */
export function buildPayload(currentPath: string, lastTouch: number): HeartbeatPayload {
  const path = currentPath || '/'
  const url = typeof window !== 'undefined'
    ? window.location.href
    : path
  const verdict = getSecurityVerdict()
  return {
    status: 'online',
    current_page: path,
    current_url: url,
    software_version: DISPLAY_VERSION,
    last_touch: new Date(lastTouch).toISOString(),
    security_status: verdict.status,
    security_message: verdict.message,
    is_visible: verdict.is_visible,
    has_focus: verdict.has_focus,
  }
}

/**
 * Sends a single heartbeat to Supabase. Returns true on success,
 * false on any error (errors are logged but never thrown — the
 * heartbeat loop is best-effort and must never crash the kiosk).
 */
export async function sendHeartbeat(
  payload: HeartbeatPayload,
): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const now = new Date().toISOString()
  const { error } = await sb
    .from('displays')
    .update({
      ...payload,
      last_seen: now,
      updated_at: now,
    })
    .eq('id', DISPLAY_ID)
  if (error) {
    // eslint-disable-next-line no-console
    console.warn('[display-heartbeat] send error', error.message)
    return false
  }
  return true
}

export { isSupabaseConfigured }
