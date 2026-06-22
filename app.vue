<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Phase 4.5: monitor URL + visibility + focus + auto-recovery.
// Must run BEFORE the heartbeat so the first heartbeat carries
// the security verdict.
import { startSecurityMonitor } from '~/lib/securityMonitor'

// Phase 3: report this display's health + current page to Supabase
// every 30s. See composables/useDisplayHeartbeat.ts.
import { useDisplayHeartbeat } from '~/composables/useDisplayHeartbeat'
useDisplayHeartbeat()

// Phase 4: subscribe to dashboard commands (reload / go_home /
// blackout / emergency_message) and execute them. See
// composables/useCommandListener.ts.
import { useCommandListener } from '~/composables/useCommandListener'
useCommandListener()

// Phase 4 overlays — rendered outside the .stage so they cover the
// full viewport (including the letterbox) and survive route changes.
import BlackoutOverlay from '~/components/BlackoutOverlay.vue'
import EmergencyOverlay from '~/components/EmergencyOverlay.vue'

// Diagnostics — visible only when import.meta.env.DEV is true OR
// the operator sets localStorage 'nu-display:debugOverlay' = '1'
// on the physical display.
import CommandDebugOverlay from '~/components/CommandDebugOverlay.vue'

const TARGET_W = 1080
const TARGET_H = 1920
const stageEl = ref<HTMLElement | null>(null)
const scale = ref(1)

function fit() {
  if (!stageEl.value) return
  const vw = window.innerWidth
  const vh = window.innerHeight
  // 'contain' — fit entire 1080x1920 stage into the viewport, letterbox/pillarbox
  const s = Math.min(vw / TARGET_W, vh / TARGET_H)
  scale.value = s
  // Center the stage inside the viewport
  const x = (vw - TARGET_W * s) / 2
  const y = (vh - TARGET_H * s) / 2
  stageEl.value.style.transform = `translate(${x}px, ${y}px) scale(${s})`
}

onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
  window.addEventListener('orientationchange', fit)
  startSecurityMonitor()
})
onUnmounted(() => {
  window.removeEventListener('resize', fit)
  window.removeEventListener('orientationchange', fit)
})
</script>

<template>
  <div class="app-root">
    <div ref="stageEl" class="stage">
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