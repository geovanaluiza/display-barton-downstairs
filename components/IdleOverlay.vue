<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { FEATURED_PHOTOS } from '~/utils/photos'

const emit = defineEmits<{ wake: [] }>()

const photos = computed(() => [...FEATURED_PHOTOS].sort(() => Math.random() - 0.5).slice(0, 18))
const idx = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const stats = [
  { value: '1934',  label: 'Year Northwest was founded' },
  { value: '56',    label: 'Acres overlooking Lake Washington' },
  { value: '23+',   label: 'Undergraduate majors' },
  { value: '20+',   label: 'Clubs and organizations' },
  { value: '9',     label: 'Eagles athletic teams' },
  { value: 'AG',    label: 'Affiliated with the Assemblies of God' }
]
const stat = computed(() => stats[idx.value % stats.length])
const current = computed(() => photos.value[idx.value % photos.value.length])

function tick() { idx.value = (idx.value + 1) % photos.value.length }

onMounted(() => {
  // Original 18-photo preloader is removed — the slideshow advances
  // one slide at a time so only the current photo is requested.
  timer = setInterval(tick, 6000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <div class="idle" @pointerdown="emit('wake')">
    <div class="bg">
      <transition name="kenburns" mode="default">
        <div
          :key="current.src"
          class="bg-img"
          :style="{ backgroundImage: `url(/images/${current.src})` }"
        />
      </transition>
      <div class="bg-veil" />
    </div>

    <!-- Top brand -->
    <div class="watermark">
      <div class="wm-mark">NU</div>
      <div class="wm-text">
        <div class="wm-name">Northwest University</div>
        <div class="wm-sub">Campus Display</div>
      </div>
    </div>

    <!-- Centered title block (vertically stacked for portrait) -->
    <div class="title-block">
      <div class="eyebrow">Discover NU</div>
      <h1 class="display-1 italic">Welcome to NU.</h1>
      <p class="lede">Tap anywhere to explore.</p>
    </div>

    <!-- Floating stat card at the bottom -->
    <transition name="stat" mode="out-in">
      <div :key="stat.label" class="stat-card glass">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.idle {
  position: absolute; inset: 0;
  width: 1080px;
  height: 1920px;
  z-index: 50;
  cursor: pointer;
  overflow: hidden;
  background: var(--nu-blue);
}
.bg { position: absolute; inset: 0; }
.bg-img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  animation: kenburns 14s ease-in-out infinite alternate;
}
.bg-veil {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(0,38,61,0.4) 0%, rgba(0,38,61,0) 30%, rgba(0,38,61,0) 60%, rgba(0,38,61,0.7) 100%);
}

.kenburns-enter-active { transition: opacity 1.4s ease-in-out; }
.kenburns-leave-active { transition: opacity 1.4s ease-in-out; }
.kenburns-enter-from, .kenburns-leave-to { opacity: 0; }

.watermark {
  position: absolute;
  top: 56px; left: 56px;
  display: flex; align-items: center; gap: 20px;
  color: var(--nu-wisp);
  z-index: 2;
}
.wm-mark {
  width: 76px; height: 76px;
  border-radius: 22px;
  background: var(--nu-tour);
  color: var(--nu-midnight);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-serif);
  font-size: 32px; font-weight: 700;
}
.wm-name {
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 1.1;
}
.wm-sub {
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  opacity: 0.85;
  margin-top: 4px;
}

.title-block {
  position: absolute;
  left: 56px; right: 56px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--nu-wisp);
  text-align: center;
}
.title-block .eyebrow {
  color: var(--nu-tour);
  font-size: 22px;
  margin-bottom: 24px;
}
.title-block .display-1 {
  color: var(--nu-wisp);
  font-size: 120px;
  line-height: 0.95;
  margin-bottom: 28px;
}
.title-block .lede {
  margin: 0 auto;
  color: var(--nu-skylight);
  font-size: 28px;
  max-width: 22ch;
}

.stat-card {
  position: absolute;
  left: 50%;
  bottom: 130px;
  transform: translateX(-50%);
  padding: 36px 56px;
  border-radius: 28px;
  min-width: 520px;
  text-align: center;
}
.stat-value {
  font-family: var(--font-serif);
  font-size: 96px; line-height: 1;
  color: var(--nu-blue);
  margin-bottom: 10px;
}
.stat-label {
  font-size: 18px; font-weight: 600;
  color: var(--nu-navy);
  letter-spacing: 0.06em;
}
.stat-enter-active, .stat-leave-active { transition: transform 0.7s var(--ease-out-soft), opacity 0.7s; }
.stat-enter-from { transform: translate(-50%, 30px); opacity: 0; }
.stat-leave-to   { transform: translate(-50%, -30px); opacity: 0; }
</style>
