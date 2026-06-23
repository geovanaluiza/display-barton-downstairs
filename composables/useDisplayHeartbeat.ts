import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  buildPayload,
  sendHeartbeat,
  HEARTBEAT_INTERVAL_MS,
  isSupabaseConfigured,
  DISPLAY_ID,
  DISPLAY_VERSION,
} from '~/lib/heartbeat'

/**
 * Per-display heartbeat composable.
 *
 * Auto-starts at module load on the client (see the side-effect
 * block at the bottom of this file). The function `useDisplayHeartbeat`
 * is still exported for testing and for any caller that wants the
 * reactive state, but you do NOT need to call it — the heartbeat
 * starts automatically when the module is imported.
 *
 * Module-level state survives page navigations; onUnmounted only
 * runs when the whole app tears down.
 */
let _started = false
let _lastTouch = Date.now()
let _routeRef: { value: string } = { value: '/' }

function bumpTouch() { _lastTouch = Date.now() }

const TOUCH_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const

function attachTouchListeners() {
  if (typeof window === 'undefined') return
  for (const ev of TOUCH_EVENTS) {
    window.addEventListener(ev, bumpTouch, { passive: true })
  }
}
function detachTouchListeners() {
  if (typeof window === 'undefined') return
  for (const ev of TOUCH_EVENTS) {
    window.removeEventListener(ev, bumpTouch)
  }
}

const lastSentAt = ref<string | null>(null)
const lastError = ref<string | null>(null)
const sent = ref(0)
const isActive = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null
let firstTimeoutId: ReturnType<typeof setTimeout> | null = null
let stopRouter: { (): void } | null = null

async function tick() {
  if (!isSupabaseConfigured()) return false
  const payload = buildPayload(_routeRef.value, _lastTouch)
  const ok = await sendHeartbeat(payload)
  if (ok) {
    lastSentAt.value = new Date().toISOString()
    lastError.value = null
    sent.value += 1
    // Side-effect: write a marker to window so the Vite tree-shaker
    // can't drop the heartbeat path. Also visible in production
    // console for debugging.
    if (typeof window !== 'undefined') {
      (window as { __nuDisplayHeartbeatLast?: number }).__nuDisplayHeartbeatLast = Date.now()
    }
  } else {
    lastError.value = 'send failed'
  }
  return ok
}

function start() {
  if (_started) return
  if (typeof window === 'undefined') return
  _started = true
  isActive.value = true

  attachTouchListeners()

  if (!isSupabaseConfigured()) {
    return
  }

  // First send after a short delay (let the app mount + first route
  // resolve so current_page is accurate). Then on a fixed interval.
  firstTimeoutId = setTimeout(() => { void tick() }, 2_000)
  intervalId = setInterval(() => { void tick() }, HEARTBEAT_INTERVAL_MS)

  // Watch the current route so current_page / current_url are
  // always fresh before each send. We can't use the Vue Router hook
  // until the router is available, so we read it lazily.
  try {
    const router = useRouter()
    stopRouter = router.afterEach((to) => {
      _routeRef.value = to.path
      let immediateTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
        immediateTimer = null
        void tick()
      }, 500)
      // Reset handle so next route change re-schedules.
      const reset = () => { if (immediateTimer) { clearTimeout(immediateTimer); immediateTimer = null } }
      if (reset as unknown) { /* no-op; debounce handled above */ }
    })
  } catch {
    // Router not available yet (SSR); the watch below covers
    // client-side updates.
  }

  // Side-effect: write a marker to document so the Vite tree-shaker
  // can't drop the heartbeat module.
  document.documentElement.setAttribute('data-nu-display-heartbeat', 'active')
}

function stop() {
  if (intervalId) { clearInterval(intervalId); intervalId = null }
  if (firstTimeoutId) { clearTimeout(firstTimeoutId); firstTimeoutId = null }
  if (stopRouter) { stopRouter(); stopRouter = null }
  detachTouchListeners()
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-nu-display-heartbeat')
  }
  _started = false
  isActive.value = false
}

/**
 * Composable form — returns reactive state for the debug overlay.
 * Auto-starts the heartbeat if not already started. Multiple
 * calls are safe (idempotent).
 */
export function useDisplayHeartbeat() {
  if (typeof window !== 'undefined' && !_started) {
    start()
  }
  // Wire route path into the shared ref so the next tick picks it up.
  try {
    const route = useRoute()
    _routeRef.value = route.path
    watch(
      () => route.path,
      (p) => { _routeRef.value = p },
      { immediate: true },
    )
  } catch {
    // Router not yet available (SSR / first render); the afterEach
    // hook above covers subsequent navigations.
  }
  onMounted(() => { if (!_started) start() })
  onUnmounted(() => { /* keep alive across pages */ })
  return {
    lastSentAt: computed(() => lastSentAt.value),
    lastError: computed(() => lastError.value),
    sent: computed(() => sent.value),
    isOnline: computed(() => isSupabaseConfigured()),
    isActive: computed(() => isActive.value),
    tick,
  }
}

// Auto-start on the client. The browser DOM write below is a
// guaranteed side-effect that Vite/Rollup cannot tree-shake, so
// this module (and the setInterval it owns) is preserved in the
// production bundle. Plugins / app.vue / pages don't have to call
// anything — the moment this module is imported, the heartbeat
// starts.
//
// We use `inGlobalContext` (a one-time-set boolean) instead of
// `typeof window !== 'undefined'` because Vite's minifier rewrites
// that comparison to a single character (`<`) which then evaluates
// incorrectly in the browser runtime.
const inGlobalContext = ((): boolean => {
  try { return Boolean((globalThis as { window?: unknown }).window) } catch { return false }
})()

if (inGlobalContext) {
  const w = window as { __nuDisplayModules?: Record<string, boolean>; document: Document }
  w.__nuDisplayModules = w.__nuDisplayModules || {}
  w.__nuDisplayModules.heartbeat = true
  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', start, { once: true })
  } else {
    start()
  }
  setTimeout(() => { if (!_started) start() }, 100)
  // Marker attribute — Vite tree-shaker cannot drop the side effect.
  w.document.documentElement.setAttribute('data-nu-display-heartbeat', 'active')
}
