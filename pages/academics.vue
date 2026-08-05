<script setup lang="ts">
import { PROGRAMS } from '~/utils/content'
import { h } from 'vue'

// === ABSTRACT ART COMPONENTS — one per college ===
// CAST — molecular / atomic / scientific grid
const Artcast = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <g transform="translate(80,80)"><polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"/><circle cx="0" cy="0" r="4" fill="currentColor"/></g>
      <g transform="translate(200,60)"><polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12"/><circle cx="0" cy="0" r="3" fill="currentColor"/></g>
      <g transform="translate(310,150)"><polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"/><circle cx="0" cy="0" r="3" fill="currentColor"/></g>
      <g transform="translate(160,200)"><polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"/><circle cx="0" cy="0" r="4" fill="currentColor"/></g>
      <line x1="80" y1="80" x2="200" y2="60"/><line x1="80" y1="80" x2="160" y2="200"/><line x1="200" y1="60" x2="310" y2="150"/><line x1="160" y1="200" x2="310" y2="150"/>
      <line x1="80" y1="80" x2="200" y2="60" opacity="0.4"/>
    </g>
  </svg>`
}

// Ministry — modern stained-glass with cross + light rays
const Artministry = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <path d="M200,40 C 280,90 300,180 200,260 C 100,180 120,90 200,40"/>
      <path d="M200,40 C 280,90 300,180 200,260"/>
      <line x1="200" y1="100" x2="200" y2="220" stroke-width="3"/>
      <line x1="165" y1="150" x2="235" y2="150" stroke-width="3"/>
      <line x1="200" y1="100" x2="100" y2="30" opacity="0.4"/>
      <line x1="200" y1="100" x2="300" y2="30" opacity="0.4"/>
      <line x1="200" y1="100" x2="60" y2="150" opacity="0.3"/>
      <line x1="200" y1="100" x2="340" y2="150" opacity="0.3"/>
      <polygon points="200,80 180,110 220,110" stroke-width="1.6"/>
    </g>
  </svg>`
}

// Business — strategic grid + growth bars
const Artbusiness = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <line x1="60" y1="60" x2="340" y2="60"/><line x1="60" y1="110" x2="340" y2="110"/><line x1="60" y1="160" x2="340" y2="160"/><line x1="60" y1="210" x2="340" y2="210"/>
      <line x1="100" y1="40" x2="100" y2="240"/><line x1="180" y1="40" x2="180" y2="240"/><line x1="260" y1="40" x2="260" y2="240"/>
      <polyline points="80,200 130,180 180,160 230,120 280,90 320,60" stroke-width="2.5"/>
      <circle cx="130" cy="180" r="3" fill="currentColor"/><circle cx="180" cy="160" r="3" fill="currentColor"/>
      <circle cx="230" cy="120" r="3" fill="currentColor"/><circle cx="280" cy="90" r="3" fill="currentColor"/>
      <rect x="110" y="140" width="14" height="70" opacity="0.25"/><rect x="190" y="110" width="14" height="100" opacity="0.35"/>
      <rect x="270" y="80" width="14" height="130" opacity="0.5"/>
    </g>
  </svg>`
}

// Nursing — heart + cross + pulse line
const Artnursing = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <path d="M200,260 C 130,210 80,170 80,130 C 80,90 110,70 140,70 C 165,70 190,90 200,120 C 210,90 235,70 260,70 C 290,70 320,90 320,130 C 320,170 270,210 200,260"/>
      <line x1="200" y1="130" x2="200" y2="190" stroke-width="2.2"/>
      <line x1="180" y1="160" x2="220" y2="160" stroke-width="2.2"/>
      <polyline points="40,170 100,170 130,170 150,140 170,200 200,150 230,200 250,140 270,170 300,170 360,170" stroke-width="2"/>
    </g>
  </svg>`
}

