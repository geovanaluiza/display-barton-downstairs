<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { CLUBS } from '~/utils/content'

// Scroll targets (refs to in-page sections — every CTA stays inside the kiosk)
const orgsRef   = ref<HTMLElement | null>(null)
const startRef  = ref<HTMLElement | null>(null)

function smoothScrollTo(target: HTMLElement | null) {
  if (!target) return
  // The scrollable container is the page's own .world-body-inner
  // (the target itself is a child of it, so closest() returns itself)
  const scroller = (target.closest('.life-page') || target.closest('.world-body-inner') || document.querySelector('main.page-area')) as HTMLElement | null
  if (scroller && scroller.scrollHeight > scroller.clientHeight) {
    const top = target.offsetTop - 24
    scroller.scrollTo({ top, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function scrollToOrgs()  { smoothScrollTo(orgsRef.value) }
function scrollToStart() { smoothScrollTo(startRef.value) }

// Category navigation with icons
const categories = [
  { key: 'All',         label: 'All',         icon: '◉' },
  { key: 'Academic',    label: 'Academic',    icon: '✦' },
  { key: 'Faith',       label: 'Faith',       icon: '◈' },
  { key: 'Athletics',   label: 'Athletics',   icon: '◆' },
  { key: 'Arts',        label: 'Arts',        icon: '✺' },
  { key: 'Cultural',    label: 'Cultural',    icon: '◎' },
  { key: 'Leadership',  label: 'Leadership',  icon: '✣' },
  { key: 'Business',    label: 'Business',    icon: '◊' },
  { key: 'General',     label: 'General',     icon: '◯' }
]
const active = ref('All')
const visibleClubs = computed(() =>
  active.value === 'All' ? CLUBS : CLUBS.filter(c => c.category === active.value)
)

const selectedClub = ref<typeof CLUBS[number] | null>(null)

function openClub(club: typeof CLUBS[number]) {
  selectedClub.value = club
  nextTick(() => {
    document.querySelector('.club-modal')?.scrollIntoView({ block: 'start' })
  })
}
function closeClub() {
  selectedClub.value = null
}

// === TRADITIONS — featured immersive cards ===
const traditions = [
  {
    title: 'First Day at NU',
    blurb: 'New students arrive on campus and begin their journey at Northwest.',
    img: '250825FirstDayEdited (13).jpg',
    accent: 'var(--nu-blue)',
    icon: '☀️'
  },
  {
    title: 'Bridal Trails',
    blurb: 'A founding tradition that has welcomed generations of students home.',
    img: '250918BridalTrails-5064.jpg',
    accent: 'var(--nu-leaf)',
    icon: '✦'
  },
  {
    title: 'Leadership Fair',
    blurb: 'Where 23 official clubs and organizations come together in one place.',
    img: '250821 StudentLeadershipFairEdited5446.jpg',
    accent: 'var(--nu-tour)',
    icon: '✣'
  },
  {
    title: 'Family Weekend',
    blurb: 'Parents, siblings, and loved ones gather to share the Northwest story.',
    img: '251004FamilyWeekend-5201.jpg',
    accent: 'var(--nu-amber)',
    icon: '◉'
  }
]

// === DELIGHT STICKERS — Christian-aligned, faith/community/service themed ===
const stickers = [
  { icon: '✦', label: 'Spirit',     color: 'var(--nu-tour)' },
  { icon: '◈', label: 'Service',    color: 'var(--nu-leaf)' },
  { icon: '☀', label: 'Belonging',  color: 'var(--nu-amber)' },
  { icon: '✣', label: 'Leadership', color: 'var(--nu-blue)' },
  { icon: '✺', label: 'Community',  color: 'var(--nu-tour)' }
]
</script>

<template>
  <div class="world-body-inner life-page">
    <!-- === HERO: full-bleed photo + bold typography === -->
    <section class="hero">
      <img class="hero-img" src="/images/250821 StudentLeadershipFairEdited5446.jpg" alt="Students gathered at the Leadership Fair on the Northwest campus" />
      <div class="hero-overlay" />

      <div class="hero-content">
        <div class="hero-eyebrow">Student Life</div>
        <h1 class="hero-title">Your Club.<br/>Your Community.</h1>
        <p class="hero-subtitle">Find your place. Build your friendships. Lead with purpose.</p>
        <div class="hero-cta">
          <button class="cta-primary" @click="scrollToOrgs">Explore Clubs</button>
          <button class="cta-secondary" @click="scrollToStart">Start a Club</button>
        </div>
        <div class="hero-meta">
          <span><strong>23</strong> official clubs</span>
          <span class="dot" />
          <span><strong>9</strong> categories</span>
          <span class="dot" />
          <span>Pick yours or start your own</span>
        </div>
      </div>
    </section>

    <!-- === CATEGORY NAVIGATION: interactive pill chips === -->
    <section class="categories">
      <div class="cat-header">
        <div class="cat-eyebrow">Browse by interest</div>
        <h2 class="cat-title">Find your kind of community.</h2>
      </div>
      <div class="cat-chips">
        <button
          v-for="c in categories"
          :key="c.key"
          class="cat-chip"
          :class="{ 'is-active': active === c.key }"
          @click="active = c.key"
        >
          <span class="cat-label">{{ c.label }}</span>
          <span class="cat-count" v-if="c.key === 'All'">{{ CLUBS.length }}</span>
          <span class="cat-count" v-else>{{ CLUBS.filter(x => x.category === c.key).length }}</span>
        </button>
      </div>
    </section>

    <!-- === TRADITIONS: horizontal scroll carousel of immersive cards === -->
    <section class="traditions">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Traditions</div>
          <h2 class="sect-title">Beloved by every Eagle.</h2>
        </div>
        <p class="sect-subtitle">The moments that make Northwest, Northwest.</p>
      </div>
      <div class="trad-rail">
        <article v-for="(t, i) in traditions" :key="t.title" class="trad-card" :style="{ '--accent': t.accent, animationDelay: `${i * 100}ms` }">
          <img class="trad-img" :src="`/images/${t.img}`" :alt="t.title" />
          <div class="trad-veil" />
          <div class="trad-content">
            <h3 class="trad-title">{{ t.title }}</h3>
            <p class="trad-blurb">{{ t.blurb }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- === STUDENT ORGANIZATIONS: discovery cards === -->
    <section class="orgs" ref="orgsRef">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Student Organizations</div>
          <h2 class="sect-title">
            <span v-if="active === 'All'">All 23 clubs &middot; Pick one to start.</span>
            <span v-else>{{ visibleClubs.length }} {{ active }} club<span v-if="visibleClubs.length !== 1">s</span> &middot; Find your fit.</span>
          </h2>
        </div>
        <p class="sect-subtitle">From worship to pickleball — every Eagle finds their flock here.</p>
      </div>

      <div class="org-grid">
        <article
          v-for="(c, i) in visibleClubs"
          :key="c.id"
          class="org-card"
          :class="{ 'is-so': i < 5 }"
          :style="{ animationDelay: `${(i % 12) * 50}ms` }"
          @click="openClub(c)"
          role="button"
          tabindex="0"
          @keydown.enter="openClub(c)"
        >
          <div class="org-badge" v-if="i < 5">Student Organization</div>
          <div class="org-logo-frame">
            <img class="org-logo" :src="`/images/${c.image}`" :alt="c.name" loading="lazy" />
          </div>
          <div class="org-body">
            <div class="org-cat">{{ c.category }}</div>
            <h3 class="org-name">{{ c.name }}</h3>
            <p class="org-blurb">{{ c.blurb }}</p>
          </div>
          <div class="org-cta">
            <span class="org-arrow">→</span>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-if="visibleClubs.length === 0" class="empty-state">
        <div class="empty-icon">✺</div>
        <h3>No clubs in this category yet</h3>
        <p>Be the first to start one — Northwest loves new ideas.</p>
      </div>
    </section>

    <!-- === FOOTER CTA: start a club — ALL interactive, no external links === -->
    <section class="footer-cta" ref="startRef">
      <div class="cta-decoration">✦ ◈ ✣</div>
      <h2 class="footer-title">Don't see your fit? Start one.</h2>
      <p class="footer-subtitle">Northwest supports new clubs every year. If you have a vision, we have the resources to help you launch.</p>

      <!-- Step-by-step process card (fully internal content, no links) -->
      <div class="how-to">
        <div class="how-step">
          <div class="how-num">1</div>
          <div class="how-text">
            <div class="how-title">Bring your idea</div>
            <div class="how-desc">Talk to the Office of Student Life on the second floor of the Pecota Student Center.</div>
          </div>
        </div>
        <div class="how-step">
          <div class="how-num">2</div>
          <div class="how-text">
            <div class="how-title">Find 4 friends</div>
            <div class="how-desc">You need at least four committed students and a faculty or staff advisor to start.</div>
          </div>
        </div>
        <div class="how-step">
          <div class="how-num">3</div>
          <div class="how-text">
            <div class="how-title">Submit a charter</div>
            <div class="how-desc">Write a short one-page charter describing your mission, goals, and meeting plan.</div>
          </div>
        </div>
        <div class="how-step">
          <div class="how-num">4</div>
          <div class="how-text">
            <div class="how-title">Get recognized</div>
            <div class="how-desc">Once approved, your club is officially listed and gets access to funding and rooms.</div>
          </div>
        </div>
      </div>

      <div class="footer-actions">
        <button class="cta-primary" @click="scrollToOrgs">Browse 23 Clubs</button>
        <button class="cta-ghost" @click="scrollToOrgs">Find Your Fit →</button>
      </div>
    </section>

    <!-- === CLUB DETAIL MODAL === -->
    <div v-if="selectedClub" class="club-modal" @click.self="closeClub" role="dialog" aria-modal="true">
      <div class="club-modal-inner">
        <button class="modal-close" @click="closeClub" aria-label="Close">✕</button>
        <div class="modal-logo">
          <img :src="`/images/${selectedClub.image}`" :alt="selectedClub.name" />
        </div>
        <div class="modal-category">{{ selectedClub.category }}</div>
        <h2 class="modal-name">{{ selectedClub.name }}</h2>
        <div class="modal-meta">
          <span class="modal-members">{{ selectedClub.members }} members</span>
          <span class="modal-dot">·</span>
          <span class="modal-meeting">{{ selectedClub.meeting }}</span>
        </div>
        <p class="modal-blurb">{{ selectedClub.blurb }}</p>
      </div>
    </div>
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
  background: var(--nu-wisp);
}
.world-body-inner::-webkit-scrollbar { display: none; }
.life-page { background: var(--nu-wisp); }

/* ===================== HERO ===================== */
.hero {
  position: relative;
  width: calc(100% + 112px);
  margin-left: -56px;
  margin-top: 0;
  margin-bottom: 56px;
  height: 60vh;
  min-height: 480px;
  max-height: 720px;
  overflow: hidden;
  background: var(--nu-navy);
  box-shadow: 0 24px 60px rgba(0, 38, 61, 0.22);
  animation: scaleIn 0.8s var(--ease-out-soft) both;
}
.hero-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 30%;
  display: block;
  z-index: 0;
  animation: kenburns 22s ease-in-out infinite alternate;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(0, 38, 61, 0.45) 0%,
    rgba(0, 38, 61, 0.30) 35%,
    rgba(0, 38, 61, 0.65) 70%,
    rgba(0, 38, 61, 0.92) 100%);
  z-index: 1;
  pointer-events: none;
}
.hero-content {
  position: absolute;
  left: 56px; right: 56px; bottom: 0;
  padding: 0 0 64px;
  color: var(--nu-wisp);
  z-index: 2;
}
.hero-eyebrow {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.34em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 16px;
}
.hero-title {
  font-family: var(--font-serif);
  font-size: 108px; line-height: 0.95;
  color: var(--nu-wisp);
  margin: 0 0 18px;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
.hero-subtitle {
  font-size: 22px; line-height: 1.4;
  color: var(--nu-wisp);
  opacity: 0.95;
  margin: 0 0 28px;
  max-width: 60ch;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
}
.hero-cta {
  display: flex; gap: 14px;
  margin-bottom: 22px;
}
.cta-primary {
  padding: 16px 32px;
  background: var(--nu-tour);
  color: var(--nu-midnight);
  border: none;
  border-radius: 999px;
  font-size: 16px; font-weight: 800;
  letter-spacing: 0.04em;
  box-shadow: 0 8px 24px rgba(251, 217, 69, 0.35);
  transition: transform 0.2s var(--ease-out-soft), box-shadow 0.2s;
  cursor: pointer;
}
.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(251, 217, 69, 0.5);
}
.cta-primary:active { transform: translateY(0); }
.cta-secondary {
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.12);
  color: var(--nu-wisp);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  font-size: 16px; font-weight: 700;
  letter-spacing: 0.04em;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: transform 0.2s var(--ease-out-soft), background 0.2s;
}
.cta-secondary:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.22);
}
.cta-ghost {
  padding: 14px 28px;
  background: transparent;
  color: var(--nu-blue);
  border: 1.5px solid var(--nu-blue);
  border-radius: 999px;
  font-size: 15px; font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: transform 0.2s var(--ease-out-soft), background 0.2s;
}
.cta-ghost:hover {
  background: var(--nu-blue);
  color: var(--nu-wisp);
  transform: translateY(-2px);
}
.hero-meta {
  display: flex; align-items: center; gap: 14px;
  font-size: 15px;
  color: var(--nu-skylight);
}
.hero-meta strong {
  font-family: var(--font-serif);
  font-size: 22px; font-weight: 700;
  color: var(--nu-tour);
  margin-right: 4px;
}
.dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--nu-skylight);
  opacity: 0.6;
}

