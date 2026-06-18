<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// === Barton 2nd Floor Lobby — directs new students & parents to Admissions ===
// A single-purpose, focused wayfinding screen.
// "You are here" pin on the map + a massive right arrow pointing to
// the Admission Office, plus practical info: hours, what to expect,
// and a friendly welcome.

const visible = ref(false)
onMounted(() => {
  setTimeout(() => { visible.value = true }, 80)
})

// === Contact reveal state — tapping Call/Email opens a modal with the
//   actual phone number / email so visitors can copy it down.
type ContactKind = 'call' | 'email' | null
const activeContact = ref<ContactKind>(null)
const isModalOpen = computed(() => activeContact.value !== null)

function openContact(kind: 'call' | 'email') {
  activeContact.value = kind
}
function closeContact() {
  activeContact.value = null
}

// === What-to-Expect info modal — tapping Apply / Visit / Aid reveals
//   a short description of what the Admissions Office can help with.
type HelpKey = 'apply' | 'visit' | 'aid' | null
const activeHelp = ref<HelpKey>(null)
const isHelpOpen = computed(() => activeHelp.value !== null)

function openHelp(key: HelpKey) {
  activeHelp.value = key
}
function closeHelp() {
  activeHelp.value = null
}

// === Office Hours — compact status first, full schedule on tap ===
const hoursExpanded = ref(false)

// === Hero photo (First Day — students arriving) ===
const lobbyPhoto = '250825FirstDayEdited (11).jpg'

// === Admission Office essentials ===
const admission = {
  name: 'Office of Admissions',
  tagline: 'Welcome to Northwest. We are so glad you are here.',
  building: 'Barton Hall',
  room: '',
  direction: 'The Office of Admissions is on the 2nd floor — go up one level.',
  hours: [
    { day: 'Monday',     time: '8:00 AM – 5:00 PM' },
    { day: 'Tuesday',    time: '8:00 AM – 5:00 PM' },
    { day: 'Wednesday',  time: '8:00 AM – 5:00 PM' },
    { day: 'Thursday',   time: '8:00 AM – 5:00 PM' },
    { day: 'Friday',     time: '8:00 AM – 4:00 PM' }
  ],
  phone: '425-822-8266',
  email: 'admissions@northwestu.edu',
  what: [
    {
      icon: '✦', label: 'Apply', key: 'apply' as HelpKey,
      title: 'Apply to Northwest',
      summary: 'Get help with your application and admissions process.',
      bullets: [
        'Review transcripts and test scores in person',
        'Walk through the application step-by-step',
        'Get answers about prerequisites and deadlines',
        'Submit your application on the spot if ready'
      ]
    },
    {
      icon: '◈', label: 'Visit', key: 'visit' as HelpKey,
      title: 'Visit the campus',
      summary: 'Schedule a campus tour before you leave.',
      bullets: [
        'Guided walking tour of Barton Hall and Pecota',
        'See a residence hall, the chapel, and a classroom',
        'Meet current students and faculty',
        'Optional meal at the dining hall'
      ]
    },
    {
      icon: '✣', label: 'Aid', key: 'aid' as HelpKey,
      title: 'Financial aid & scholarships',
      summary: 'Get answers about cost, aid, and scholarships.',
      bullets: [
        'Estimate your financial aid package',
        'Learn about Northwest academic scholarships',
        'FAFSA filing questions, answered on site',
        'Payment plan and tuition information'
      ]
    }
  ]
}
</script>