// Medicine — caduceus/precision (cross + concentric)
const Artmedicine = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <circle cx="200" cy="150" r="110"/><circle cx="200" cy="150" r="80" opacity="0.5"/><circle cx="200" cy="150" r="50" opacity="0.3"/>
      <rect x="192" y="90" width="16" height="120" fill="currentColor" stroke="none"/>
      <rect x="140" y="142" width="120" height="16" fill="currentColor" stroke="none"/>
      <line x1="200" y1="35" x2="200" y2="45"/><line x1="200" y1="255" x2="200" y2="265"/>
      <line x1="85" y1="150" x2="95" y2="150"/><line x1="305" y1="150" x2="315" y2="150"/>
    </g>
  </svg>`
}

// Social — circles of care / overlapping communities
const Artsocial = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <circle cx="130" cy="120" r="70"/><circle cx="230" cy="110" r="70" opacity="0.7"/>
      <circle cx="180" cy="200" r="70" opacity="0.5"/><circle cx="280" cy="200" r="60" opacity="0.4"/>
      <circle cx="100" cy="210" r="55" opacity="0.3"/>
      <path d="M190,150 C 175,140 165,150 165,160 C 165,170 190,185 190,185 C 190,185 215,170 215,160 C 215,150 205,140 190,150"/>
      <circle cx="200" cy="150" r="130" opacity="0.25" stroke-dasharray="3 6"/>
    </g>
  </svg>`
}

