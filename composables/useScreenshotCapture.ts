import { onMounted, onUnmounted, readonly, ref } from 'vue'
import {
  SCREENSHOT_INTERVAL_MS,
  captureAndUploadScreenshot,
} from '~/lib/screenshotCapture'

/**
 * useScreenshotCapture — Phase 5.
 *
 * Singleton composable that:
 *   1. Captures + uploads a screenshot immediately on mount.
 *   2. Schedules a capture every SCREENSHOT_INTERVAL_MS (60s).
 *   3. Listens to popstate / pushState so a route change triggers
 *      a fresh capture after the new page paints (next tick).
 *   4. Exposes `captureNow()` so command executors can request an
 *      immediate capture after go_home / blackout / emergency.
 *
 * Same module-level side effect as the heartbeat / command
 * listener — auto-starts on import in the browser so production
 * builds cannot tree-shake it.
 *
 * Failsafe: every step is wrapped in try/catch inside
 * captureAndUploadScreenshot. Heartbeat, command listener, and
 * security monitor are NOT touched by this composable.
 */

const lastCaptureAt = ref<number | null>(null)
const lastError = ref<string | null>(null)
const captureCount = ref(0)
const isCapturing = ref(false)

let intervalHandle: ReturnType<typeof setInterval> | null = null
let popstateHandler: (() => void) | null = null
let _started = false

export function useScreenshotCapture() {
  onMounted(() => { if (!_started) start() })
  onUnmounted(() => { /* singleton — keep alive */ })
  return {
    lastCaptureAt: readonly(lastCaptureAt),
    lastError: readonly(lastError),
    captureCount: readonly(captureCount),
    isCapturing: readonly(isCapturing),
    captureNow,
  }
}

/**
 * Public API used by command executors. Schedules a capture on the
 * next animation frame so the overlay/transition has time to
 * render first.
 */
export function captureNow(): void {
  if (typeof window === 'undefined') return
  // Defer twice: once for the command's DOM mutation to commit,
  // then for the next frame so the rendered tree is current.
  window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      void doCapture('manual')
    })
  }, 150)
}

async function doCapture(reason: 'interval' | 'mount' | 'nav' | 'manual'): Promise<void> {
  if (isCapturing.value) return
  isCapturing.value = true
  try {
    const ok = await captureAndUploadScreenshot()
    if (ok) {
      lastCaptureAt.value = Date.now()
      lastError.value = null
      captureCount.value += 1
    } else {
      lastError.value = new Date().toISOString()
    }
    if (typeof window !== 'undefined' && (window as { __nuDisplayModules?: Record<string, boolean> }).__nuDisplayModules) {
      (window as { __nuDisplayModules: Record<string, boolean> }).__nuDisplayModules.lastScreenshotReason = reason
    }
  } finally {
    isCapturing.value = false
  }
}

function start(): void {
  if (_started) return
  if (typeof window === 'undefined') return
  _started = true

  // 1. Initial capture after the first paint.
  window.requestAnimationFrame(() => {
    window.setTimeout(() => { void doCapture('mount') }, 1_500)
  })

  // 2. Periodic capture every 60s.
  intervalHandle = setInterval(() => { void doCapture('interval') }, SCREENSHOT_INTERVAL_MS)

  // 3. Capture on navigation. We listen to popstate (back/forward)
  //    AND patch pushState/replaceState so internal route changes
  //    are also detected (Nuxt's router uses pushState).
  popstateHandler = () => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => { void doCapture('nav') }, 400)
    })
  }
  window.addEventListener('popstate', popstateHandler)

  patchHistory('pushState')
  patchHistory('replaceState')

  // Marker attribute — keeps Vite/Rollup from tree-shaking the
  // module-level side effects in production.
  document.documentElement.setAttribute('data-nu-display-screenshot', 'active')
}

function patchHistory(method: 'pushState' | 'replaceState'): void {
  if (typeof window === 'undefined') return
  const original = history[method]
  if ((original as unknown as { __nuPatched?: boolean }).__nuPatched) return
  const wrapped = function (this: History, ...args: Parameters<typeof history.pushState>) {
    const result = original.apply(this, args)
    window.requestAnimationFrame(() => {
      window.setTimeout(() => { void doCapture('nav') }, 400)
    })
    return result
  } as typeof history.pushState
  ;(wrapped as unknown as { __nuPatched?: boolean }).__nuPatched = true
  history[method] = wrapped
}

/* -----------------------------------------------------------------
 * Module-level side effect: auto-start in the browser.
 * (Mirrors the pattern used by useDisplayHeartbeat and
 *  useCommandListener so all Phase 3-5 features share the same
 *  tree-shake-proof initialization.)
 * ----------------------------------------------------------------- */
const inGlobalContext = ((): boolean => {
  try { return Boolean((globalThis as { window?: unknown }).window) } catch { return false }
})()

if (inGlobalContext) {
  const w = window as { __nuDisplayModules?: Record<string, boolean>; document: Document }
  w.__nuDisplayModules = w.__nuDisplayModules || {}
  w.__nuDisplayModules.screenshot = true

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', start, { once: true })
  } else {
    start()
  }
  setTimeout(() => { if (!_started) start() }, 200)
}