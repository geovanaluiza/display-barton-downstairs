<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Phase 3/4/4.5 ops are wired in plugins/display-ops.client.ts
// (which calls useDisplayHeartbeat, useCommandListener, and
// startSecurityMonitor). The composables and lib module also
// self-start on import via a module-level side effect that writes
// to document.documentElement — so production builds cannot
// tree-shake them. App.vue just needs to render the overlays.
import BlackoutOverlay from '~/components/BlackoutOverlay.vue'
import EmergencyOverlay from '~/components/EmergencyOverlay.vue'
import CommandDebugOverlay from '~/components/CommandDebugOverlay.vue'
import '~/composables/useScreenshotCapture'

const TARGET_W = 1080
const TARGET_H = 1920
const stageEl = ref<HTMLElement | null>(null)
const scale = ref(1)

function fit() {
  if (!stageEl.value) return
  const vw = window.innerWidth
  const vh = window.innerHeight
  const s = Math.min(vw / TARGET_W, vh / TARGET_H)
  scale.value = s
  const x = (vw - TARGET_W * s) / 2
  const y = (vh - TARGET_H * s) / 2
  stageEl.value.style.transform = `translate(${x}px, ${y}px) scale(${s})`
}

onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
  window.addEventListener('orientationchange', fit)
})
onUnmounted(() => {
  window.removeEventListener('resize', fit)
  window.removeEventListener('orientationchange', fit)
})
</script>

<template>
  <div class="app-root">
    <div ref="stageEl" class="stage kiosk-stage">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <!-- Phase 4 overlays: rendered outside the scaled stage so they
         always cover the full viewport. Blackout sits below emergency
         so an active emergency overlay hides the blackout marker. -->
    <BlackoutOverlay />
    <EmergencyOverlay />

    <!-- Diagnostics: shows the realtime command listener status.
         Auto-shown in dev; toggleable on the physical display via
         localStorage('nu-display:debugOverlay') = '1'. -->
    <CommandDebugOverlay />
  </div>
</template>

<style scoped>
.app-root {
  position: fixed; inset: 0;
  background: #000;
  overflow: hidden;
}
.stage {
  position: absolute;
  top: 0; left: 0;
  width: 1080px;
  height: 1920px;
  transform-origin: top left;
}
</style>