/* === STICKER CLUSTER (top-right floating) === */
.sticker-cluster {
  position: absolute;
  top: 40px; right: 56px;
  display: flex; flex-direction: column; gap: 10px;
  z-index: 2;
}
.sticker {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.16);
  border: 1.5px solid var(--c);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  color: var(--nu-wisp);
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.06em;
  animation: floatY 3.5s ease-in-out infinite;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
.sticker-icon {
  font-size: 18px;
  color: var(--c);
}

/* ===================== CATEGORIES ===================== */
.categories {
  margin: 0 0 56px;
  animation: fadeUp 0.7s var(--ease-out-soft) 0.1s both;
}
.cat-header {
  margin-bottom: 20px;
}
.cat-eyebrow {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 6px;
}
.cat-title {
  font-family: var(--font-serif);
  font-size: 36px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0;
}
.cat-chips {
  display: flex; flex-wrap: wrap; gap: 10px;
}
.cat-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  background: var(--nu-wisp);
  border: 1.5px solid var(--nu-sky);
  border-radius: 999px;
  color: var(--nu-navy);
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.25s var(--ease-out-soft);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 38, 61, 0.04);
}
.cat-chip:hover {
  transform: translateY(-2px);
  border-color: var(--nu-blue);
  box-shadow: 0 6px 18px rgba(0, 38, 61, 0.12);
}
.cat-chip.is-active {
  background: var(--nu-blue);
  color: var(--nu-wisp);
  border-color: var(--nu-blue);
  box-shadow: 0 8px 22px rgba(0, 104, 187, 0.35);
  transform: translateY(-2px);
}
.cat-icon {
  font-size: 16px;
  line-height: 1;
}
.cat-chip.is-active .cat-icon { color: var(--nu-tour); }
.cat-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px;
  padding: 0 6px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  font-size: 11px; font-weight: 800;
}
.cat-chip.is-active .cat-count {
  background: rgba(255, 255, 255, 0.2);
  color: var(--nu-wisp);
}

