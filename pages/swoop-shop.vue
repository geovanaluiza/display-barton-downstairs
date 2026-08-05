<script setup lang="ts">
import { ref } from 'vue'

// === Northwest SwoopShop — real product images from the official catalog ===
// All products are organized in 3 collections. Each product card uses the
// actual photo, real name, and short blurb. No fake prices.

interface Product {
  id: string
  name: string
  blurb: string
  img: string
  collection: 'apparel' | 'stickers' | 'gifts'
  accent: string
}

// === Lightbox state — tapping a product image opens it large in place ===
interface LightboxItem {
  src: string
  name: string
  collection: string
}
const lightbox = ref<LightboxItem | null>(null)

function openLightbox(src: string, name: string, collection: string) {
  lightbox.value = { src, name, collection }
}
function closeLightbox() {
  lightbox.value = null
}

// === BEST SELLERS — 4 top products ===
const heroProds: Product[] = [
  { id: 'p-hat',      name: 'Richardson 112 Trucker',    blurb: '',  img: 'products/prod-trucker-navy.jpg',    collection: 'apparel',    accent: 'var(--nu-navy)' },
  { id: 'p-crew',     name: 'Eagles Crewneck',      blurb: '',  img: 'products/prod-crew-bering.jpg',      collection: 'apparel',    accent: 'var(--nu-blue)' },
  { id: 'p-beanie',   name: 'Knit Beanie',         blurb: '',  img: 'products/prod-beanie-navy.jpg',     collection: 'apparel',    accent: 'var(--nu-navy)' },
  { id: 'p-hoodie',   name: 'Hanes Hoodie',        blurb: '',  img: 'products/prod-hoodie-royal.jpg',     collection: 'apparel',    accent: 'var(--nu-navy)' }
]

// === COLLECTIONS — 3 destinations ===
const collections = [
  {
    key: 'apparel',
    name: 'Apparel',
    blurb: 'Hoodies, tees, crewnecks, and polos for the Northwest life.',
    accent: 'var(--nu-navy)',
    cover: 'products/prod-hoodie-royal.jpg',
    items: [
      { name: 'Hanes Hoodie',      img: 'products/prod-hoodie-royal.jpg' },
      { name: 'Eagles Crewneck',   img: 'products/prod-crew-bering.jpg' },
      { name: 'Eagle Grey Crew',   img: 'products/prod-crew-eagle-grey.jpg' },
      { name: 'Eagles Tee',        img: 'products/prod-tee-seal-navy.jpg' },
      { name: 'Polo',             img: 'products/prod-polo-navy.jpg' }
    ]
  },
  {
    key: 'headwear',
    name: 'Headwear',
    blurb: 'Beanies, caps, and hats to show your Eagle spirit.',
    accent: 'var(--nu-tour)',
    cover: 'products/prod-beanie-navy.jpg',
    items: [
      { name: 'Knit Beanie',           img: 'products/prod-beanie-navy.jpg' },
      { name: 'Pom Beanie',             img: 'products/prod-pom-beanie-navy.jpg' },
      { name: 'Eagles Twill Cap',       img: 'products/prod-twill-eagles.jpg' },
      { name: 'Trucker Hat',           img: 'products/prod-trucker-navy.jpg' },
      { name: 'Sportsman Hat',          img: 'products/prod-hat-navy.jpg' }
    ]
  },
  {
    key: 'accessories',
    name: 'Accessories',
    blurb: 'Bottles and more for the Northwest life.',
    accent: 'var(--nu-leaf)',
    cover: 'products/prod-bottle-blue.jpg',
    items: [
      { name: 'Flair Bottle',     img: 'products/prod-bottle-blue.jpg' }
    ]
  }
]

// === STICKER SHOWCASE — a small curated selection ===
const stickerShowcase = [
  { name: 'NU Vert Bar',     img: 'products/sticker-nu-vertbar.png' },
  { name: 'Mountain Scene',  img: 'products/sticker-nu-mountain.png' },
  { name: 'Eagle Wave',      img: 'products/sticker-eagle-wave.png' },
  { name: 'NU Stacked',      img: 'products/sticker-nu-stacked.png' },
  { name: 'Seal (White)',    img: 'products/sticker-seal-white.png' },
  { name: 'Alumni',          img: 'products/sticker-nu-alumni.png' }
]