<template>
  <div class="barton" :class="{ 'is-loaded': visible }">
    <!-- ============ HERO: full-height photo + everything overlay ============ -->
    <section class="hero">
      <div class="hero-photo">
        <img :src="`/images/${lobbyPhoto}`" alt="Barton Hall lobby" />
      </div>
      <div class="hero-veil" />
      <div class="hero-bottom-grad" />

      <!-- "You are here" pin (Main Lobby) -->
      <div class="you-are-here">
        <div class="here-pulse" />
        <div class="here-ping" />
        <div class="here-dot" />
        <div class="here-label">
          <span class="here-eyebrow">You are here</span>
          <span class="here-name">Barton Main Lobby</span>
        </div>
      </div>

      <!-- CENTERED WAYFINDING CARD — go up one floor -->
      <div class="wayfinding-card">
        <div class="wayfinding-arrow-up">
          <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="upGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#fbd945" />
                <stop offset="100%" stop-color="#ffbc2d" />
              </linearGradient>
            </defs>
            <!-- Up-pointing triangle -->
            <polygon
              points="160,40 40,200 100,200 100,280 220,280 220,200 280,200"
              fill="url(#upGrad)"
            />
          </svg>
        </div>
        <div class="wayfinding-eyebrow">This way to</div>
        <h2 class="wayfinding-title">Admissions Office</h2>
        <div class="wayfinding-divider" />
        <div class="wayfinding-location">
          <span class="wayfinding-floor">2nd Floor</span>
          <span class="wayfinding-up">↑</span>
        </div>
      </div>

      <!-- FLOATING CARDS OVERLAY — 5 equal icon-only cards at bottom -->
      <div class="cards-overlay">
        <div class="quick-grid">
          <!-- 5 equal-sized glass icon-only cards (steps on click) -->
          <button class="quick-card" type="button" @click="openContact('call')" aria-label="Call us">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>

          <button class="quick-card" type="button" @click="openContact('email')" aria-label="Email us">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </button>

          <button class="quick-card" type="button" @click="openHelp('apply')" aria-label="Apply">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
          </button>

          <button class="quick-card" type="button" @click="openHelp('visit')" aria-label="Campus tour">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>

          <button class="quick-card" type="button" @click="openHoursModal" aria-label="Office hours">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- CONTACT MODAL — shows phone / email when visitor taps a button -->
    <!-- ============================================================== -->
    <transition name="modal">
      <div v-if="isModalOpen" class="contact-modal" @click="closeContact">
        <div class="contact-modal-card" @click.stop>
          <button class="modal-close" type="button" @click="closeContact" aria-label="Close">
            <span class="close-line close-line--1" />
            <span class="close-line close-line--2" />
          </button>

          <div v-if="activeContact === 'call'" class="modal-content">
            <div class="modal-eyebrow">Call the Admissions Office</div>
            <div class="modal-icon-big">☎</div>
            <div class="modal-label">Tap to dial</div>
            <a class="modal-value" :href="`tel:${admission.phone.replace(/[^0-9+]/g, '')}`">
              {{ admission.phone }}
            </a>
            <div class="modal-hint">Monday &ndash; Thursday &middot; 8 AM &ndash; 5 PM<br/>Friday &middot; 8 AM &ndash; 4 PM</div>
          </div>

          <div v-else-if="activeContact === 'email'" class="modal-content">
            <div class="modal-eyebrow">Email the Admissions Office</div>
            <div class="modal-icon-big">✉</div>
            <div class="modal-label">Send us a note</div>
            <a class="modal-value" :href="`mailto:${admission.email}`">
              {{ admission.email }}
            </a>
            <div class="modal-hint">We reply within one business day</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ============================================================== -->
    <!-- HELP MODAL — shows details about Apply / Visit / Aid topics   -->
    <!-- ============================================================== -->
    <transition name="modal">
      <div v-if="isHelpOpen" class="contact-modal" @click="closeHelp">
        <div class="contact-modal-card help-modal-card" @click.stop>
          <button class="modal-close" type="button" @click="closeHelp" aria-label="Close">
            <span class="close-line close-line--1" />
            <span class="close-line close-line--2" />
          </button>

          <template v-for="w in admission.what" :key="w.key">
            <div v-if="activeHelp === w.key" class="modal-content">
              <div class="help-modal-icon">{{ w.icon }}</div>
              <div class="modal-eyebrow">What the Admissions Office can help with</div>
              <h2 class="help-modal-title">{{ w.title }}</h2>
              <p class="help-modal-summary">{{ w.summary }}</p>
              <ul class="help-bullets">
                <li v-for="(b, bi) in w.bullets" :key="bi">
                  <span class="bullet-mark">✓</span>
                  <span class="bullet-text">{{ b }}</span>
                </li>
              </ul>
              <button class="help-modal-cta" type="button" @click="closeHelp">
                Got it
              </button>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.barton {
  position: absolute; inset: 0;
  overflow: hidden;
  background: var(--nu-midnight);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s var(--ease-out-soft), transform 0.6s var(--ease-out-soft);
}
.barton.is-loaded { opacity: 1; transform: none; }

