<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplayStateStore } from '~/lib/displayState'

const { blackoutOn, setBlackout } = useDisplayStateStore()
const on = computed(() => blackoutOn.value)

// 6-tap dismiss (a long-press is too easy to hit accidentally on
// a touchscreen, and we still want a physical escape hatch for
// staff when the admin dashboard is down).
const taps = ref<number[]>([])
function onTapDismiss() {
  const now = Date.now()
  taps.value.push(now)
  taps.value = taps.value.filter((t) => now - t < 4000)
  if (taps.value.length >= 6) {
    taps.value = []
    setBlackout(false)
  }
}
</script>

<template>
  <transition name="blackout-fade">
    <div v-if="on" class="blackout-root" role="alertdialog" aria-label="Blackout">
      <!-- The overlay is intentionally invisible. A single hairline
           gold cross marks the centre so staff can confirm the
           screen is still powered and the kiosk is responsive. -->
      <div class="blackout-mark" aria-hidden="true">
        <div class="mark-h" />
        <div class="mark-v" />
      </div>
      <button
        type="button"
        class="blackout-dismiss"
        aria-label="Dismiss blackout (admin only)"
        title="Tap 6 times to dismiss blackout"
        @click="onTapDismiss"
      />
    </div>
  </transition>
</template>

<style scoped>
.blackout-root {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blackout-mark {
  position: relative;
  width: 64px;
  height: 64px;
}
.mark-h {
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 2px;
  background: rgba(251, 217, 69, 0.55);
  transform: translateY(-50%);
  border-radius: 2px;
}
.mark-v {
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 2px;
  background: rgba(251, 217, 69, 0.55);
  transform: translateX(-50%);
  border-radius: 2px;
}

.blackout-dismiss {
  position: absolute;
  inset: 0;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: default;
  outline: none;
}

.blackout-fade-enter-active,
.blackout-fade-leave-active { transition: opacity 0.4s ease; }
.blackout-fade-enter-from,
.blackout-fade-leave-to { opacity: 0; }
</style>