// === MISSION ===
const mission = [
  { icon: '✦', title: 'Faith Centered',  text: 'Grounded in Christ and committed to living our faith through learning, service, and leadership.', accent: 'var(--nu-tour)' },
  { icon: '◈', title: 'Eagle Community', text: 'A community where students, alumni, faculty, and families belong.',                              accent: 'var(--nu-blue)' },
  { icon: '✣', title: 'Made to Impact',  text: 'Every purchase supports student programs, campus initiatives, and Northwest University experiences.', accent: 'var(--nu-leaf)' }
]
</script>

<template>
  <div class="world-body-inner swoop-page">
    <!-- ============================================================== -->
    <!-- HERO — single full-width real SwoopShop photo                  -->
    <!-- ============================================================== -->
    <section class="hero">
      <img
        class="hero-photo"
        src="/images/swoopshop/hero-main.jpg"
        alt="Northwest Eagles apparel on display at the SwoopShop"
      />
      <div class="hero-gradient" />
      <div class="hero-radial" />

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="ey-dot" /> SwoopShop
        </div>
        <h1 class="hero-title">Show Your Eagle Spirit.</h1>
        <p class="hero-subtitle">
          Visit us in the Pecota Student Center to get your official Northwest University spirit gear on Mondays and Fridays. A variety of new apparel, drinkware and accessories have just arrived for the 26-27 academic year!
        </p>

        <div class="hero-meta">
          <span>Visit us in person at Pecota</span>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- VISIT US — physical location block (anchored near the top)      -->
    <!-- ============================================================== -->
    <section class="find">
      <div class="find-card">
        <div class="find-pattern" aria-hidden="true">
          <svg viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M0,200 L0,120 L50,80 L100,110 L150,60 L200,90 L250,50 L300,80 L350,40 L400,70 L400,200 Z" fill="var(--nu-tour)" opacity="0.18" />
            <path d="M0,200 L0,160 L50,140 L100,150 L150,120 L200,140 L250,110 L300,130 L350,100 L400,120 L400,200 Z" fill="var(--nu-navy)" opacity="0.22" />
          </svg>
        </div>
        <div class="find-content">
          <div class="find-eyebrow">Find the Shop</div>
          <h2 class="find-title">Visit the SwoopShop in person.</h2>
          <p class="find-detail">
            Visit us in the Pecota Student Center on the Kirkland campus.
            Get your official Northwest University spirit gear today!
          </p>
          <div class="find-meta">
            <div class="find-meta-item">
              <div class="find-meta-label">Hours</div>
              <div class="find-meta-value">Mon 10:00 AM - 2:00 PM &middot; Fri 11:15 AM - 2:00 PM</div>
            </div>
            <div class="find-meta-item">
              <div class="find-meta-label">Contact</div>
              <div class="find-meta-value">swoopshop@northwestu.edu</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- FEATURED — 4 hero products shown as a clean grid below        -->
    <!-- ============================================================== -->
    <section class="featured">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Featured</div>
          <h2 class="sect-title">Best Sellers</h2>
        </div>
      </div>

      <div class="featured-grid stagger">
        <article
          v-for="(p, i) in heroProds"
          :key="`feat-${p.id}`"
          class="feat-card hover-lift"
          :style="{ '--accent': p.accent, animationDelay: `${i * 80}ms` }"
        >
          <div class="feat-img">
            <img :src="`/images/${p.img}`" :alt="p.name" />
          </div>
          <div class="feat-body">
            <div class="feat-cat" :style="{ background: p.accent }">
              {{ p.collection }}
            </div>
            <h3 class="feat-name">{{ p.name }}</h3>
          </div>
        </article>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- COLLECTIONS — 4 collections, all products visible in place      -->
    <!-- ============================================================== -->
    <section class="collections">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Explore</div>
          <h2 class="sect-title">Find your kind of Northwest.</h2>
        </div>
        <p class="sect-subtitle">Browse every collection in one simple view.</p>
      </div>

      <div class="collections-stack stagger">
        <article
          v-for="(c, i) in collections"
          :key="c.key"
          :data-collection="c.key"
          class="coll-card"
          :style="{ '--accent': c.accent, animationDelay: `${i * 80}ms` }"
        >
          <div class="coll-header">
            <div class="coll-cover">
              <img :src="`/images/${c.cover}`" :alt="`${c.name} collection`" />
              <div class="coll-shade" />
              <div class="coll-num">0{{ i + 1 }}</div>
            </div>
            <div class="coll-intro">
              <h3 class="coll-name">{{ c.name }}</h3>
              <p class="coll-blurb">{{ c.blurb }}</p>
              <div class="coll-count">
                <span class="count-num">{{ c.items.length }}</span>
                <span class="count-label">pieces in this collection</span>
              </div>
            </div>
          </div>

          <!-- All products from this collection, always visible -->
          <div class="coll-grid">
            <div
              v-for="(it, ix) in c.items"
              :key="`item-${ix}`"
              class="grid-item"
              :style="{ animationDelay: `${ix * 50}ms` }"
              @click="openLightbox(it.img, it.name, c.name)"
            >
              <div class="grid-img">
                <img :src="`/images/${it.img}`" :alt="it.name" />
                <div class="grid-zoom" aria-hidden="true">
                  <span class="zoom-line" />
                  <span class="zoom-line zoom-line--v" />
                </div>
              </div>
              <div class="grid-name">{{ it.name }}</div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- LIGHTBOX — full-screen product viewer (tap to close)           -->
    <!-- ============================================================== -->
    <transition name="lightbox">
      <div v-if="lightbox" class="lightbox" @click="closeLightbox">
        <div class="lightbox-bg" />
        <div class="lightbox-card" @click.stop>
          <div class="lightbox-image">
            <img :src="`/images/${lightbox.src}`" :alt="lightbox.name" />
          </div>
          <div class="lightbox-meta">
            <div class="lightbox-collection">{{ lightbox.collection }}</div>
            <h3 class="lightbox-name">{{ lightbox.name }}</h3>
            <p class="lightbox-hint">Tap anywhere to close</p>
          </div>
          <button class="lightbox-close" @click="closeLightbox" aria-label="Close">
            <span class="close-line close-line--1" />
            <span class="close-line close-line--2" />
          </button>
        </div>
      </div>
    </transition>

    <!-- ============================================================== -->
    <!-- STICKER SHOWCASE — collection of Northwest vinyls               -->
    <!-- ============================================================== -->
    <section class="sticker-section">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Stickers</div>
          <h2 class="sect-title">A small bit of Northwest, on the go.</h2>
        </div>
        <p class="sect-subtitle">Vinyl decals and die-cuts. Laptops, water bottles, and journals.</p>
      </div>

      <div class="sticker-grid stagger">
        <div
          v-for="(s, i) in stickerShowcase"
          :key="s.name"
          class="sticker-card"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <div class="sticker-img-frame">
            <img :src="`/images/${s.img}`" :alt="s.name" />
          </div>
          <div class="sticker-name">{{ s.name }}</div>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- MISSION — community & faith cards                              -->
    <!-- ============================================================== -->
    <section class="mission">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Why we do it</div>
          <h2 class="sect-title">More than merchandise.</h2>
        </div>
      </div>

      <div class="mission-grid stagger">
        <article
          v-for="(m, i) in mission"
          :key="m.title"
          class="mission-card hover-lift"
          :style="{ '--accent': m.accent, animationDelay: `${i * 100}ms` }"
        >
          <div class="mission-icon">{{ m.icon }}</div>
          <h3 class="mission-title">{{ m.title }}</h3>
          <p class="mission-text">{{ m.text }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.world-body-inner {
  position: absolute; inset: 0;
  padding: 0 56px 64px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  min-height: 0;
  background: #eaf4fb;
}
.world-body-inner::-webkit-scrollbar { display: none; }

/* ================================================================ */
/*  HERO — single full-width real SwoopShop photo                    */
/* ================================================================ */
.hero {
  position: relative;
  width: calc(100% + 112px);
  margin-left: -56px;
  margin-top: 0;
  margin-bottom: 64px;
  height: 64vh;
  min-height: 560px;
  max-height: 800px;
  overflow: hidden;
  background: var(--nu-navy);
  box-shadow: 0 24px 60px rgba(0, 38, 61, 0.22);
  animation: scaleIn 0.8s var(--ease-out-soft) both;
}
.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  z-index: 0;
  animation: scaleIn 1.2s var(--ease-out-soft) both;
}
.hero-gradient {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 38, 61, 0.45) 0%, rgba(0, 38, 61, 0.05) 30%, rgba(0, 38, 61, 0.10) 60%, rgba(0, 38, 61, 0.85) 100%),
    linear-gradient(90deg, rgba(0, 38, 61, 0.55) 0%, rgba(0, 38, 61, 0.10) 40%, rgba(0, 38, 61, 0.10) 70%, rgba(0, 38, 61, 0.55) 100%);
  z-index: 1;
  pointer-events: none;
}
.hero-radial {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 50% 100%, rgba(251, 217, 69, 0.20) 0%, transparent 45%);
  z-index: 2;
  pointer-events: none;
}
.hero-content {
  position: absolute;
  z-index: 3;
  inset: 0;
  padding: 0 56px 56px;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  color: var(--nu-wisp);
}
.hero-grid {
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  z-index: 0;
}
.hero-cell {
  position: relative;
  overflow: hidden;
  animation: fadeUp 0.7s var(--ease-out-soft) both;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-cell:last-child { border-right: none; }
.hero-cell img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  transition: transform 6s ease-out;
}
.hero:hover .hero-cell img { transform: scale(1.04); }
.hero-cell-tag {
  position: absolute;
  bottom: 14px; left: 14px;
  font-size: 11px; font-weight: 800;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--nu-wisp);
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(0, 38, 61, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 2;
}
.hero-gradient {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 38, 61, 0.55) 0%, rgba(0, 38, 61, 0.15) 35%, rgba(0, 38, 61, 0.85) 100%),
    linear-gradient(90deg, rgba(0, 38, 61, 0.45) 0%, rgba(0, 38, 61, 0.05) 30%, rgba(0, 38, 61, 0.05) 70%, rgba(0, 38, 61, 0.55) 100%);
  z-index: 1;
  pointer-events: none;
}
.hero-radial {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 50% 100%, rgba(251, 217, 69, 0.18) 0%, transparent 45%);
  z-index: 2;
  pointer-events: none;
}
.hero-content {
  position: absolute;
  z-index: 3;
  inset: 0;
  padding: 0 56px 56px;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  color: var(--nu-wisp);
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 14px;
  animation: fadeUp 0.7s var(--ease-out-soft) both;
}
.ey-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--nu-tour);
  box-shadow: 0 0 0 4px rgba(251, 217, 69, 0.25);
  animation: pulse 1.8s ease-in-out infinite;
}
.hero-title {
  font-family: 'Redzone', Georgia, serif;
  font-size: 92px; line-height: 0.96;
  color: var(--nu-wisp);
  margin: 0 0 14px;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.1s both;
  max-width: 18ch;
}
.hero-subtitle {
  font-size: 20px; line-height: 1.4;
  color: var(--nu-wisp);
  opacity: 0.95;
  margin: 0 0 22px;
  max-width: 56ch;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.2s both;
}
.hero-subtitle strong {
  color: var(--nu-tour);
  font-weight: 700;
}
.hero-meta {
  display: flex; align-items: center; gap: 14px;
  font-size: 14px;
  color: var(--nu-skylight);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.3s both;
}
.hero-meta strong {
  font-family: 'Redzone', Georgia, serif;
  font-size: 20px; font-weight: 700;
  color: var(--nu-tour);
  margin-right: 4px;
}
.dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--nu-skylight);
  opacity: 0.6;
}