// Creatio — code brackets / film strip / lightbulb rays
const Artcreatio = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <polyline points="90,100 50,150 90,200" stroke-width="3"/>
      <polyline points="310,100 350,150 310,200" stroke-width="3"/>
      <polygon points="200,90 250,150 200,210 150,150" stroke-width="2"/>
      <circle cx="200" cy="150" r="6" fill="currentColor"/>
      <line x1="200" y1="90" x2="200" y2="60" opacity="0.5"/><line x1="200" y1="210" x2="200" y2="240" opacity="0.5"/>
      <line x1="150" y1="150" x2="120" y2="150" opacity="0.5"/><line x1="250" y1="150" x2="280" y2="150" opacity="0.5"/>
      <line x1="165" y1="115" x2="145" y2="95" opacity="0.3"/><line x1="235" y1="115" x2="255" y2="95" opacity="0.3"/>
      <line x1="165" y1="185" x2="145" y2="205" opacity="0.3"/><line x1="235" y1="185" x2="255" y2="205" opacity="0.3"/>
    </g>
  </svg>`
}

// Education — open book + lightbulb / growth
const Arteducation = {
  template: `<svg class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <path d="M80,180 L200,120 L320,180 L200,240 Z" stroke-width="2"/>
      <path d="M80,180 L200,240 L320,180"/>
      <line x1="200" y1="120" x2="200" y2="60"/>
      <line x1="160" y1="75" x2="200" y2="60" opacity="0.5"/>
      <line x1="240" y1="75" x2="200" y2="60" opacity="0.5"/>
      <circle cx="200" cy="50" r="12" fill="currentColor" opacity="0.6"/>
      <line x1="200" y1="240" x2="200" y2="280"/>
      <line x1="160" y1="260" x2="240" y2="260"/>
      <path d="M120,150 L140,170 M280,150 L260,170" opacity="0.5"/>
    </g>
  </svg>`
}

// Map of art components
const ART: Record<string, any> = {
  cast: Artcast, ministry: Artministry, business: Artbusiness,
  nursing: Artnursing, medicine: Artmedicine, social: Artsocial, creatio: Artcreatio,
  education: Arteducation
}

// === NU palette + visual archetype per college ===
const palette = [
  { hue: 'navy',    accent: 'var(--nu-navy)',     accentSoft: 'rgba(3, 76, 135, 0.12)',  short: 'CAST',  art: 'cast'    },
  { hue: 'midnight',accent: 'var(--nu-midnight)', accentSoft: 'rgba(0, 38, 61, 0.12)',   short: 'COM',   art: 'ministry'},
  { hue: 'blue',    accent: 'var(--nu-blue)',     accentSoft: 'rgba(0, 104, 187, 0.12)', short: 'BUS',   art: 'business'},
  { hue: 'leaf',    accent: 'var(--nu-leaf)',     accentSoft: 'rgba(68, 186, 130, 0.14)', short: 'NUR',   art: 'nursing' },
  { hue: 'tour',    accent: 'var(--nu-tour)',     accentSoft: 'rgba(251, 217, 69, 0.16)', short: 'PA',    art: 'medicine'},
  { hue: 'alt',     accent: 'var(--nu-alt)',      accentSoft: 'rgba(20, 141, 205, 0.12)', short: 'SBS',   art: 'social'  },
  { hue: 'amber',   accent: 'var(--nu-amber)',    accentSoft: 'rgba(255, 188, 45, 0.16)', short: 'CRT',   art: 'creatio' },
  { hue: 'sky',    accent: 'var(--nu-sky)',      accentSoft: 'rgba(149, 197, 234, 0.2)', short: 'EDU',   art: 'education' }
]

// === Hero stats ===
const heroStats = [
  { value: '22', label: 'Majors' },
  { value: '6',  label: 'Colleges' },
  { value: '7',  label: 'Schools' },
  { value: '3',  label: 'Centers' }
]

// === Featured discovery cards ===
const discover = [
  { icon: '◐', title: 'Find Your Path',    text: 'A personalized look at programs, people, and a four-year plan that fits you.', accent: 'var(--nu-blue)' },
  { icon: '✉', title: 'Talk to an Advisor', text: 'Faculty and admissions counselors are here to answer every question.',          accent: 'var(--nu-tour)' },
  { icon: '⌖', title: 'Schedule a Visit',  text: 'See the campus, sit in a class, and meet current students.',                   accent: 'var(--nu-leaf)' },
  { icon: '◆', title: 'Career Outcomes',   text: '94% of graduates are employed or in graduate school within 6 months.',        accent: 'var(--nu-amber)' }
]
</script>

<template>
  <div class="world-body-inner">
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- HERO — fullscreen photo + bold typography                       -->
    <!-- ============================================================== -->
    <section class="hero">
      <img class="hero-img" src="/images/251004FamilyWeekend-5303.jpg" alt="Northwest students gathered on the campus lawn for a community event" />
      <div class="hero-overlay" />

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="ey-dot" /> Academics
        </div>
        <h1 class="hero-title">Academic Programs</h1>
        <p class="hero-subtitle">
          Explore our colleges, majors, and centers and discover a path that fits your calling.
        </p>
        <div class="hero-stats">
          <div v-for="(s, i) in heroStats" :key="s.label" class="hero-stat" :style="{ animationDelay: `${i * 100 + 200}ms` }">
            <div class="stat-num">{{ s.value }}</div>
            <div class="stat-lbl">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- COLLEGE SHOWCASE — Apple-style large featured cards              -->
    <!-- ============================================================== -->
    <section class="colleges">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Colleges &amp; Centers</div>
          <h2 class="sect-title">A path for every calling.</h2>
        </div>
        <p class="sect-subtitle">Seven distinct schools united by one mission &mdash; to equip students to lead with wisdom, faith, and purpose.</p>
      </div>

      <div class="college-grid stagger">
        <article
          v-for="(p, i) in PROGRAMS"
          :key="p.id"
          class="college-card hover-lift tap-pop"
          :class="`college-card--${palette[i].art}`"
          :style="{
            '--accent': palette[i].accent,
            '--accent-soft': palette[i].accentSoft,
            animationDelay: `${i * 60}ms`
          }"
        >
          <!-- ABSTRACT VISUAL SYSTEM (one per college, inline SVG) -->
          <div class="card-art">
            <!-- CAST — molecular / scientific -->
            <svg v-if="palette[i].art === 'cast'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <g transform="translate(80,80)"><polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"/><circle cx="0" cy="0" r="4" fill="currentColor"/></g>
                <g transform="translate(200,60)"><polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12"/><circle cx="0" cy="0" r="3" fill="currentColor"/></g>
                <g transform="translate(310,150)"><polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"/><circle cx="0" cy="0" r="3" fill="currentColor"/></g>
                <g transform="translate(160,200)"><polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"/><circle cx="0" cy="0" r="4" fill="currentColor"/></g>
                <line x1="80" y1="80" x2="200" y2="60"/><line x1="80" y1="80" x2="160" y2="200"/><line x1="200" y1="60" x2="310" y2="150"/><line x1="160" y1="200" x2="310" y2="150"/>
                <line x1="80" y1="80" x2="200" y2="60" opacity="0.4"/>
              </g>
            </svg>
            <!-- Ministry — stained glass / cross / light rays -->
            <svg v-else-if="palette[i].art === 'ministry'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <path d="M200,40 C 280,90 300,180 200,260 C 100,180 120,90 200,40"/>
                <path d="M200,40 C 280,90 300,180 200,260"/>
                <line x1="200" y1="100" x2="200" y2="220" stroke-width="3"/>
                <line x1="165" y1="150" x2="235" y2="150" stroke-width="3"/>
                <line x1="200" y1="100" x2="100" y2="30" opacity="0.4"/>
                <line x1="200" y1="100" x2="300" y2="30" opacity="0.4"/>
                <line x1="200" y1="100" x2="60" y2="150" opacity="0.3"/>
                <line x1="200" y1="100" x2="340" y2="150" opacity="0.3"/>
                <polygon points="200,80 180,110 220,110" stroke-width="1.6"/>
              </g>
            </svg>
            <!-- Business — strategic grid + growth -->
            <svg v-else-if="palette[i].art === 'business'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <line x1="60" y1="60" x2="340" y2="60"/><line x1="60" y1="110" x2="340" y2="110"/><line x1="60" y1="160" x2="340" y2="160"/><line x1="60" y1="210" x2="340" y2="210"/>
                <line x1="100" y1="40" x2="100" y2="240"/><line x1="180" y1="40" x2="180" y2="240"/><line x1="260" y1="40" x2="260" y2="240"/>
                <polyline points="80,200 130,180 180,160 230,120 280,90 320,60" stroke-width="2.5"/>
                <circle cx="130" cy="180" r="3" fill="currentColor"/><circle cx="180" cy="160" r="3" fill="currentColor"/>
                <circle cx="230" cy="120" r="3" fill="currentColor"/><circle cx="280" cy="90" r="3" fill="currentColor"/>
                <rect x="110" y="140" width="14" height="70" opacity="0.25"/><rect x="190" y="110" width="14" height="100" opacity="0.35"/>
                <rect x="270" y="80" width="14" height="130" opacity="0.5"/>
              </g>
            </svg>
            <!-- Nursing — heart + cross + pulse -->
            <svg v-else-if="palette[i].art === 'nursing'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <path d="M200,260 C 130,210 80,170 80,130 C 80,90 110,70 140,70 C 165,70 190,90 200,120 C 210,90 235,70 260,70 C 290,70 320,90 320,130 C 320,170 270,210 200,260"/>
                <line x1="200" y1="130" x2="200" y2="190" stroke-width="2.2"/>
                <line x1="180" y1="160" x2="220" y2="160" stroke-width="2.2"/>
                <polyline points="40,170 100,170 130,170 150,140 170,200 200,150 230,200 250,140 270,170 300,170 360,170" stroke-width="2"/>
              </g>
            </svg>
            <!-- Medicine — concentric rings + cross -->
            <svg v-else-if="palette[i].art === 'medicine'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <circle cx="200" cy="150" r="110"/><circle cx="200" cy="150" r="80" opacity="0.5"/><circle cx="200" cy="150" r="50" opacity="0.3"/>
                <rect x="192" y="90" width="16" height="120" fill="currentColor" stroke="none"/>
                <rect x="140" y="142" width="120" height="16" fill="currentColor" stroke="none"/>
                <line x1="200" y1="35" x2="200" y2="45"/><line x1="200" y1="255" x2="200" y2="265"/>
                <line x1="85" y1="150" x2="95" y2="150"/><line x1="305" y1="150" x2="315" y2="150"/>
              </g>
            </svg>
            <!-- Social — overlapping circles of care -->
            <svg v-else-if="palette[i].art === 'social'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <circle cx="130" cy="120" r="70"/><circle cx="230" cy="110" r="70" opacity="0.7"/>
                <circle cx="180" cy="200" r="70" opacity="0.5"/><circle cx="280" cy="200" r="60" opacity="0.4"/>
                <circle cx="100" cy="210" r="55" opacity="0.3"/>
                <path d="M190,150 C 175,140 165,150 165,160 C 165,170 190,185 190,185 C 190,185 215,170 215,160 C 215,150 205,140 190,150"/>
                <circle cx="200" cy="150" r="130" opacity="0.25" stroke-dasharray="3 6"/>
              </g>
            </svg>
            <!-- Creatio — code brackets + diamond + light rays -->
            <svg v-else-if="palette[i].art === 'creatio'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <polyline points="90,100 50,150 90,200" stroke-width="3"/>
                <polyline points="310,100 350,150 310,200" stroke-width="3"/>
                <polygon points="200,90 250,150 200,210 150,150" stroke-width="2"/>
                <circle cx="200" cy="150" r="6" fill="currentColor"/>
                <line x1="200" y1="90" x2="200" y2="60" opacity="0.5"/><line x1="200" y1="210" x2="200" y2="240" opacity="0.5"/>
                <line x1="150" y1="150" x2="120" y2="150" opacity="0.5"/><line x1="250" y1="150" x2="280" y2="150" opacity="0.5"/>
                <line x1="165" y1="115" x2="145" y2="95" opacity="0.3"/><line x1="235" y1="115" x2="255" y2="95" opacity="0.3"/>
                <line x1="165" y1="185" x2="145" y2="205" opacity="0.3"/><line x1="235" y1="185" x2="255" y2="205" opacity="0.3"/>
              </g>
            </svg>
            <!-- Education — open book + lightbulb / growth -->
            <svg v-else-if="palette[i].art === 'education'" class="art-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <path d="M80,180 L200,120 L320,180 L200,240 Z" stroke-width="2"/>
                <path d="M80,180 L200,240 L320,180"/>
                <line x1="200" y1="120" x2="200" y2="60"/>
                <line x1="160" y1="75" x2="200" y2="60" opacity="0.5"/>
                <line x1="240" y1="75" x2="200" y2="60" opacity="0.5"/>
                <circle cx="200" cy="50" r="12" fill="currentColor" opacity="0.6"/>
                <line x1="200" y1="240" x2="200" y2="280"/>
                <line x1="160" y1="260" x2="240" y2="260"/>
                <path d="M120,150 L140,170 M280,150 L260,170" opacity="0.5"/>
              </g>
            </svg>
            <div class="art-shade" />
            <div class="art-stamp">
              <span class="art-num">0{{ i + 1 }}</span>
            </div>
          </div>

          <!-- CONTENT -->
          <div class="card-body">
            <div class="card-meta">
              <span class="card-pill">Northwest</span>
              <span class="card-count">{{ p.programs.length }} programs</span>
            </div>
            <h3 class="card-title">{{ p.college }}</h3>
            <p class="card-tag">{{ p.tagline }}</p>
            <div class="card-progs">
              <span v-for="pr in p.programs" :key="pr" class="prog-chip">{{ pr }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- DISCOVERY FEATURES — premium informational cards                 -->
    <!-- ============================================================== -->
    <section class="discover">
      <div class="section-head">
        <div>
          <div class="sect-eyebrow">Take the next step</div>
          <h2 class="sect-title">Find what fits your calling.</h2>
        </div>
        <p class="sect-subtitle">Every path starts with a conversation. We'd love to walk through yours.</p>
      </div>

      <div class="discover-grid stagger">
        <article
          v-for="(d, i) in discover"
          :key="d.title"
          class="discover-card hover-lift tap-pop"
          :style="{ '--accent': d.accent, animationDelay: `${i * 80}ms` }"
        >
          <div class="discover-icon">{{ d.icon }}</div>
          <h3 class="discover-title">{{ d.title }}</h3>
          <p class="discover-text">{{ d.text }}</p>
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
  background: var(--nu-wisp);
}
.world-body-inner::-webkit-scrollbar { display: none; }

/* ================================================================ */
/*  HERO — fullscreen photo + bold typography                          */
/* ================================================================ */
.hero {
  position: relative;
  width: calc(100% + 112px);
  margin-left: -56px;
  margin-top: 0;
  margin-bottom: 64px;
  height: 56vh;
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
  object-fit: cover; object-position: center 35%;
  display: block;
  z-index: 0;
  animation: kenburns 22s ease-in-out infinite alternate;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(0, 38, 61, 0.30) 0%,
    rgba(0, 38, 61, 0.15) 35%,
    rgba(0, 38, 61, 0.55) 70%,
    rgba(0, 38, 61, 0.92) 100%);
  z-index: 1;
  pointer-events: none;
}
.hero-content {
  position: absolute;
  left: 56px; right: 56px; bottom: 0;
  padding: 0 0 60px;
  color: var(--nu-wisp);
  z-index: 2;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--nu-tour);
  margin-bottom: 18px;
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
  font-family: var(--font-serif);
  font-size: 108px; line-height: 0.96;
  color: var(--nu-wisp);
  margin: 0 0 18px;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.1s both;
}
.hero-subtitle {
  font-size: 22px; line-height: 1.4;
  color: var(--nu-wisp);
  opacity: 0.95;
  margin: 0 0 32px;
  max-width: 60ch;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  animation: fadeUp 0.8s var(--ease-out-soft) 0.2s both;
}
.hero-stats {
  display: flex; gap: 28px;
  animation: fadeUp 0.8s var(--ease-out-soft) 0.3s both;
}
.hero-stat {
  display: flex; align-items: baseline; gap: 10px;
  padding: 12px 22px 12px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
}
.hero-stat:last-child { border-right: none; padding-right: 0; }
.stat-num {
  font-family: var(--font-serif);
  font-size: 64px; line-height: 0.95; font-weight: 700;
  color: var(--nu-tour);
  letter-spacing: -0.02em;
}
.stat-lbl {
  font-size: 18px; font-weight: 600;
  color: var(--nu-skylight);
  letter-spacing: 0.02em;
}

/* ================================================================ */
/*  COLLEGE SHOWCASE — Apple-style large featured cards               */
/* ================================================================ */
.colleges {
  margin: 0 0 64px;
  animation: fadeUp 0.7s var(--ease-out-soft) 0.1s both;
}
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
  font-family: var(--font-serif);
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
.college-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
.college-card {
  position: relative;
  background: var(--nu-wisp);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 38, 61, 0.06);
  border: 1px solid var(--nu-cloud);
  display: flex; flex-direction: column;
  transition: transform 0.4s var(--ease-out-soft), box-shadow 0.4s var(--ease-out-soft), border-color 0.3s;
  animation: scaleIn 0.6s var(--ease-out-soft) both;
}
.college-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 50px rgba(0, 38, 61, 0.18);
  border-color: var(--accent);
}
.card-art {
  position: relative;
  height: 260px;
  background:
    linear-gradient(135deg, var(--accent) 0%, var(--accent) 50%, rgba(0,0,0,0.18) 100%);
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);
}
.art-svg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  color: rgba(255, 255, 255, 0.55);
  transition: transform 0.6s var(--ease-out-soft);
  display: block;
  pointer-events: none;
}
.college-card:hover .art-svg { transform: scale(1.08); }
.art-shade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.18) 100%);
  z-index: 1;
}
.art-stamp {
  position: absolute;
  top: 18px; right: 22px;
  z-index: 2;
  color: rgba(255, 255, 255, 0.95);
}
.art-num {
  font-family: var(--font-serif);
  font-size: 22px; font-weight: 700;
  opacity: 0.85;
  letter-spacing: 0.06em;
}

.card-body {
  position: relative;
  padding: 28px 32px 32px;
  display: flex; flex-direction: column;
  gap: 12px;
  flex: 1;
  background: var(--nu-wisp);
  color: var(--nu-midnight);
}
.card-meta {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: -4px;
}
.card-pill {
  font-size: 10px; font-weight: 800;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent);
  padding: 4px 10px;
  background: var(--accent-soft);
  border-radius: 999px;
}
.card-count {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--nu-navy);
  opacity: 0.7;
}
.card-title {
  font-family: var(--font-serif);
  font-size: 30px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0;
  letter-spacing: -0.01em;
}
.card-tag {
  font-size: 15px; line-height: 1.45;
  color: var(--nu-navy);
  margin: 0;
  opacity: 0.85;
}
.card-progs {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin: 4px 0 8px;
}
.prog-chip {
  padding: 6px 12px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  color: var(--nu-midnight);
  border-radius: 999px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.2s var(--ease-out-soft);
}
.prog-chip:hover {
  background: var(--accent);
  color: var(--nu-wisp);
  transform: translateY(-1px);
}

/* ================================================================ */
/*  DISCOVERY FEATURES                                                */
/* ================================================================ */
.discover {
  margin: 0 0 32px;
  animation: fadeUp 0.7s var(--ease-out-soft) 0.2s both;
}
.discover-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.discover-card {
  position: relative;
  background: var(--nu-wisp);
  border-radius: 22px;
  padding: 28px 26px;
  border: 1px solid var(--nu-cloud);
  box-shadow: 0 4px 14px rgba(0, 38, 61, 0.05);
  display: flex; flex-direction: column;
  gap: 10px;
  transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s var(--ease-out-soft);
  animation: scaleIn 0.5s var(--ease-out-soft) both;
  overflow: hidden;
}
.discover-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out-soft);
}
.discover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 38, 61, 0.14);
}
.discover-card:hover::before { transform: scaleX(1); }
.discover-icon {
  font-size: 32px;
  color: var(--accent);
  line-height: 1;
  font-family: var(--font-serif);
  margin-bottom: 4px;
}
.discover-title {
  font-family: var(--font-serif);
  font-size: 22px; line-height: 1.1;
  color: var(--nu-midnight);
  margin: 0;
}
.discover-text {
  font-size: 13px; line-height: 1.5;
  color: var(--nu-navy);
  margin: 0;
  opacity: 0.85;
  flex: 1;
}

/* ================================================================ */
/*  RESPONSIVE                                                        */
/* ================================================================ */
@media (max-width: 720px) {
  .hero-title { font-size: 64px; }
  .hero-stats { flex-direction: column; gap: 8px; }
  .hero-stat { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.18); padding: 8px 0; }
  .hero-stat:last-child { border-bottom: none; }
  .college-grid { grid-template-columns: 1fr; }
  .discover-grid { grid-template-columns: 1fr 1fr; }
  .sect-title { font-size: 36px; }
  .section-head { flex-direction: column; align-items: flex-start; }
  .sect-subtitle { text-align: left; }
}
</style>
