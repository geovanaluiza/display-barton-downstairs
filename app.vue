<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Phase 3: report this display's health + current page to Supabase
// every 30s. See composables/useDisplayHeartbeat.ts.
import { useDisplayHeartbeat } from '~/composables/useDisplayHeartbeat'
useDisplayHeartbeat()

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