/* === FEATURED — 4 products grid below hero === */
.featured { margin: 0 0 64px; }
.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 28px;
}
.feat-card {
  position: relative;
  background: var(--nu-wisp);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(0, 38, 61, 0.16);
  border: 1px solid rgba(0, 38, 61, 0.06);
  transition: transform 0.4s var(--ease-out-soft), box-shadow 0.4s var(--ease-out-soft);
  animation: fadeUp 0.7s var(--ease-out-soft) both;
}
.feat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(0, 38, 61, 0.22);
}
.feat-img {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #fff;
  overflow: hidden;
}
.feat-img img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  transition: transform 0.6s var(--ease-out-soft);
}
.feat-card:hover .feat-img img { transform: scale(1.06); }
.feat-body { padding: 18px 20px 22px; }
.feat-cat {
  display: inline-block;
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--nu-midnight);
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
}
.feat-name {
  font-family: 'Redzone', Georgia, serif;
  font-size: 22px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}
.feat-blurb {
  font-size: 13px; line-height: 1.45;
  color: rgba(0, 38, 61, 0.7);
  margin: 0;
}

/* ================================================================ */
/*  FIND US — physical location block                                */
/* ================================================================ */
.find { margin: 0 0 64px; }
.find-card {
  position: relative;
  border-radius: 28px;
  padding: 48px 56px;
  background: linear-gradient(135deg, var(--nu-navy) 0%, var(--nu-blue) 100%);
  color: var(--nu-wisp);
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(0, 38, 61, 0.22);
}
.find-pattern {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}
.find-pattern svg { width: 100%; height: 100%; display: block; }
.find-content { position: relative; z-index: 1; }
.find-eyebrow {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 12px;
}
.find-title {
  font-family: 'Redzone', Georgia, serif;
  font-size: 48px; line-height: 1.05;
  color: var(--nu-wisp);
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}
.find-detail {
  font-size: 18px; line-height: 1.45;
  color: var(--nu-skylight);
  margin: 0 0 28px;
  max-width: 60ch;
}
.find-meta {
  display: flex; gap: 40px;
}
.find-meta-item { display: flex; flex-direction: column; gap: 4px; }
.find-meta-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--nu-tour);
}
.find-meta-value {
  font-size: 17px; font-weight: 600;
  color: var(--nu-wisp);
}

