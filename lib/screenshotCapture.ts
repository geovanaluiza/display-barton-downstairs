/**
 * Live screenshot capture & upload — Phase 5.
 *
 * Each display client periodically renders the visible kiosk stage
 * (`.stage`) to a JPEG, uploads it to Supabase Storage at
 * `display-screenshots/{display_id}/latest.jpg`, and updates the
 * matching row in the `displays` table with the public URL +
 * timestamp so the admin dashboard can show a real-time preview.
 *
 * Design constraints (from Phase 5 spec):
 *   - Interval: every 60 seconds.
 *   - Trigger immediately on route change.
 *   - Trigger after commands: go_home, blackout, clear_blackout,
 *     emergency_message, clear_emergency.
 *   - JPEG, quality 0.75, overwrite `latest.jpg`.
 *   - Must NEVER break the kiosk: errors are logged in DEV and
 *     optionally emitted as `display_events`, but heartbeat /
 *     command listener / security monitor are isolated.
 *   - Anon-key only (no service role).
 *   - Lazy-loads html2canvas on the client; SSR-safe.
 */

import { getSupabase, isSupabaseConfigured } from './supabase'
import { DISPLAY_ID } from './heartbeat'

/** Storage bucket name. The migration `005_screenshots.sql`
 *  creates this bucket and the RLS policies that allow anon
 *  read/write of `{display_id}/latest.jpg`. */
export const SCREENSHOT_BUCKET = 'display-screenshots'

/** Public URL of the latest screenshot for this display. */
export function getLatestScreenshotPath(): string {
  return `${DISPLAY_ID}/latest.jpg`
}

/** Supabase Storage public URL helper. */
export function getLatestScreenshotUrl(): string | null {
  const sb = getSupabase()
  if (!sb) return null
  const { data } = sb.storage.from(SCREENSHOT_BUCKET).getPublicUrl(getLatestScreenshotPath())
  return data.publicUrl
}

/* -----------------------------------------------------------------
 * Tunables
 * ----------------------------------------------------------------- */

/** How often the visible stage is captured and uploaded. */
export const SCREENSHOT_INTERVAL_MS = 60_000

/** JPEG quality for the upload. 0.75 keeps files ~150-300 KB. */
export const JPEG_QUALITY = 0.75

/** Optional dev-log switch. */
const LOG_PREFIX = '[display-screenshot]'
function devLog(...args: unknown[]): void {
  if (typeof import.meta !== 'undefined' && (import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
    // eslint-disable-next-line no-console
    console.log(LOG_PREFIX, ...args)
  }
}

/* -----------------------------------------------------------------
 * Capture
 * ----------------------------------------------------------------- */

type CaptureOptions = {
  /** A CSS selector identifying the element to render. Default `.stage`. */
  selector?: string
  /** JPEG quality 0..1. Default 0.75. */
  quality?: number
  /** Skip rendering and just do an upload (e.g. test mode). */
  skipRender?: boolean
}

/**
 * Captures the visible stage to a JPEG Blob.
 *
 * Returns `null` if anything fails — callers MUST treat this as
 * best-effort and not block other operations.
 */
export async function captureStageBlob(opts: CaptureOptions = {}): Promise<Blob | null> {
  if (typeof window === 'undefined') return null
  const selector = opts.selector ?? '.stage'
  const target = document.querySelector(selector) as HTMLElement | null
  if (!target) {
    devLog(`capture: target ${selector} not found`)
    return null
  }

  try {
    // Lazy-load so SSR bundles stay small and the heavy library
    // is only fetched on the device that actually needs it.
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(target, {
      // The stage is scaled by app.vue for fit-to-screen. We want
      // the LOGICAL 1080x1920, not the viewport-scaled raster.
      width: target.clientWidth || 1080,
      height: target.clientHeight || 1920,
      windowWidth: 1080,
      windowHeight: 1920,
      scale: 1,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
    })
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/jpeg', opts.quality ?? JPEG_QUALITY),
    )
    if (!blob) {
      devLog('capture: toBlob returned null')
      return null
    }
    devLog(`capture: ${blob.size} bytes @ q=${opts.quality ?? JPEG_QUALITY}`)
    return blob
  } catch (err) {
    devLog('capture: failed', err instanceof Error ? err.message : String(err))
    return null
  }
}

/* -----------------------------------------------------------------
 * Upload + DB update
 * ----------------------------------------------------------------- */

async function uploadBlob(blob: Blob): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const path = getLatestScreenshotPath()
  // Overwrite the latest.jpg in place. supabase-js v2 requires
  // upsert:true for overwrites.
  const { error } = await sb.storage
    .from(SCREENSHOT_BUCKET)
    .upload(path, blob, {
      cacheControl: '5',
      contentType: 'image/jpeg',
      upsert: true,
    })
  if (error) {
    devLog(`upload: failed (${error.message})`)
    return false
  }
  devLog(`upload: ok ${path} (${blob.size} bytes)`)
  return true
}

async function updateDisplayRow(): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return false
  const url = getLatestScreenshotUrl()
  if (!url) return false
  const now = new Date().toISOString()
  const { error } = await sb
    .from('displays')
    .update({
      screenshot_url: url,
      screenshot_updated_at: now,
      updated_at: now,
    })
    .eq('id', DISPLAY_ID)
  if (error) {
    devLog(`update row: failed (${error.message})`)
    return false
  }
  devLog('update row: ok')
  return true
}

/** Optional: log a `display_events` row on capture failure so the
 *  dashboard's event stream surfaces it. Best-effort. */
async function emitFailureEvent(reason: string): Promise<void> {
  try {
    const sb = getSupabase()
    if (!sb) return
    await sb.from('display_events').insert({
      display_id: DISPLAY_ID,
      event_type: 'screenshot_failed',
      severity: 'warning',
      message: reason.slice(0, 500),
      payload: { source: 'useScreenshotCapture' },
    })
  } catch {
    /* never throw from event emission */
  }
}

/* -----------------------------------------------------------------
 * Public API — capture + upload + update in one call
 * ----------------------------------------------------------------- */

/**
 * Full pipeline: render → upload → DB update. Returns `true` only
 * if all three steps succeeded. Never throws.
 */
export async function captureAndUploadScreenshot(opts: CaptureOptions = {}): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    devLog('skipping: supabase not configured')
    return false
  }
  try {
    const blob = await captureStageBlob(opts)
    if (!blob) {
      await emitFailureEvent('capture_stage_failed')
      return false
    }
    const ok = await uploadBlob(blob)
    if (!ok) {
      await emitFailureEvent('upload_failed')
      return false
    }
    const updated = await updateDisplayRow()
    if (!updated) {
      await emitFailureEvent('db_update_failed')
      return false
    }
    return true
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    devLog('pipeline threw', msg)
    await emitFailureEvent(`pipeline_exception:${msg}`)
    return false
  }
}