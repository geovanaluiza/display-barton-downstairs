/**
 * Local display state — Phase 4 command execution.
 *
 * The blackout and emergency overlays need to survive page
 * navigation and reload, so the source of truth lives in localStorage
 * (and in module-level refs so the overlays re-read instantly).
 *
 * Read state:
 *   - `useDisplayState()` returns reactive refs that re-read
 *     from localStorage on mount.
 *
 * Mutations (used by commandExecutor):
 *   - setBlackout(boolean)
 *   - setEmergency(message: string | null)
 *
 * Safety:
 *   - The state is purely per-tab. Two tabs of the same kiosk can
 *     be in different states — that's fine, the admin dashboard
 *     only cares about the row in Supabase (which both tabs share).
 */

import { ref, computed } from 'vue'
import { DISPLAY_ID } from './heartbeat'

const STORAGE_KEY = (k: string) => `nu-display:${DISPLAY_ID}:${k}`

/* ============================================================
 * Blackout state
 * ============================================================ */

const blackoutOn = ref(false)

function loadBlackout() {
  if (typeof window === 'undefined') return
  const v = window.localStorage.getItem(STORAGE_KEY('blackout'))
  blackoutOn.value = v === '1'
}

function setBlackout(on: boolean) {
  blackoutOn.value = on
  if (typeof window !== 'undefined') {
    if (on) window.localStorage.setItem(STORAGE_KEY('blackout'), '1')
    else window.localStorage.removeItem(STORAGE_KEY('blackout'))
  }
}

/* ============================================================
 * Emergency state
 * ============================================================ */

const emergencyMessage = ref<string | null>(null)

function loadEmergency() {
  if (typeof window === 'undefined') return
  const v = window.localStorage.getItem(STORAGE_KEY('emergency'))
  emergencyMessage.value = v && v.length > 0 ? v : null
}

function setEmergency(message: string | null) {
  emergencyMessage.value = message && message.length > 0 ? message : null
  if (typeof window !== 'undefined') {
    if (message && message.length > 0) {
      window.localStorage.setItem(STORAGE_KEY('emergency'), message)
    } else {
      window.localStorage.removeItem(STORAGE_KEY('emergency'))
    }
  }
}

/* ============================================================
 * Public composable
 * ============================================================ */

let _loaded = false
export function useDisplayStateStore() {
  if (!_loaded && typeof window !== 'undefined') {
    loadBlackout()
    loadEmergency()
    _loaded = true
  }
  return {
    blackoutOn: computed(() => blackoutOn.value),
    emergencyMessage: computed(() => emergencyMessage.value),
    setBlackout,
    setEmergency,
  }
}

/* ============================================================
 * Module-level exports (for non-Vue callers like commandExecutor).
 * ============================================================ */

export { setBlackout, setEmergency }

/**
 * Universal reset — used by go_home to guarantee a clean
 * recovery regardless of which overlay is active. Idempotent.
 */
export function clearAllStates(): void {
  setBlackout(false)
  setEmergency(null)
  if (typeof window !== 'undefined') {
    // Belt-and-braces: also nuke any leftover keys (in case the
    // storage key changes between deployments).
    try {
      for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const k = window.localStorage.key(i)
        if (k && k.startsWith(`nu-display:${DISPLAY_ID}:`)) {
          window.localStorage.removeItem(k)
        }
      }
    } catch {
      // non-fatal
    }
  }
}