/* ============ HERO — full-height, photo bleeds entire screen ============ */
.hero {
  position: relative;
  width: 100%;
  height: 1920px;
  overflow: hidden;
  background: var(--nu-midnight);
}
.hero-photo {
  position: absolute; inset: 0;
  filter: blur(2px) brightness(0.7) saturate(0.85);
  transform: scale(1.04);
}
.hero-photo img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  animation: kenburns 28s ease-in-out infinite alternate;
}
@keyframes kenburns {
  0%   { transform: scale(1)    translate(0, 0); }
  100% { transform: scale(1.08) translate(-1%, -1%); }
}
.hero-veil {
  position: absolute; inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 38, 61, 0.85) 0%, rgba(0, 38, 61, 0.55) 40%, rgba(0, 38, 61, 0.25) 70%, rgba(0, 38, 61, 0.10) 100%),
    linear-gradient(180deg, rgba(0, 38, 61, 0.40) 0%, rgba(0, 38, 61, 0.05) 25%, rgba(0, 38, 61, 0.05) 45%, rgba(0, 38, 61, 0.30) 65%, rgba(0, 38, 61, 0.80) 85%, rgba(0, 38, 61, 0.95) 100%);
}
/* Bottom gradient — extra dark anchor for the floating cards */
.hero-bottom-grad {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 60%;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 38, 61, 0.55) 50%, rgba(0, 38, 61, 0.92) 100%);
  z-index: 2;
  pointer-events: none;
}

/* ================================================================ */
/*  CARDS OVERLAY — floating glass cards in last 25% of hero height  */
/* ================================================================ */
/* ================================================================ */
/*  CARDS OVERLAY — 5 equal glass icon cards at bottom of hero        */
/* ================================================================ */
.cards-overlay {
  position: absolute;
  left: 0; right: 0;
  bottom: 13%;
  z-index: 6;
  padding: 24px 56px;
  display: flex; align-items: center; justify-content: center;
}
.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 22px;
  width: 100%;
  max-width: 1400px;
}
.quick-card {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
  /* Sutil glassmorphism — transparente, sem competir com a seta */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 22px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  color: var(--nu-wisp);
  cursor: pointer;
  font-family: inherit;
  overflow: hidden;
  transition: transform 0.4s var(--ease-out-soft),
              background 0.4s,
              border-color 0.4s,
              box-shadow 0.4s;
  /* Movimento sutil — só 3px, lento e discreto */
  animation: cardFloat 7s ease-in-out infinite;
}
.quick-card:nth-child(1) { animation-delay: 0s; }
.quick-card:nth-child(2) { animation-delay: 0.7s; }
.quick-card:nth-child(3) { animation-delay: 1.4s; }
.quick-card:nth-child(4) { animation-delay: 2.1s; }
.quick-card:nth-child(5) { animation-delay: 2.8s; }
@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}
/* Shine sweep on hover (discreto) */
.quick-card::before {
  content: '';
  position: absolute;
  top: 0; left: -120%;
  width: 50%; height: 100%;
  background: linear-gradient(115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.18) 50%,
    transparent 100%);
  transform: skewX(-20deg);
  transition: left 0.8s var(--ease-out-soft);
  pointer-events: none;
}
.quick-card:hover {
  transform: translateY(-6px) scale(1.03);
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(251, 217, 69, 0.5);
  box-shadow:
    0 14px 32px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(251, 217, 69, 0.35);
}
.quick-card:hover::before { left: 130%; }
.quick-card:active { transform: translateY(-2px) scale(1.0); }

