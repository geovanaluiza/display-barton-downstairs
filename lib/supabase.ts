import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase client used by the heartbeat system.
 *
 * Returns `null` if the VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
 * env vars are missing. In that case the heartbeat composable
 * becomes a no-op — the rest of the kiosk UI continues to work
 * normally, the dashboard just won't see the display as "online".
 */
let _client: SupabaseClient | null = null
let _resolved = false

export function getSupabase(): SupabaseClient | null {
  if (_resolved) return _client
  _resolved = true
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        '[display-heartbeat] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. Heartbeats disabled.',
      )
    }
    return null
  }
  _client = createClient(url, key, {
    realtime: { params: { eventsPerSecond: 1 } },
    auth: { persistSession: false },
  })
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[display-heartbeat] Supabase client initialized for', url)
  }
  return _client
}

/** True when both env vars are present (the heartbeat can fire). */
export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL) &&
         Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY)
}
