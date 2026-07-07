<script setup lang="ts">
const ministries = [
  { title: 'Gatherings & Events', text: 'Chapel, Convocation, Ignite, The Way, and other student-led worship events.', icon: '✦' },
  { title: 'NU Worship',           text: 'Worship Collective — student leaders serving the campus.',                       icon: '◇' },
  { title: 'NU Missions',          text: 'Short-term mission trips and global ministry partnerships.',                       icon: '◈' },
  { title: 'Choralons',           text: 'NU\u2019s choral music program performing on campus and beyond.',                   icon: '✺' },
  { title: 'Spiritual Life Credit', text: 'A program that supports spiritual formation alongside academic credit.',          icon: '✸' },
  { title: 'Local Churches',       text: 'Connections to the 40+ Assemblies of God and partner churches in the area.',          icon: '✣' }
]

// Worship photos curated for the page (from /public/images/).
// Each src is verified to exist on disk.
const photos = [
  { src: '251013TheWay-5604.jpg',                   name: 'Hands Lifted' },
  { src: '251013TheWay-5594.jpg',                   name: 'The Way Speaker' },
  { src: '251013TheWay-5587.jpg',                   name: 'Worship Together' },
  { src: '251013TheWay-5600.jpg',                   name: 'In Prayer' },
  { src: '250824IgniteJREdited  (20).jpg',         name: 'Ignite Worship' },
  { src: '250824IgniteJREdited  (26).jpg',         name: 'Ignite Night' },
  { src: '251013TheWay-5592.jpg',                   name: 'The Way' },
  { src: '251013TheWay-5623 2.jpg',                 name: 'The Way Service' },
  { src: '250828 Convocation Chapel Edited-3939.jpg', name: 'Convocation' },
  { src: 'WW_2025_Day1-3002.jpg',                   name: 'Circle of Friends' },
  { src: 'WW_2025_Day1-3147.jpg',                   name: 'Worship Conference' },
  { src: 'WW_2025_Day1-3583.jpg',                   name: 'Praise' }
]
</script>

<template>
  <div class="world-body-inner">
    <!-- Fullscreen hero (replaces WorldHeader) -->
    <section class="hero">
      <img class="hero-img" src="/images/260130_OneNight-9631.jpg" alt="Worship crowd at OneNight" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Faith &amp; Community</div>
        <h1 class="hero-title">Follow Your Faith.</h1>
        <p class="hero-subtitle">Follow Your Faith. <span class="italic">Find Your Future.</span></p>
      </div>
    </section>

    <div class="mosaic stagger">
      <div
        v-for="p in photos.slice(0, 4)"
        :key="p.src"
        class="mosaic-tile"
        :aria-label="p.name"
      >
        <img :src="`/images/${p.src}`" :alt="p.name" loading="lazy" decoding="async" />
        <div class="tile-veil" />
      </div>
    </div>

    <h2 class="h2 sect">Ways to Grow</h2>
    <div class="ministries stagger">
      <div v-for="m in ministries" :key="m.title" class="ministry">
        <div class="ministry-icon">{{ m.icon }}</div>
        <h3 class="ministry-title">{{ m.title }}</h3>
        <p class="ministry-text">{{ m.text }}</p>
      </div>
    </div>

    <div class="quote">
      <img class="quote-bg" src="/images/250903ChurchFair-4459.jpg" alt="A path through the campus at the Church Fair" />
      <div class="quote-veil" />
      <div class="quote-mark">"</div>
      <p class="quote-text">
        Christ at the Center. Worship deeply. Grow spiritually. Live purposefully.
      </p>
      <div class="quote-attrib">— Campus Ministries, Northwest University</div>
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
.world-body-inner > * { animation: fadeUp 0.7s var(--ease-out-soft) both; }

.sect { margin: 32px 0 18px; }
.italic { font-style: italic; }

/* === HERO (fullscreen, OneNight cover background) === */
.hero {
  position: relative;
  width: calc(100% + 112px);
  margin-left: -56px;
  margin-top: -48px;
  height: 60vh;
  min-height: 480px;
  max-height: 720px;
  overflow: hidden;
  background: #000;
  animation: scaleIn 0.7s var(--ease-out-soft) both;
}
.hero-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 30%;
  display: block;
  z-index: 0;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(0, 38, 61, 0.15) 0%,
    rgba(0, 38, 61, 0.30) 30%,
    rgba(0, 38, 61, 0.55) 60%,
    rgba(0, 38, 61, 0.85) 100%);
  z-index: 1;
  pointer-events: none;
}
.hero-content {
  position: absolute;
  left: 56px; right: 56px; bottom: 0;
  padding: 0 0 56px;
  color: var(--nu-wisp);
  z-index: 2;
}
.hero-eyebrow {
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 14px;
}
.hero-title {
  font-family: var(--font-serif);
  font-size: 96px; line-height: 1.0;
  color: var(--nu-wisp);
  margin: 0 0 16px;
  letter-spacing: -0.01em;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
}
.hero-subtitle {
  font-size: 24px; line-height: 1.4;
  color: var(--nu-skylight);
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
}

/* === WORSHIP TOGETHER MOSAIC (LARGER) === */
.mosaic {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 420px 420px;
  gap: 16px;
  margin: 48px 0 8px;
}
.mosaic-tile {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: var(--nu-powder);
  box-shadow: 0 10px 24px rgba(0, 38, 61, 0.14);
  animation: scaleIn 0.7s var(--ease-out-soft) both;
  transition: transform 0.6s var(--ease-out-soft);
}
.mosaic-tile img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 1s var(--ease-out-soft);
}
.mosaic-tile:hover img { transform: scale(1.06); }
.tile-veil {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,38,61,0) 60%, rgba(0,38,61,0.6) 100%);
  pointer-events: none;
}
.tile-label {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 20px 24px;
  color: var(--nu-wisp);
  font-family: var(--font-serif);
  font-size: 20px; font-style: italic;
  letter-spacing: 0.01em;
  z-index: 1;
}

.ministries {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.ministry {
  background: var(--nu-powder);
  border-radius: 22px;
  padding: 28px;
  animation: fadeUp 0.7s var(--ease-out-soft) both;
}
.ministry-icon {
  font-size: 44px;
  color: var(--nu-blue);
  font-family: var(--font-serif);
  margin-bottom: 12px;
  line-height: 1;
}
.ministry-title { font-family: var(--font-serif); font-size: 28px; color: var(--nu-midnight); }
.ministry-text { font-size: 16px; line-height: 1.4; color: var(--nu-navy); margin-top: 8px; }

.quote {
  position: relative;
  border-radius: 28px;
  padding: 72px 56px;
  min-height: 280px;
  color: var(--nu-wisp);
  overflow: hidden;
  margin-top: 32px;
  box-shadow: 0 18px 40px rgba(0, 38, 61, 0.22);
}
.quote-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  z-index: 0;
}
.quote-veil {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(0, 38, 61, 0.92) 0%, rgba(0, 38, 61, 0.78) 100%);
  z-index: 1;
}
.quote-mark {
  font-family: var(--font-serif);
  font-size: 200px;
  line-height: 1;
  color: var(--nu-tour);
  opacity: 0.5;
  position: absolute;
  top: -20px; left: 24px;
  z-index: 2;
}
.quote-text {
  font-family: var(--font-serif);
  font-size: 36px; line-height: 1.25;
  font-style: italic;
  color: var(--nu-wisp);
  position: relative;
  z-index: 2;
}
.quote-attrib {
  font-size: 18px;
  color: var(--nu-skylight);
  margin-top: 24px;
  position: relative;
  z-index: 2;
}
</style>