/* ================================================================ */
/*  COLLECTIONS                                                     */
/* ================================================================ */
.collections { margin: 0 0 64px; }
.section-head {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 28px;
  gap: 24px;
}
.sect-eyebrow {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 6px;
}
.sect-title {
  font-family: 'Redzone', Georgia, serif;
  font-size: 48px; line-height: 1.05;
  color: var(--nu-midnight);
  margin: 0;
  letter-spacing: -0.01em;
}
.sect-subtitle {
  font-size: 16px; line-height: 1.45;
  color: var(--nu-navy);
  margin: 0;
  max-width: 40ch;
  text-align: right;
  opacity: 0.85;
}
/* === STACK: each collection is its own card, all 5 products shown === */
.collections-stack {
  display: flex; flex-direction: column;
  gap: 28px;
}
.coll-card {
  position: relative;
  width: 100%;
  background: var(--nu-wisp);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 38, 61, 0.10);
  border: 1px solid var(--nu-cloud);
  display: flex; flex-direction: column;
  transition: transform 0.4s var(--ease-out-soft), box-shadow 0.4s var(--ease-out-soft);
  animation: scaleIn 0.6s var(--ease-out-soft) both;
}
.coll-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 38, 61, 0.16);
}

/* === Header: cover photo + intro side by side === */
.coll-header {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 32px;
  padding: 28px 28px 0;
  align-items: stretch;
}
.coll-cover {
  position: relative;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  background: var(--nu-powder);
}
.coll-cover img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  transition: transform 0.6s var(--ease-out-soft);
}
.coll-card:hover .coll-cover img { transform: scale(1.05); }
.coll-shade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.22) 100%);
  pointer-events: none;
}
.coll-num {
  position: absolute;
  top: 16px; left: 16px;
  font-family: var(--font-serif);
  font-size: 22px; font-weight: 700;
  color: var(--nu-wisp);
  letter-spacing: 0.06em;
  background: rgba(0, 0, 0, 0.32);
  padding: 4px 10px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  z-index: 2;
}
.coll-intro {
  display: flex; flex-direction: column;
  justify-content: center;
  padding: 16px 0;
}
.coll-name {
  font-family: 'Redzone', Georgia, serif;
  font-size: 44px; line-height: 1.05;
  color: var(--nu-midnight);
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}
.coll-blurb {
  font-size: 16px; line-height: 1.5;
  color: var(--nu-navy);
  margin: 0 0 20px;
  opacity: 0.85;
  max-width: 50ch;
}
.coll-count {
  display: flex; align-items: baseline; gap: 8px;
}
.count-num {
  font-family: var(--font-serif);
  font-size: 32px; font-weight: 700;
  color: var(--accent);
  line-height: 1;
}
.count-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--nu-navy);
  opacity: 0.7;
}