/* ===================== TRADITIONS ===================== */
.traditions {
  margin: 0 0 64px;
  animation: fadeUp 0.7s var(--ease-out-soft) 0.2s both;
}
.section-head {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 24px;
  gap: 24px;
}
.sect-eyebrow {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 6px;
}
.sect-title {
  font-family: var(--font-serif);
  font-size: 40px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0;
}
.sect-subtitle {
  font-size: 16px; line-height: 1.4;
  color: var(--nu-navy);
  margin: 0;
  max-width: 40ch;
  text-align: right;
}
.trad-rail {
  display: flex; gap: 18px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4px 0 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.trad-rail::-webkit-scrollbar { display: none; }
.trad-card {
  position: relative;
  flex: 0 0 380px;
  height: 360px;
  border-radius: 28px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 14px 32px rgba(0, 38, 61, 0.16);
  scroll-snap-align: start;
  animation: scaleIn 0.6s var(--ease-out-soft) both;
  transition: transform 0.4s var(--ease-out-soft);
}
.trad-card:hover { transform: translateY(-4px); }
.trad-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  transition: transform 1s var(--ease-out-soft);
}
.trad-card:hover .trad-img { transform: scale(1.06); }
.trad-veil {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,38,61,0) 35%, rgba(0,38,61,0.78) 100%);
  z-index: 1;
}
.trad-icon {
  position: absolute;
  top: 18px; left: 18px;
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  color: var(--c);
  border-radius: 50%;
  font-size: 22px;
  z-index: 2;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
.trad-content {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 24px 26px;
  color: var(--nu-wisp);
  z-index: 2;
}
.trad-title {
  font-family: var(--font-serif);
  font-size: 28px; line-height: 1.1;
  margin: 0 0 6px;
}
.trad-blurb {
  font-size: 14px; line-height: 1.4;
  margin: 0;
  opacity: 0.92;
}

/* ===================== STUDENT ORGANIZATIONS ===================== */
.orgs {
  margin: 0 0 56px;
  animation: fadeUp 0.7s var(--ease-out-soft) 0.3s both;
}
.org-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.org-card {
  position: relative;
  background: var(--nu-wisp);
  border: 1px solid var(--nu-sky);
  border-radius: 22px;
  padding: 24px;
  display: flex; flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 14px rgba(0, 38, 61, 0.05);
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s var(--ease-out-soft), border-color 0.3s;
  cursor: pointer;
  overflow: hidden;
  animation: scaleIn 0.5s var(--ease-out-soft) both;
}
.org-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--nu-tour);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out-soft);
}
.org-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 38, 61, 0.14);
  border-color: var(--nu-blue);
}
.org-card:hover::before { transform: scaleX(1); }
.org-card.is-so {
  background: linear-gradient(180deg, var(--nu-powder) 0%, var(--nu-wisp) 100%);
}
.org-badge {
  position: absolute;
  top: 16px; right: 16px;
  padding: 4px 10px;
  background: var(--nu-midnight);
  color: var(--nu-tour);
  border-radius: 999px;
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.18em;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 38, 61, 0.3);
}
.org-logo-frame {
  width: 100%;
  aspect-ratio: 1.6 / 1;
  display: flex; align-items: center; justify-content: center;
  background: var(--nu-wisp);
  border-radius: 16px;
  overflow: hidden;
  padding: 12px;
  border: 1px solid var(--nu-cloud);
  transition: border-color 0.3s, background 0.3s;
}
.org-card:hover .org-logo-frame {
  border-color: var(--nu-blue);
  background: var(--nu-powder);
}
.org-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.4s var(--ease-out-soft);
}
.org-card:hover .org-logo { transform: scale(1.05); }
.org-body { flex: 1; min-height: 0; }
.org-cat {
  font-size: 11px; font-weight: 800;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 4px;
}
.org-name {
  font-family: var(--font-serif);
  font-size: 22px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0 0 6px;
}
.org-blurb {
  font-size: 13px; line-height: 1.45;
  color: var(--nu-navy);
  margin: 0;
  opacity: 0.85;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.org-cta {
  display: flex; align-items: center;
  margin-top: 4px;
}
.org-arrow {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  background: var(--nu-powder);
  color: var(--nu-blue);
  border-radius: 50%;
  font-size: 16px;
  transition: transform 0.3s var(--ease-out-soft), background 0.3s;
}
.org-card:hover .org-arrow {
  background: var(--nu-blue);
  color: var(--nu-wisp);
  transform: translateX(4px);
}

/* === EMPTY STATE === */
.empty-state {
  text-align: center;
  padding: 80px 32px;
  background: var(--nu-powder);
  border-radius: 24px;
  border: 2px dashed var(--nu-sky);
}
.empty-icon {
  font-size: 56px;
  color: var(--nu-tour);
  margin-bottom: 12px;
}
.empty-state h3 {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--nu-midnight);
  margin: 0 0 8px;
}
.empty-state p {
  font-size: 16px;
  color: var(--nu-navy);
  margin: 0;
}

