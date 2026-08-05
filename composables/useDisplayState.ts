import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { WorldKey } from '~/types'

// World -> route map. The home is the scroll-through; the other worlds
// are full pages.
const WORLD_ROUTES: Record<WorldKey, string> = {
  home:       '/',
  discover:   '/discover',
  life:       '/life',
  events:     '/events',
  academics:  '/academics',
  athletics:  '/athletics',
  faith:      '/faith',
  president:  '/president',
  'swoop-shop':'/swoop-shop'
}

export const WORLDS: { key: WorldKey; label: string; short: string; color: string; route: string }[] = [
  { key: 'home',       label: 'Campus Map',        short: 'Home',       color: 'var(--nu-blue)',     route: '/' },
  { key: 'discover',   label: 'Discover NU',       short: 'Discover',   color: 'var(--nu-navy)',     route: '/discover' },
  { key: 'life',       label: 'Student Life',      short: 'Life',       color: 'var(--nu-blue)',     route: '/life' },
  { key: 'events',     label: 'Events',            short: 'Events',     color: 'var(--nu-tour)',     route: '/events' },
  { key: 'academics',  label: 'Academics',         short: 'Academics',  color: 'var(--nu-midnight)', route: '/academics' },
  { key: 'athletics',  label: 'Athletics',         short: 'Athletics',  color: 'var(--nu-blue)',     route: '/athletics' },
  { key: 'faith',      label: 'Faith & Community', short: 'Faith',      color: 'var(--nu-navy)',     route: '/faith' },
  { key: 'president',  label: 'Meet the President', short: 'President', color: 'var(--nu-amber)',    route: '/president' },
  { key: 'swoop-shop', label: 'SwoopShop',        short: 'Swoop',      color: 'var(--nu-tour)',     route: '/swoop-shop' }
]

const currentWorld = ref<WorldKey>('home')
const lastInteraction = ref<number>(Date.now())
const isIdle = ref(false)
const idleTimeoutMs = 30_000

const IDLE_EVENTS = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart'] as const
let idleTimer: ReturnType<typeof setInterval> | null = null

function bumpInteraction() {
  lastInteraction.value = Date.now()
  if (isIdle.value) isIdle.value = false
}

function startIdleWatcher() {
  if (typeof window === 'undefined') return
  stopIdleWatcher()
  for (const ev of IDLE_EVENTS) window.addEventListener(ev, bumpInteraction, { passive: true })
  idleTimer = setInterval(() => {
    if (Date.now() - lastInteraction.value > idleTimeoutMs) {
      isIdle.value = true
    }
  }, 1000)
}

function stopIdleWatcher() {
  if (typeof window === 'undefined') return
  for (const ev of IDLE_EVENTS) window.removeEventListener(ev, bumpInteraction)
  if (idleTimer) { clearInterval(idleTimer); idleTimer = null }
}

export function useDisplayState() {
  onMounted(() => { bumpInteraction(); startIdleWatcher() })
  onUnmounted(() => { stopIdleWatcher() })

  /**
   * Change the active world. Updates the indicator state AND navigates
   * the router to that world's route (or '/' for home).
   */
  function go(world: WorldKey) {
    if (!WORLDS.find(w => w.key === world)) return
    currentWorld.value = world
    bumpInteraction()
    const route = WORLD_ROUTES[world]
    if (route && typeof window !== 'undefined' && window.location.pathname !== route) {
      const router = useRouter()
      router.push(route)
    }
  }

  function next() {
    const i = WORLDS.findIndex(w => w.key === currentWorld.value)
    const n = (i + 1) % WORLDS.length
    go(WORLDS[n].key)
  }

  function prev() {
    const i = WORLDS.findIndex(w => w.key === currentWorld.value)
    const n = (i - 1 + WORLDS.length) % WORLDS.length
    go(WORLDS[n].key)
  }

  const worldIndex = computed(() => WORLDS.findIndex(w => w.key === currentWorld.value))
  const total = computed(() => WORLDS.length)

  return { currentWorld, go, next, prev, worldIndex, total, isIdle, lastInteraction }
}