/* === All-products grid (always visible) === */
.coll-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  padding: 24px 28px 28px;
}
.grid-item {
  display: flex; flex-direction: column; gap: 10px;
  padding: 12px;
  background: var(--nu-powder);
  border-radius: 16px;
  border: 1px solid var(--nu-cloud);
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s, border-color 0.3s;
  animation: fadeUp 0.5s var(--ease-out-soft) both;
  cursor: pointer;
}
.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 38, 61, 0.14);
  border-color: var(--accent);
}
.grid-img {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: var(--nu-wisp);
}
.grid-img img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  transition: transform 0.5s var(--ease-out-soft);
}
.grid-item:hover .grid-img img { transform: scale(1.06); }
.grid-zoom {
  position: absolute;
  bottom: 10px; right: 10px;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(0, 38, 61, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s, transform 0.3s var(--ease-out-soft);
  pointer-events: none;
}
.grid-item:hover .grid-zoom {
  opacity: 1;
  transform: scale(1);
}
.zoom-line {
  position: absolute;
  width: 14px; height: 2px;
  background: var(--nu-wisp);
  border-radius: 1px;
}
.zoom-line--v { transform: rotate(90deg); }
.grid-name {
  font-size: 13px; font-weight: 700;
  color: var(--nu-midnight);
  text-align: center;
  letter-spacing: 0.01em;
  line-height: 1.3;
  padding: 0 4px;
}

/* ================================================================ */
/*  STICKER SHOWCASE                                                */
/* ================================================================ */
.sticker-section { margin: 0 0 64px; }
.sticker-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}
.sticker-card {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 18px 12px 16px;
  background: var(--nu-wisp);
  border-radius: 18px;
  border: 1px solid var(--nu-cloud);
  box-shadow: 0 2px 8px rgba(0, 38, 61, 0.04);
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s var(--ease-out-soft);
  animation: scaleIn 0.5s var(--ease-out-soft) both;
}
.sticker-card:hover {
  transform: translateY(-4px) rotate(-1deg);
  box-shadow: 0 12px 28px rgba(0, 38, 61, 0.12);
}
.sticker-img-frame {
  width: 100%;
  aspect-ratio: 1;
  display: flex; align-items: center; justify-content: center;
  background: var(--nu-powder);
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
}
.sticker-img-frame img {
  width: 100%; height: 100%;
  object-fit: contain;
  display: block;
}
.sticker-name {
  font-family: var(--font-serif);
  font-size: 14px;
  color: var(--nu-midnight);
  text-align: center;
  line-height: 1.2;
}

