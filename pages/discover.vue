<script setup lang="ts">
import { computed } from 'vue'
import { useDisplayState, WORLDS } from '~/composables/useDisplayState'
import { useLocation } from '~/composables/useLocation'
import { PHOTOS_BY_CATEGORY } from '~/utils/photos'

const { go } = useDisplayState()
const { label } = useLocation()

const stats = [
  { value: '1934', label: 'Year founded' },
  { value: '56',   label: 'Acres on Lake Washington' },
  { value: '23+',  label: 'Undergraduate majors' },
  { value: '9',    label: 'Eagles teams' }
]
const mission = 'We, the people of Northwest University, carry the call of God by continually building a learning community dedicated to spiritual vitality, academic excellence, and empowered engagement with human need.'
const pillars = [
  { title: 'Spiritual Vitality',   color: 'var(--nu-blue)',  desc: 'A Christ-centered education where faith is not separate from learning but woven into every classroom, conversation, and campus experience. Chapel, worship nights, and spiritual formation are part of daily life.' },
  { title: 'Academic Excellence',  color: 'var(--nu-navy)',  desc: 'Rigorous liberal arts and professional programs taught by faculty who care deeply about your growth. Over 23 undergraduate majors and graduate degrees designed to prepare you for meaningful work.' },
  { title: 'Empowered Engagement', color: 'var(--nu-tour)', desc: 'Learning that moves beyond the classroom — service trips, global partnerships, leadership opportunities, and real-world projects that prepare you to make a difference wherever you go.' }
]

const selectedPillar = ref<typeof pillars[number] | null>(null)

function openPillar(p: typeof pillars[number]) {
  selectedPillar.value = p
  nextTick(() => {
    document.querySelector('.pillar-modal')?.scrollIntoView({ block: 'start' })
  })
}
function closePillar() {
  selectedPillar.value = null
}
const photos = computed(() => PHOTOS_BY_CATEGORY.community?.slice(0, 4) || [])
</script>

<template>
  <div class="world-body-inner">
    <WorldHeader
      eyebrow="Discover Northwest"
      title="About Northwest University"
      subtitle="Kirkland, Washington &middot; Since 1934"
    />

    <!-- Mission -->
    <div class="mission gradient-blue">
      <div class="eyebrow" style="color: var(--nu-tour)">Our Mission</div>
      <h2 class="mission-text italic">"{{ mission }}"</h2>
      <div class="mission-foot">
        <span class="dot" />
        <span>— Northwest University</span>
      </div>
    </div>

    <!-- Stats -->
    <h2 class="h2 sect">At a Glance</h2>
    <div class="stats stagger">
      <div v-for="(s, i) in stats" :key="s.label" class="stat-tile hover-lift bounce-in" :style="{ animationDelay: `${i * 100}ms` }">
        <div class="stat-num">{{ s.value }}</div>
        <div class="stat-lbl">{{ s.label }}</div>
      </div>
    </div>

    <!-- Pillars -->
    <h2 class="h2 sect">What Defines Us</h2>
    <div class="pillars stagger">
      <div
        v-for="(p, i) in pillars"
        :key="p.title"
        class="pillar hover-tilt"
        :style="{ '--pillar-color': p.color, animationDelay: `${i * 120}ms` }"
        @click="openPillar(p)"
      >
        <div class="pillar-bar" />
        <h3 class="h3">{{ p.title }}</h3>
      </div>
    </div>

    <!-- Pillar Modal -->
    <Transition name="modal">
      <div v-if="selectedPillar" class="pillar-modal" @click.self="closePillar" role="dialog" aria-modal="true">
        <div class="pillar-modal-card">
          <button class="modal-close" @click="closePillar" aria-label="Close">✕</button>
          <div class="pillar-modal-bar" :style="{ background: selectedPillar.color }" />
          <h2 class="pillar-modal-title">{{ selectedPillar.title }}</h2>
          <p class="pillar-modal-desc">{{ selectedPillar.desc }}</p>
        </div>
      </div>
    </Transition>

    <!-- Photo collage -->
    <h2 class="h2 sect">Life at NU</h2>
    <div class="collage stagger">
      <div
        v-for="p in photos"
        :key="p.src"
        class="collage-tile"
      >
        <img :src="`/images/${p.src}`" :alt="p.name" loading="lazy" />
      </div>
    </div>

    <!-- World nav -->
    <div class="world-nav gradient-sky">
      <div>
        <div class="eyebrow" style="color: var(--nu-navy)">Explore</div>
        <h3 class="h2" style="margin-top: 12px">Find your world.</h3>
      </div>
      <div class="world-grid">
        <button
          v-for="w in WORLDS.filter(x => x.key !== 'home' && x.key !== 'discover')"
          :key="w.key"
          class="world-pill"
          :style="{ '--pill': w.color }"
          @click="go(w.key)"
        >{{ w.label }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.world-body-inner {
  position: absolute; inset: 0;
  padding: 48px 56px 64px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  min-height: 0;
}
.world-body-inner::-webkit-scrollbar { display: none; }
.world-body-inner > * { animation: fadeUp 0.8s var(--ease-out-soft) both; }

.mission { padding: 48px; border-radius: 28px; margin-bottom: 40px; }
.mission-text {
  font-size: 40px; line-height: 1.25;
  color: var(--nu-wisp);
  margin-top: 16px;
}
.mission-foot { margin-top: 24px; color: var(--nu-skylight); display: flex; align-items: center; gap: 8px; font-size: 18px; }

.sect { margin: 40px 0 20px; }

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 8px;
}
.stat-tile {
  background: var(--nu-powder);
  border-radius: 24px;
  padding: 32px;
}
.stat-num {
  font-family: var(--font-serif);
  font-size: 64px; line-height: 1;
  color: var(--nu-blue);
  margin-bottom: 8px;
}
.stat-lbl { font-size: 18px; font-weight: 700; color: var(--nu-midnight); margin-bottom: 4px; }
.stat-sub { font-size: 14px; color: var(--nu-navy); opacity: 0.7; }

