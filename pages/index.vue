<script setup lang="ts">
import { ref, onMounted } from 'vue'

// === Barton 2nd Floor Lobby — directs new students & parents to Admissions ===
// A single-purpose, focused wayfinding screen.
// "You are here" pin on the map + a massive right arrow pointing to
// the Admission Office, plus practical info: hours, what to expect,
// and a friendly welcome.

const visible = ref(false)
onMounted(() => {
  setTimeout(() => { visible.value = true }, 80)
})

// === Hero photo (First Day — students arriving) ===
const lobbyPhoto = '250825FirstDayEdited (11).jpg'

// === Admission Office essentials ===
const admission = {
  name: 'Office of Admissions',
  tagline: 'Welcome to Northwest. We are so glad you are here.',
  building: 'Barton Hall',
  room: '',
  direction: 'The Office of Admissions is on your right.',
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
    { icon: '✦', text: 'Application help and transcript review.' },
    { icon: '◈', text: 'Schedule a campus tour before you leave.' },
    { icon: '✣', text: 'Financial aid questions, answered on site.' },
    { icon: '✱', text: 'A free Northwest t-shirt for every visitor.' }
  ]
}
</script>

<template>
  <div class="barton" :class="{ 'is-loaded': visible }">
    <!-- ============ HERO: Lobby photo + huge right arrow ============ -->
    <section class="hero">
      <div class="hero-photo">
        <img :src="`/images/${lobbyPhoto}`" alt="Barton Hall lobby" />
      </div>
      <div class="hero-veil" />

      <!-- "You are here" pin -->
      <div class="you-are-here">
        <div class="here-pulse" />
        <div class="here-ping" />
        <div class="here-dot" />
        <div class="here-label">
          <span class="here-eyebrow">You are here</span>
          <span class="here-name">Barton 2nd Floor</span>
        </div>
      </div>

      <!-- Wayfinding sign: static arrow + caption "This way to Admissions Office" -->
      <div class="big-arrow" role="img" aria-label="This way to Admissions Office">
        <div class="arrow-icon">
          <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stop-color="#fbd945" />
                <stop offset="100%" stop-color="#ffbc2d" />
              </linearGradient>
            </defs>
            <!-- Arrow shape: shaft + head as one continuous outlined path -->
            <path
              d="M 20 100 L 220 100 L 220 30 L 310 100 L 220 170 L 220 100"
              fill="url(#arrowGrad)"
              stroke="#00263d"
              stroke-width="10"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="arrow-caption">
          <span class="caption-line">This way to</span>
          <span class="caption-name">Admissions Office</span>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="ey-dot" />
          Barton Hall Lobby
        </div>
        <h1 class="hero-title">
          Office of<br/>
          <span class="hero-accent">Admissions.</span>
        </h1>
        <p class="hero-blurb">
          Welcome to Northwest. We are waiting for you.
        </p>
        <div class="hero-meta">
          <span><strong>↗</strong> On your right</span>
          <span class="dot" />
          <span>Office of Admissions</span>
        </div>
      </div>
    </section>

    <!-- ============ INFO: hours + what to expect ============ -->
    <section class="info">
      <div class="info-grid">
        <!-- HOURS -->
        <div class="info-card hours-card">
          <div class="info-eyebrow">Office Hours</div>
          <h2 class="info-title">When we are open</h2>
          <ul class="hours-list">
            <li v-for="h in admission.hours" :key="h.day" class="hours-row">
              <span class="hours-day">{{ h.day }}</span>
              <span class="hours-time">{{ h.time }}</span>
            </li>
          </ul>
          <div class="hours-closed">Closed weekends &amp; university holidays</div>
        </div>

        <!-- WHAT TO EXPECT -->
        <div class="info-card expect-card">
          <div class="info-eyebrow">What to expect</div>
          <h2 class="info-title">Bring this, leave with this</h2>
          <ul class="expect-list">
            <li v-for="(w, i) in admission.what" :key="i" class="expect-row">
              <span class="expect-icon">{{ w.icon }}</span>
              <span class="expect-text">{{ w.text }}</span>
            </li>
          </ul>
        </div>

        <!-- CONTACT -->
        <div class="info-card contact-card">
          <div class="info-eyebrow">Reach us</div>
          <h2 class="info-title">Save our number</h2>
          <a class="contact-row" :href="`tel:${admission.phone.replace(/[^0-9+]/g, '')}`">
            <span class="contact-icon">☎</span>
            <div>
              <div class="contact-label">Call</div>
              <div class="contact-value">{{ admission.phone }}</div>
            </div>
          </a>
          <a class="contact-row" :href="`mailto:${admission.email}`">
            <span class="contact-icon">✉</span>
            <div>
              <div class="contact-label">Email</div>
              <div class="contact-value">{{ admission.email }}</div>
            </div>
          </a>
          <div class="contact-row contact-row--static">
            <span class="contact-icon">⌂</span>
            <div>
              <div class="contact-label">Visit</div>
              <div class="contact-value">{{ admission.building }}<br/>2nd Floor</div>
            </div>
          </div>
        </div>
      </div>

      <p class="bottom-hint">
        Welcome to <strong>Northwest University</strong> &middot; Kirkland, Washington &middot; Since 1934
      </p>
    </section>
  </div>