/* === Uniform SVG icons (same size + color across all 5 quick cards + meta) === */
.icon-svg {
  width: 64px;
  height: 64px;
  color: var(--nu-tour);
  opacity: 0.85;
  filter: drop-shadow(0 2px 6px rgba(251, 217, 69, 0.28));
  transition: transform 0.4s var(--ease-out-soft),
              opacity 0.3s,
              filter 0.3s,
              color 0.3s;
}
.quick-card:hover .icon-svg {
  transform: scale(1.12) rotate(-6deg);
  opacity: 1;
  color: var(--nu-amber);
  filter: drop-shadow(0 3px 10px rgba(255, 188, 45, 0.4));
}

/* "You are here" pin (top-left of hero) */
.you-are-here {
  position: absolute;
  top: 10%; left: 6%;
  z-index: 5;
  display: flex; align-items: center; gap: 14px;
  animation: fadeUp 0.8s var(--ease-out-soft) 0.4s both;
  background: rgba(0, 38, 61, 0.7);
  padding: 10px 18px 10px 14px;
  border-radius: 999px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(251, 217, 69, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.here-dot {
  position: relative;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--nu-tour);
  border: 4px solid var(--nu-wisp);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 2;
}
.here-pulse {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--nu-tour);
  opacity: 0.7;
  animation: pulse-here 1.6s ease-out infinite;
  z-index: 1;
}
@keyframes pulse-here {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
}
.here-ping {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 60px; height: 60px;
  border-radius: 50%;
  border: 2px solid var(--nu-tour);
  opacity: 0;
  animation: ping 2.2s ease-out infinite;
  z-index: 1;
}
@keyframes ping {
  0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(2.0); opacity: 0; }
}
.here-label {
  display: flex; flex-direction: column;
  color: var(--nu-wisp);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.here-eyebrow {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 2px;
}
.here-name {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--nu-wisp);
}

/* ================================================================ */
/*  CENTERED WAYFINDING CARD — go up one floor (Main Lobby)         */
/* ================================================================ */
.wayfinding-card {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex; flex-direction: column;
  align-items: center;
  width: min(820px, 78%);
  padding: 64px 72px 56px;
  /* Glassmorphism: dark navy with subtle transparency */
  background: linear-gradient(180deg,
    rgba(0, 38, 61, 0.78) 0%,
    rgba(0, 38, 61, 0.88) 100%);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border-radius: 32px;
  /* Thin gold border */
  border: 1.5px solid rgba(251, 217, 69, 0.45);
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  text-align: center;
  animation: fadeUp 1s var(--ease-out-soft) 0.4s both;
}
.wayfinding-arrow-up {
  width: 120px;
  height: 120px;
  margin-bottom: 32px;
  filter: drop-shadow(0 8px 20px rgba(251, 217, 69, 0.4));
  animation: floatY 3s ease-in-out infinite;
}
.wayfinding-arrow-up svg {
  width: 100%; height: 100%;
  display: block;
}
.wayfinding-eyebrow {
  font-size: 18px; font-weight: 700;
  letter-spacing: 0.42em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 18px;
}
.wayfinding-title {
  font-family: var(--font-serif);
  font-size: 88px; line-height: 1;
  color: var(--nu-wisp);
  margin: 0 0 28px;
  letter-spacing: -0.01em;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
.wayfinding-divider {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--nu-tour) 50%,
    transparent 100%);
  margin: 0 auto 24px;
}
.wayfinding-location {
  display: flex; align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--nu-tour);
}
.wayfinding-floor {
  font-family: var(--font-serif);
  font-size: 36px; font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
}
.wayfinding-up {
  font-size: 44px; font-weight: 700;
  line-height: 1;
  animation: floatY 2.4s ease-in-out infinite;
}

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* ============ INFO SECTION ============ */
.info {
  padding: 100px 80px;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 32px;
  margin-bottom: 72px;
  align-items: stretch;
}
.info-card {
  position: relative;
  background: var(--nu-wisp);
  border-radius: 28px;
  padding: 44px 36px 48px;
  box-shadow: 0 8px 24px rgba(0, 38, 61, 0.10);
  border: 1px solid var(--nu-cloud);
  animation: fadeUp 0.7s var(--ease-out-soft) both;
  display: flex; flex-direction: column;
  align-items: stretch;
  min-width: 0;
}
.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card.contact-card {
  padding-left: 18px;
  padding-right: 54px;
}
.info-card.expect-card {
  overflow: visible;
}
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-eyebrow {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 4px;
}
.info-title {
  font-family: var(--font-serif);
  font-size: 32px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0 0 24px;
  letter-spacing: -0.01em;
}