/* ===================== FOOTER CTA ===================== */
.footer-cta {
  position: relative;
  text-align: center;
  padding: 60px 32px;
  background: linear-gradient(135deg, var(--nu-midnight) 0%, var(--nu-navy) 60%, var(--nu-blue) 100%);
  color: var(--nu-wisp);
  border-radius: 32px;
  overflow: hidden;
  margin: 0 0 8px;
  box-shadow: 0 18px 40px rgba(0, 38, 61, 0.22);
}
.footer-cta::before {
  content: '';
  position: absolute;
  top: -120px; right: -120px;
  width: 360px; height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251, 217, 69, 0.18) 0%, transparent 70%);
  pointer-events: none;
}
.cta-decoration {
  font-size: 18px;
  color: var(--nu-tour);
  letter-spacing: 0.4em;
  margin-bottom: 16px;
  opacity: 0.85;
}
.footer-title {
  font-family: var(--font-serif);
  font-size: 48px; line-height: 1.05;
  color: var(--nu-wisp);
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}
.footer-subtitle {
  font-size: 18px; line-height: 1.4;
  color: var(--nu-skylight);
  margin: 0 0 28px;
  max-width: 60ch;
  margin-left: auto; margin-right: auto;
}
.footer-actions {
  display: flex; gap: 14px;
  justify-content: center;
}