</template>

<style scoped>
.barton {
  position: absolute; inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  background: var(--nu-powder);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s var(--ease-out-soft), transform 0.6s var(--ease-out-soft);
}
.barton.is-loaded { opacity: 1; transform: none; }
.barton::-webkit-scrollbar { display: none; }

/* ============ HERO ============ */
.hero {
  position: relative;
  width: 100%;
  height: 1180px;
  overflow: hidden;
  background: var(--nu-midnight);
}
.hero-photo { position: absolute; inset: 0; }
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
    linear-gradient(90deg, rgba(0, 38, 61, 0.85) 0%, rgba(0, 38, 61, 0.45) 50%, rgba(0, 38, 61, 0.10) 80%, rgba(0, 38, 61, 0.0) 100%),
    linear-gradient(180deg, rgba(0, 38, 61, 0.35) 0%, rgba(0, 38, 61, 0.0) 25%, rgba(0, 38, 61, 0.0) 60%, rgba(0, 38, 61, 0.78) 100%);
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

/* === WAYFINDING ARROW: static sign-style indicator (no interactive track) === */
.big-arrow {
  position: absolute;
  bottom: 6%; right: 4%;
  z-index: 3;
  display: flex; flex-direction: column; align-items: flex-end;
  gap: 16px;
  animation: fadeUp 1s var(--ease-out-soft) 0.5s both;
  /* Subtle bounce to draw attention — clearly NOT a draggable control */
  animation: fadeUp 1s var(--ease-out-soft) 0.5s both, nudge 3.6s ease-in-out 1.4s infinite;
  pointer-events: none;
}
@keyframes nudge {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-14px, 0); }
}

.arrow-icon {
  width: 420px;
  filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.55));
  animation: pulse-tip 2s ease-in-out infinite;
}
.arrow-icon svg {
  width: 100%; height: auto;
  display: block;
}

.arrow-caption {
  display: flex; flex-direction: column;
  align-items: flex-end;
  text-align: right;
  color: var(--nu-wisp);
  background: rgba(0, 38, 61, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 14px 22px;
  border-radius: 16px;
  border: 1px solid rgba(251, 217, 69, 0.5);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
}
.caption-line {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 4px;
}
.caption-name {
  font-family: var(--font-serif);
  font-size: 32px; line-height: 1.05;
  color: var(--nu-wisp);
  letter-spacing: -0.01em;
}

@keyframes pulse-tip {
  0%, 100% { filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.55)); }
  50%      { filter: drop-shadow(0 18px 40px rgba(251, 217, 69, 0.7)); }
}