/* HOURS */
/* === HOURS (status-first, full schedule on tap) === */
.hours-status {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0 14px;
  border-bottom: 1px solid var(--nu-cloud);
  margin-bottom: 12px;
}
.status-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--nu-leaf);
  box-shadow: 0 0 0 5px rgba(68, 186, 130, 0.18);
  animation: pulse-status 1.6s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-status {
  0%, 100% { box-shadow: 0 0 0 5px rgba(68, 186, 130, 0.18); }
  50%      { box-shadow: 0 0 0 10px rgba(68, 186, 130, 0); }
}
.status-text {
  font-family: var(--font-serif);
  font-size: 22px; line-height: 1.1;
  color: var(--nu-midnight);
  letter-spacing: -0.01em;
}
.hours-toggle {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent;
  border: 1px solid var(--nu-cloud);
  color: var(--nu-blue);
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s, border-color 0.2s;
}
.hours-toggle:hover {
  background: var(--nu-powder);
  border-color: var(--nu-blue);
}
.hours-detail {
  display: flex; flex-direction: column;
  gap: 8px;
  padding-top: 18px;
  margin-top: 6px;
  border-top: 1px solid var(--nu-cloud);
}
.hours-row {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 14px;
  color: var(--nu-midnight);
}
.hours-day-name {
  font-weight: 700;
}
.hours-time-text {
  font-family: var(--font-serif);
  font-size: 16px;
  font-variant-numeric: tabular-nums;
}
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.3s var(--ease-out-soft),
              max-height 0.4s var(--ease-out-soft);
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* === WHAT TO EXPECT (primary CTA + helper icons) === */
.expect-card--primary {
  background: linear-gradient(160deg, var(--nu-wisp) 0%, #fdf7e8 100%);
  border-color: var(--nu-tour);
  position: relative;
}
.expect-card--primary::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(251, 217, 69, 0.08) 0%, rgba(255, 188, 45, 0.04) 100%);
  pointer-events: none;
}
.expect-card--primary > * { position: relative; z-index: 1; }

.primary-cta {
  display: flex; align-items: center; gap: 16px;
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--nu-navy) 0%, var(--nu-blue) 100%);
  color: var(--nu-wisp);
  border: none;
  border-radius: 18px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  box-shadow: 0 10px 24px rgba(0, 38, 61, 0.28);
  transition: transform 0.25s var(--ease-out-soft), box-shadow 0.25s, filter 0.25s;
}
.primary-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(0, 38, 61, 0.36);
  filter: brightness(1.06);
}
.primary-cta:active {
  transform: translateY(-1px);
}
.primary-cta-icon {
  font-family: var(--font-serif);
  font-size: 36px;
  color: var(--nu-tour);
  line-height: 1;
  flex-shrink: 0;
}
.primary-cta-text {
  flex: 1;
  display: flex; flex-direction: column;
  gap: 0;
}
.primary-cta-line {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.15;
}
.primary-cta-line--bold {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.05;
}
.primary-cta-arrow {
  font-size: 28px;
  color: var(--nu-tour);
  flex-shrink: 0;
  transition: transform 0.25s var(--ease-out-soft);
}
.primary-cta:hover .primary-cta-arrow {
  transform: translateX(6px);
}