.pillars { display: grid; grid-template-columns: 1fr; gap: 14px; }
.pillar {
  background: var(--nu-cloud);
  border-radius: 24px;
  padding: 32px;
}
.pillar-bar {
  width: 64px; height: 8px;
  background: var(--pillar-color);
  border-radius: 4px;
  margin-bottom: 18px;
}

.collage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.collage-tile {
  position: relative;
  height: 240px;
  border-radius: 18px;
  overflow: hidden;
  background: var(--nu-powder);
}
.collage-tile img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
}

.world-nav { padding: 40px; border-radius: 28px; display: flex; flex-direction: column; gap: 24px; margin-top: 24px; }
.world-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.world-pill {
  padding: 14px 24px;
  border-radius: 999px;
  background: var(--nu-wisp);
  border: 2px solid var(--pill, var(--nu-blue));
  color: var(--nu-midnight);
  font-size: 17px; font-weight: 600;
  transition: transform 0.2s, background 0.2s;
}
.world-pill:hover { background: var(--pill, var(--nu-blue)); color: var(--nu-wisp); }
.world-pill:active { transform: scale(0.97); }

/* Pillar Modal */
.pillar-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 38, 61, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
.pillar-modal-card {
  background: var(--nu-wisp);
  border-radius: 28px;
  padding: 56px;
  max-width: 680px;
  width: 100%;
  position: relative;
  box-shadow: 0 32px 80px rgba(0, 38, 61, 0.35);
}
.modal-close {
  position: absolute;
  top: 24px; right: 28px;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--nu-cloud);
  border: none;
  font-size: 22px;
  color: var(--nu-navy);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.modal-close:hover { background: var(--nu-skylight); }
.pillar-modal-bar {
  width: 80px; height: 10px;
  border-radius: 5px;
  margin-bottom: 28px;
}
.pillar-modal-title {
  font-family: var(--font-serif);
  font-size: 52px;
  color: var(--nu-midnight);
  margin: 0 0 24px;
  line-height: 1.05;
}
.pillar-modal-desc {
  font-size: 22px;
  line-height: 1.5;
  color: var(--nu-navy);
  margin: 0;
}
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