/* Hero text content (left side) */
.hero-content {
  position: absolute;
  inset: 0;
  padding: 280px 80px 460px;
  display: flex; flex-direction: column;
  justify-content: flex-start;
  color: var(--nu-wisp);
  max-width: 60%;
  z-index: 2;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  color: var(--nu-tour);
  font-size: 18px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  margin-bottom: 24px;
  animation: fadeUp 0.7s var(--ease-out-soft) 0.1s both;
}
.ey-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--nu-tour);
  box-shadow: 0 0 0 4px rgba(251, 217, 69, 0.25);
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(251, 217, 69, 0.25); }
  50%      { box-shadow: 0 0 0 12px rgba(251, 217, 69, 0); }
}
.hero-title {
  font-family: var(--font-serif);
  font-size: 108px;
  line-height: 0.98;
  color: var(--nu-wisp);
  margin: 0 0 32px;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.2s both;
}
.hero-accent {
  color: var(--nu-tour);
  font-style: italic;
}
.hero-blurb {
  font-size: 28px;
  line-height: 1.4;
  color: var(--nu-skylight);
  margin: 0 0 32px;
  max-width: 22ch;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.3s both;
}
.hero-blurb strong {
  color: var(--nu-tour);
  font-weight: 800;
}
.hero-meta {
  display: flex; align-items: center; gap: 18px;
  font-size: 16px; font-weight: 600;
  color: var(--nu-wisp);
  background: rgba(0, 38, 61, 0.55);
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid rgba(251, 217, 69, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  align-self: flex-start;
  animation: fadeUp 0.8s var(--ease-out-soft) 0.4s both;
}
.hero-meta strong {
  color: var(--nu-tour);
  font-family: var(--font-serif);
  font-size: 22px;
  margin-right: 4px;
}
.hero-meta .dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--nu-tour);
  opacity: 0.7;
}

/* ============ INFO SECTION ============ */
.info {
  padding: 100px 80px;
  background: var(--nu-powder);
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
  overflow: hidden;
}
.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-eyebrow {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 8px;
}
.info-title {
  font-family: var(--font-serif);
  font-size: 32px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0 0 24px;
  letter-spacing: -0.01em;
}

/* HOURS */
.hours-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column;
  flex: 1;
}
.hours-row {
  display: flex; justify-content: space-between; align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--nu-cloud);
  font-size: 16px;
}
.hours-row:last-child { border-bottom: none; }
.hours-day {
  font-weight: 700;
  color: var(--nu-navy);
  letter-spacing: 0.02em;
  white-space: nowrap;
  font-size: 17px;
}
.hours-time {
  font-family: var(--font-serif);
  color: var(--nu-midnight);
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-align: right;
}
.hours-closed {
  margin-top: 18px;
  padding: 12px 16px;
  background: var(--nu-powder);
  border-left: 3px solid var(--nu-amber);
  border-radius: 8px;
  font-size: 14px;
  color: var(--nu-navy);
}

/* EXPECT */
.expect-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column;
  gap: 16px;
}
.expect-row {
  display: flex; align-items: flex-start; gap: 18px;
  padding: 18px 20px;
  background: var(--nu-powder);
  border-radius: 16px;
  border: 1px solid var(--nu-cloud);
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s;
}
.expect-row:hover {
  transform: translateX(6px);
  box-shadow: 0 6px 16px rgba(0, 38, 61, 0.08);
}
.expect-icon {
  font-family: var(--font-serif);
  font-size: 30px;
  color: var(--nu-blue);
  line-height: 1;
  flex-shrink: 0;
  width: 36px; text-align: center;
}
.expect-text {
  font-size: 17px; line-height: 1.45;
  color: var(--nu-midnight);
  font-weight: 500;
}

/* CONTACT */
.contact-card { display: flex; flex-direction: column; }
.contact-row {
  display: flex; align-items: center; gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--nu-cloud);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}
.contact-row:hover:not(.contact-row--static) {
  transform: translateX(4px);
}
.contact-row:last-child { border-bottom: none; }
.contact-icon {
  font-size: 32px;
  width: 48px; height: 48px;
  border-radius: 12px;
  background: var(--nu-powder);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: var(--nu-blue);
}
.contact-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--nu-navy);
  opacity: 0.7;
  margin-bottom: 2px;
}
.contact-value {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--nu-midnight);
  font-weight: 700;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.2;
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
}
</style>
