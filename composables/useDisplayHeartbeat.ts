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
 * Start it once at the app root (app.vue) and the kiosk will phone
 * home to Supabase every 30 seconds for the entire lifetime of the
 * tab:
 *
 *   - First heartbeat fires ~2s after mount
 *   - Then every HEARTBEAT_INTERVAL_MS
 *   - Watches `route.path` so current_page / current_url are always
 *     fresh before each send
 *   - Tracks the latest `last_touch` timestamp from window
 *     interactions (pointerdown / keydown / touchstart / wheel)
 *
 * Multiple instances are safe — the second call is a no-op.
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

export function useDisplayHeartbeat() {
  const route = useRoute()
  const router = useRouter()
  _routeRef.value = route.path

  const lastSentAt = ref<string | null>(null)
  const lastError = ref<string | null>(null)
  const sent = ref(0)
  const isOnline = computed(() => isSupabaseConfigured())
  const isActive = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  async function tick() {
    const payload = buildPayload(_routeRef.value, _lastTouch)
    const ok = await sendHeartbeat(payload)
    if (ok) {
      lastSentAt.value = new Date().toISOString()
      lastError.value = null
      sent.value += 1
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(
          `[display-heartbeat] sent #${sent.value} → page=${payload.current_page} version=${DISPLAY_VERSION}`,
        )
      }
    } else {
      lastError.value = 'send failed'
    }
  }

  onMounted(() => {
    if (_started) return
    _started = true
    isActive.value = true

    // Always attach touch listeners so last_touch stays fresh
    // even when Supabase is not configured (useful for debugging).
    attachTouchListeners()

    if (!isSupabaseConfigured()) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          `[display-heartbeat] not started: Supabase env vars missing. DISPLAY_ID=${DISPLAY_ID}, version=${DISPLAY_VERSION}`,
        )
      }
      return
    }

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(
        `[display-heartbeat] starting for DISPLAY_ID=${DISPLAY_ID} interval=${HEARTBEAT_INTERVAL_MS}ms version=${DISPLAY_VERSION}`,
      )
    }

    // First send after a short delay (let the app mount + first route
    // resolve so current_page is accurate). Then on a fixed interval.
    const first = setTimeout(() => { void tick() }, 2_000)
    intervalId = setInterval(() => { void tick() }, HEARTBEAT_INTERVAL_MS)

    // Also send once on every route change so the dashboard shows
    // the new page immediately rather than waiting up to 30s.
    const stop = router.afterEach((to) => {
      _routeRef.value = to.path
      // Debounce: if multiple guards fire, only send once.
      scheduleImmediate()
    })
    let immediateTimer: ReturnType<typeof setTimeout> | null = null
    function scheduleImmediate() {
      if (immediateTimer) return
      immediateTimer = setTimeout(() => {
        immediateTimer = null
        void tick()
      }, 500)
    }
    onUnmounted(() => { stop(); if (first) clearTimeout(first) })
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    // Note: touch listeners and _started are kept across navigations
    // so the heartbeat keeps running while the user clicks through
    // pages. We only stop on app unmount.
  })

  // Re-read current_path whenever Vue Router updates the route
  // (covers cases where the composable is mounted before the router).
  watch(
    () => route.path,
    (p) => { _routeRef.value = p },
    { immediate: true },
  )

  return {
    lastSentAt,
    lastError,
    sent,
    isOnline,
    isActive,
    tick,
  }
}
