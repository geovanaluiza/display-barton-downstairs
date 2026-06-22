<script setup lang="ts">
import { computed } from 'vue'
import { useCommandListener } from '~/composables/useCommandListener'

const {
  status,
  lastReceived,
  lastError,
  receivedCount,
  lastAckId,
  lastAckError,
} = useCommandListener()

/**
 * Command Debug Overlay
 *
 * Renders a small floating panel with the live state of the
 * Supabase Realtime command listener:
 *
 *   - Subscription status (idle / subscribing / subscribed / closed / error)
 *   - Last received command id + command name + age
 *   - Last execution error
 *   - Last ack result (success id / failure message)
 *   - Last 8 log lines (mirrored to localStorage)
 *
 * Visibility is controlled by a localStorage flag so it can be
 * turned on the physical display without a rebuild:
 *
 *   localStorage.setItem('nu-display:debugOverlay', '1')  → show
 *   localStorage.removeItem('nu-display:debugOverlay')      → hide
 *
 * Also auto-shows when import.meta.env.DEV is true so the dev
 * server always shows it.
 */
const visible = computed(() => {
  if (typeof window === 'undefined') return false
  if (import.meta.env.DEV) return true
  return window.localStorage.getItem('nu-display:debugOverlay') === '1'
})

const logLines = computed<string[]>(() => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem('nu-display:barton-downstairs:cmdLog')
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
})

function clearLog() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('nu-display:barton-downstairs:cmdLog')
}

function lastReceivedAge(): string {
  if (!lastReceived.value) return '—'
  const t = new Date(lastReceived.value.created_at).getTime()
  const diff = Date.now() - t
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`
  return `${Math.floor(diff / 60_000)}m ago`
}

const statusColor = computed(() => {
  switch (status.value) {
    case 'subscribed':  return 'text-nu-leaf border-nu-leaf/60'
    case 'subscribing': return 'text-nu-sky border-nu-sky/60'
    case 'error':       return 'text-nu-amber border-nu-amber/60'
    case 'closed':      return 'text-nu-amber border-nu-amber/40'
    case 'disabled':    return 'text-nu-skylight border-white/20'
    default:            return 'text-nu-wisp border-white/20'
  }
})
</script>

<template>
  <div v-if="visible" class="debug-overlay" :class="statusColor">
    <div class="debug-head">
      <span class="debug-title">CMD LISTENER</span>
      <span class="debug-status">{{ status }}</span>
    </div>
    <div class="debug-row">
      <span class="debug-key">received</span>
      <span class="debug-val">{{ receivedCount }}</span>
    </div>
    <div class="debug-row">
      <span class="debug-key">last cmd</span>
      <span class="debug-val">
        {{ lastReceived ? `${lastReceived.command} (${lastReceived.id.slice(0, 8)})` : '—' }}
      </span>
    </div>
    <div class="debug-row">
      <span class="debug-key">last cmd age</span>
      <span class="debug-val">{{ lastReceivedAge() }}</span>
    </div>
    <div class="debug-row">
      <span class="debug-key">last ack</span>
      <span class="debug-val">
        {{ lastAckId ? `ok ${lastAckId.slice(0, 8)}` : (lastAckError ? 'FAILED' : '—') }}
      </span>
    </div>
    <div v-if="lastAckError" class="debug-row error">
      <span class="debug-key">ack err</span>
      <span class="debug-val">{{ lastAckError }}</span>
    </div>
    <div v-if="lastError" class="debug-row error">
      <span class="debug-key">listener err</span>
      <span class="debug-val">{{ lastError }}</span>
    </div>
    <div class="debug-log">
      <div class="debug-log-head">
        <span>log</span>
        <button type="button" @click="clearLog">clear</button>
      </div>
      <div v-for="(line, i) in logLines.slice(-8)" :key="i" class="debug-log-line">
        {{ line }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-overlay {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 99999;
  width: 360px;
  max-height: 70vh;
  overflow-y: auto;
  background: rgba(0, 38, 61, 0.92);
  border: 1px solid rgba(120, 180, 230, 0.4);
  border-radius: 12px;
  padding: 12px 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  line-height: 1.4;
  color: #e8f0f8;
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
}
.debug-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.debug-title {
  font-weight: 700;
  letter-spacing: 0.18em;
  font-size: 10px;
  text-transform: uppercase;
}
.debug-status {
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid currentColor;
  font-weight: 700;
}
.debug-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 2px 0;
}
.debug-key {
  width: 96px;
  flex-shrink: 0;
  color: rgba(180, 210, 235, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 10px;
}
.debug-val {
  flex: 1;
  word-break: break-all;
  color: #f4f8fc;
}
.debug-row.error .debug-val {
  color: #ffbc2d;
}
.debug-log {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.debug-log-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(180, 210, 235, 0.7);
  margin-bottom: 4px;
}
.debug-log-head button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #f4f8fc;
  font-family: inherit;
  font-size: 10px;
  padding: 1px 6px;
  cursor: pointer;
}
.debug-log-head button:hover { background: rgba(255, 255, 255, 0.08); }
.debug-log-line {
  font-size: 10px;
  color: rgba(220, 235, 250, 0.85);
  white-space: pre-wrap;
  word-break: break-all;
  margin: 1px 0;
}
</style>