/* ================================================================ */
/*  MISSION                                                          */
/* ================================================================ */
.mission { margin: 0 0 16px; }
.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.mission-card {
  position: relative;
  background: var(--nu-wisp);
  border-radius: 22px;
  padding: 32px 28px;
  border: 1px solid var(--nu-cloud);
  box-shadow: 0 4px 14px rgba(0, 38, 61, 0.05);
  display: flex; flex-direction: column;
  gap: 12px;
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s var(--ease-out-soft);
  animation: scaleIn 0.5s var(--ease-out-soft) both;
  overflow: hidden;
}
.mission-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out-soft);
}
.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 38, 61, 0.14);
}
.mission-card:hover::before { transform: scaleX(1); }
.mission-icon {
  font-size: 36px;
  color: var(--accent);
  line-height: 1;
  font-family: var(--font-serif);
}
.mission-title {
  font-family: var(--font-serif);
  font-size: 24px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0;
}
.mission-text {
  font-size: 14px; line-height: 1.5;
  color: var(--nu-navy);
  margin: 0;
  opacity: 0.85;
  flex: 1;
}

/* ================================================================ */
/*  LIGHTBOX — full-screen product viewer                           */
/* ================================================================ */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  padding: 40px;
}
.lightbox-bg {
  position: absolute; inset: 0;
  background: rgba(0, 38, 61, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.lightbox-card {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  max-width: 1500px;
  width: 100%;
  max-height: 90vh;
  background: var(--nu-wisp);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  cursor: default;
  overflow: hidden;
}
.lightbox-image {
  position: relative;
  background: var(--nu-powder);
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex; align-items: center; justify-content: center;
}
.lightbox-image img {
  width: 100%; height: 100%;
  object-fit: contain;
  display: block;
}
.lightbox-meta {
  display: flex; flex-direction: column;
  justify-content: center;
  padding: 20px 12px;
}
.lightbox-collection {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 18px;
}
.lightbox-name {
  font-family: var(--font-serif);
  font-size: 56px; line-height: 1.05;
  color: var(--nu-midnight);
  margin: 0 0 24px;
  letter-spacing: -0.02em;
}
.lightbox-hint {
  font-size: 14px;
  color: var(--nu-navy);
  opacity: 0.6;
  margin: 0;
}
.lightbox-close {
  position: absolute;
  top: 20px; right: 20px;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(0, 38, 61, 0.08);
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s, transform 0.3s var(--ease-out-soft);
  z-index: 2;
}
.lightbox-close:hover {
  background: rgba(0, 38, 61, 0.16);
  transform: scale(1.08) rotate(90deg);
}
.close-line {
  position: absolute;
  width: 18px; height: 2px;
  background: var(--nu-midnight);
  border-radius: 1px;
}
.close-line--1 { transform: rotate(45deg); }
.close-line--2 { transform: rotate(-45deg); }

/* Lightbox transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.35s var(--ease-out-soft);
}
.lightbox-enter-active .lightbox-card,
.lightbox-leave-active .lightbox-card {
  transition: transform 0.45s var(--ease-out-soft), opacity 0.35s;
}
.lightbox-enter-from,
.lightbox-leave-to { opacity: 0; }
.lightbox-enter-from .lightbox-card,
.lightbox-leave-to .lightbox-card {
  transform: scale(0.9);
  opacity: 0;
}
.lightbox-enter-to .lightbox-card,
.lightbox-leave-from .lightbox-card {
  transform: scale(1);
  opacity: 1;
}

/* ================================================================ */
/*  RESPONSIVE                                                      */
/* ================================================================ */
@media (max-width: 720px) {
  .hero-title { font-size: 56px; }
  .featured-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .coll-header { grid-template-columns: 1fr; padding: 20px 20px 0; gap: 20px; }
  .coll-cover { height: 220px; }
  .coll-name { font-size: 32px; }
  .coll-grid { grid-template-columns: repeat(2, 1fr); padding: 20px; gap: 12px; }
  .sticker-grid { grid-template-columns: repeat(3, 1fr); }
  .mission-grid { grid-template-columns: 1fr; }
  .sect-title, .find-title { font-size: 36px; }
  .section-head { flex-direction: column; align-items: flex-start; }
  .sect-subtitle { text-align: left; }
  .find-meta { flex-direction: column; gap: 16px; }
  .lightbox { padding: 16px; }
  .lightbox-card { grid-template-columns: 1fr; padding: 24px; max-height: 92vh; }
  .lightbox-image { aspect-ratio: 1; }
  .lightbox-name { font-size: 32px; }
}
</style>