/* === HOW-TO STEPS (in-page) === */
.how-to {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  max-width: 880px;
  margin: 0 auto 32px;
  position: relative;
  z-index: 1;
}
.how-step {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 20px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  text-align: left;
  backdrop-filter: blur(6px);
  transition: transform 0.3s var(--ease-out-soft), background 0.3s;
}
.how-step:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
}
.how-num {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: var(--nu-tour);
  color: var(--nu-midnight);
  border-radius: 50%;
  font-family: var(--font-serif);
  font-size: 18px; font-weight: 800;
  flex-shrink: 0;
}
.how-text { flex: 1; min-width: 0; }
.how-title {
  font-family: var(--font-serif);
  font-size: 18px; line-height: 1.15;
  color: var(--nu-wisp);
  margin-bottom: 4px;
}
.how-desc {
  font-size: 12px; line-height: 1.4;
  color: var(--nu-skylight);
  margin: 0;
  opacity: 0.9;
}

/* ===================== CLUB MODAL ===================== */
.club-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 38, 61, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
.club-modal-inner {
  background: var(--nu-midnight);
  border-radius: 24px;
  padding: 56px 64px 64px;
  max-width: 640px;
  width: 100%;
  text-align: center;
  box-shadow: 0 32px 80px rgba(0,0,0,0.5);
  position: relative;
}
.modal-close {
  position: absolute;
  top: 20px; right: 24px;
  background: none;
  border: none;
  color: var(--nu-skylight);
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.modal-close:hover { opacity: 1; }
.modal-logo {
  width: 120px; height: 120px;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 auto 24px;
  border: 3px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}
.modal-logo img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.modal-category {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 10px;
}
.modal-name {
  font-family: var(--font-serif);
  font-size: 44px;
  font-weight: 400;
  color: var(--nu-wisp);
  margin: 0 0 16px;
  line-height: 1.1;
}
.modal-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
}
.modal-members, .modal-meeting {
  font-size: 14px;
  color: var(--nu-skylight);
  opacity: 0.8;
}
.modal-dot { color: var(--nu-skylight); opacity: 0.5; }
.modal-blurb {
  font-size: 16px;
  line-height: 1.65;
  color: var(--nu-skylight);
  margin: 0;
  opacity: 0.9;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 720px) {
  .hero-title { font-size: 64px; }
  .cat-title { font-size: 28px; }
  .sect-title { font-size: 32px; }
  .org-grid { grid-template-columns: 1fr 1fr; }
  .footer-title { font-size: 36px; }
}
</style>