.expect-icons {
  list-style: none; margin: 0; padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 14px;
  justify-content: center;
  align-items: stretch;
}
.expect-icon-item {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px;
  min-height: 72px;
  padding: 10px 6px;
  background: var(--nu-wisp);
  border-radius: 14px;
  border: 1px solid var(--nu-cloud);
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s, border-color 0.3s;
  cursor: pointer;
  position: relative;
}
.expect-icon-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 38, 61, 0.10);
  border-color: var(--nu-blue);
}
.expect-icon-mark {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--nu-blue);
  line-height: 1;
}
.expect-icon-label {
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--nu-midnight);
  text-align: center;
  line-height: 1.15;
}

/* === CONTACT (compact icon grid) === */
.contact-card { display: flex; flex-direction: column; }
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  align-items: stretch;
  justify-items: stretch;
  gap: 12px;
  flex: 1;
}
.contact-mini {
  display: flex; flex-direction: row;
  align-items: center; justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 14px 12px;
  background: var(--nu-powder);
  border-radius: 14px;
  border: 1px solid var(--nu-cloud);
  text-decoration: none;
  color: inherit;
  font: inherit;
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s, border-color 0.3s, background 0.3s;
  cursor: pointer;
}
.contact-mini:hover {
  transform: translateY(-3px);
  background: var(--nu-wisp);
  box-shadow: 0 10px 22px rgba(0, 38, 61, 0.10);
  border-color: var(--nu-blue);
}
.contact-mini-icon {
  font-size: 26px;
  color: var(--nu-blue);
  line-height: 1;
}
.contact-mini-label {
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.20em; text-transform: uppercase;
  color: var(--nu-navy);
}
.contact-detail {
  margin-top: 22px;
  padding-top: 22px;
  border-top: 1px solid var(--nu-cloud);
  font-size: 13px;
  color: var(--nu-navy);
  opacity: 0.65;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: center;
}

.bottom-hint {
  text-align: center;
  font-size: 16px;
  color: var(--nu-navy);
  opacity: 0.6;
  margin: 40px 0 0;
  letter-spacing: 0.04em;
}
.bottom-hint strong {
  color: var(--nu-midnight);
  opacity: 1;
}

/* Common fadeUp used above */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ================================================================ */
/*  CONTACT MODAL — large tap target showing phone or email         */
/* ================================================================ */
.contact-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  padding: 40px;
}
.contact-modal-card {
  position: relative;
  display: flex; flex-direction: column;
  align-items: center;
  max-width: 720px;
  width: 100%;
  background: var(--nu-wisp);
  border-radius: 32px;
  padding: 56px 48px 48px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  cursor: default;
  border: 1px solid var(--nu-cloud);
}
.modal-close {
  position: absolute;
  top: 20px; right: 20px;
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--nu-powder);
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s, transform 0.3s var(--ease-out-soft);
  z-index: 2;
}
.modal-close:hover {
  background: var(--nu-cloud);
  transform: scale(1.08) rotate(90deg);
}
.close-line {
  position: absolute;
  width: 22px; height: 2.5px;
  background: var(--nu-midnight);
  border-radius: 1.5px;
}
.close-line--1 { transform: rotate(45deg); }
.close-line--2 { transform: rotate(-45deg); }

.modal-content {
  display: flex; flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}
.modal-eyebrow {
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 6px;
}
.modal-icon-big {
  font-size: 96px;
  color: var(--nu-blue);
  line-height: 1;
  margin-bottom: 6px;
  animation: floatY 3s ease-in-out infinite;
}
.modal-label {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--nu-navy);
  opacity: 0.7;
}
.modal-value {
  font-family: var(--font-serif);
  font-size: 56px; line-height: 1.1;
  color: var(--nu-midnight);
  text-decoration: none;
  letter-spacing: -0.01em;
  padding: 18px 32px;
  background: var(--nu-powder);
  border-radius: 18px;
  border: 2px solid var(--nu-blue);
  transition: background 0.3s, transform 0.3s var(--ease-out-soft);
  word-break: break-word;
  overflow-wrap: break-word;
  cursor: pointer;
}
.modal-value:hover {
  background: var(--nu-blue);
  color: var(--nu-wisp);
  transform: translateY(-3px);
}
.modal-hint {
  font-size: 14px; line-height: 1.5;
  color: var(--nu-navy);
  opacity: 0.65;
  margin-top: 6px;
}

