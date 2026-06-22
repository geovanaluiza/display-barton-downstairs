<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplayStateStore } from '~/lib/displayState'

const { emergencyMessage, setEmergency } = useDisplayStateStore()
const message = computed(() => emergencyMessage.value)

// 6-tap physical escape hatch, same pattern as blackout.
const taps = ref<number[]>([])
function onTapDismiss() {
  const now = Date.now()
  taps.value.push(now)
  taps.value = taps.value.filter((t) => now - t < 4000)
  if (taps.value.length >= 6) {
    taps.value = []
    setEmergency(null)
  }
}
</script>

<template>
  <transition name="emergency-fade">
    <div
      v-if="message"
      class="emergency-root"
      role="alertdialog"
      aria-live="assertive"
      aria-label="Emergency"
    >
      <!-- Animated background pulses to grab attention -->
      <div class="emergency-pulse" aria-hidden="true" />
      <div class="emergency-card">
        <div class="emergency-icon" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="160" height="160">
            <polygon
              points="40,4 76,72 4,72"
              fill="none"
              stroke="#ffffff"
              stroke-width="6"
              stroke-linejoin="round"
            />
            <rect x="36" y="28" width="8" height="24" fill="#ffffff" rx="2" />
            <rect x="36" y="58" width="8" height="8" fill="#ffffff" rx="2" />
          </svg>
        </div>
        <div class="emergency-eyebrow">EMERGENCY NOTICE</div>
        <h1 class="emergency-message">{{ message }}</h1>
        <div class="emergency-cta">Please follow staff instructions.</div>
      </div>
      <button
        type="button"
        class="emergency-dismiss"
        aria-label="Dismiss emergency (admin only)"
        title="Tap 6 times to dismiss"
        @click="onTapDismiss"
      />
    </div>
  </transition>
</template>

<style scoped>
.emergency-root {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #8a0000 0%, #b80000 50%, #8a0000 100%);
  z-index: 10000; /* above blackout if both somehow active */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #ffffff;
}

.emergency-pulse {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%),
    radial-gradient(circle at 50% 50%, transparent 60%, rgba(255, 255, 255, 0.05) 100%);
  animation: emergencyPulse 2.6s ease-in-out infinite;
}
@keyframes emergencyPulse {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%      { opacity: 1;    transform: scale(1.06); }
}

.emergency-card {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 880px;
  padding: 0 48px;
}

.emergency-icon {
  margin: 0 auto 32px;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));
}

.emergency-eyebrow {
  font-family: var(--font-sans);
  font-size: 28px;
  letter-spacing: 0.42em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
}

.emergency-message {
  font-family: var(--font-serif);
  font-size: 84px;
  line-height: 1.08;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
  margin: 0 0 32px;
  word-wrap: break-word;
}

.emergency-cta {
  font-family: var(--font-sans);
  font-size: 26px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.85);
}

.emergency-dismiss {
  position: absolute;
  inset: 0;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: default;
  outline: none;
  z-index: 3;
}

.emergency-fade-enter-active,
.emergency-fade-leave-active { transition: opacity 0.5s ease; }
.emergency-fade-enter-from,
.emergency-fade-leave-to { opacity: 0; }
</style>