/* === HELP MODAL — What to Expect details === */
.help-modal-card {
  max-width: 820px;
}
.help-modal-icon {
  font-family: var(--font-serif);
  font-size: 84px;
  color: var(--nu-blue);
  line-height: 1;
  margin-bottom: 8px;
  animation: floatY 3s ease-in-out infinite;
}
.help-modal-title {
  font-family: var(--font-serif);
  font-size: 44px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0 0 14px;
  letter-spacing: -0.01em;
  text-align: center;
}
.help-modal-summary {
  font-size: 18px; line-height: 1.5;
  color: var(--nu-navy);
  margin: 0 0 28px;
  text-align: center;
  max-width: 56ch;
}
.help-bullets {
  list-style: none; margin: 0 0 28px; padding: 0;
  display: flex; flex-direction: column;
  gap: 12px;
  width: 100%;
}
.help-bullets li {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 14px 18px;
  background: var(--nu-powder);
  border-radius: 12px;
  border-left: 3px solid var(--nu-blue);
  font-size: 16px; line-height: 1.45;
  color: var(--nu-midnight);
  font-weight: 500;
}
.bullet-mark {
  flex-shrink: 0;
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--nu-leaf);
  color: var(--nu-wisp);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  margin-top: 1px;
}
.bullet-text { flex: 1; }
.help-modal-cta {
  margin-top: 8px;
  padding: 14px 36px;
  background: var(--nu-blue);
  color: var(--nu-wisp);
  border: none;
  border-radius: 999px;
  font-size: 16px; font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 104, 187, 0.28);
  transition: transform 0.2s var(--ease-out-soft), box-shadow 0.2s, background 0.2s;
}
.help-modal-cta:hover {
  transform: translateY(-2px);
  background: var(--nu-navy);
  box-shadow: 0 10px 22px rgba(0, 38, 61, 0.32);
}

/* === Info "i" badge on What to Expect icons === */
.expect-icon-info {
  position: absolute;
  top: 8px; right: 8px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: rgba(0, 38, 61, 0.08);
  color: var(--nu-navy);
  font-family: var(--font-serif);
  font-size: 11px; font-weight: 700;
  font-style: italic;
  display: flex; align-items: center; justify-content: center;
  opacity: 0.55;
  transition: opacity 0.2s, background 0.2s, color 0.2s;
  pointer-events: none;
}
.expect-icon-item:hover .expect-icon-info {
  opacity: 1;
  background: var(--nu-blue);
  color: var(--nu-wisp);
}
.expect-icon-item {
  position: relative;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s var(--ease-out-soft);
}
.modal-enter-active .contact-modal-card,
.modal-leave-active .contact-modal-card {
  transition: transform 0.4s var(--ease-out-soft), opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-from .contact-modal-card,
.modal-leave-to .contact-modal-card {
  transform: scale(0.92);
  opacity: 0;
}
.modal-enter-to .contact-modal-card,
.modal-leave-from .contact-modal-card {
  transform: scale(1);
  opacity: 1;
}

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

/* Mobile / narrow */
@media (max-width: 720px) {
  .hero { height: auto; padding-bottom: 60px; }
  .hero-content { max-width: 100%; padding: 60px 32px; }
  .hero-title { font-size: 64px; }
  .hero-blurb { font-size: 20px; }
  .big-arrow { display: none; }
  .you-are-here { top: auto; bottom: 30px; left: 32px; }
  .info { padding: 40px 24px; }
  .info-grid { grid-template-columns: 1fr; gap: 20px; }
  .contact-modal { padding: 16px; }
  .contact-modal-card { padding: 48px 28px 36px; }
  .modal-value { font-size: 32px; padding: 14px 18px; }
  .modal-icon-big { font-size: 72px; }
  .help-modal-title { font-size: 30px; }
  .help-modal-summary { font-size: 16px; }
  .help-modal-icon { font-size: 64px; }
  .help-bullets li { font-size: 15px; }
}
</style>
