<script setup lang="ts">
import { useDisplayState } from '~/composables/useDisplayState'
import { useLocation } from '~/composables/useLocation'
import { useOrientation } from '~/composables/useOrientation'

const { go, isIdle } = useDisplayState()
const { label: locationLabel } = useLocation()
const { isPortrait } = useOrientation()
</script>

<template>
  <div class="shell" :class="{ 'is-portrait': isPortrait, 'is-landscape': !isPortrait }">
    <IdleOverlay v-if="isIdle" @wake="() => {}" />

    <!-- TOP BAR -->
    <header class="topbar">
      <button
        class="brand"
        type="button"
        aria-label="Go to Main Lobby"
        @click="go('home')"
      >
        <img
          class="brand-shield"
          src="/images/northwest_shield.png"
          alt="Northwest University shield"
          width="76"
          height="80"
        />
        <div class="brand-text">
          <div class="brand-name">Northwest University</div>
          <div class="brand-sub">Wayfinding · {{ locationLabel }}</div>
        </div>
      </button>

      <div class="loc-pill">
        <span class="loc-dot" />
        <span>{{ locationLabel }}</span>
      </div>
    </header>

    <!-- Page area (no left rail — full width) -->
    <main class="page-area">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.shell {
  position: absolute; inset: 0;
  width: 1080px;
  height: 1920px;
  display: flex; flex-direction: column;
  background: var(--nu-wisp);
  overflow: hidden;
}

/* === TOP BAR === */
.topbar {
  flex: 0 0 auto;
  height: 130px;
  padding: 0 56px;
  display: flex; align-items: center; gap: 32px;
  background: linear-gradient(180deg, var(--nu-wisp) 0%, rgba(249,249,249,0.85) 100%);
  border-bottom: 1px solid var(--nu-cloud);
  z-index: 20;
}

.hamburger {
  flex: 0 0 auto;
  width: 84px; height: 84px;
  border-radius: 24px;
  background: var(--nu-powder);
  border: 1px solid var(--nu-sky);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out-soft),
              transform var(--dur-fast) var(--ease-out-soft);
}
.hamburger:hover { background: var(--nu-skylight); }
.hamburger:active { transform: scale(0.95); }
.hamburger .bar {
  display: block;
  width: 40px; height: 5px;
  background: var(--nu-midnight);
  border-radius: 3px;
  transition: transform 0.3s var(--ease-out-soft),
              opacity   0.3s var(--ease-out-soft);
}
.hamburger.is-open .bar:nth-child(1) { transform: translateY(13px) rotate(45deg); }
.hamburger.is-open .bar:nth-child(2) { opacity: 0; }
.hamburger.is-open .bar:nth-child(3) { transform: translateY(-13px) rotate(-45deg); }

.brand {
  /* Reset button defaults so the brand block looks identical to a div. */
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  display: flex; align-items: center; gap: 20px;
  flex: 1; min-width: 0;
  padding: 4px 8px;
  margin: -4px -8px;
  border-radius: 12px;
  transition: background 0.2s var(--ease-out-soft);
}
.brand:hover { background: var(--nu-cloud); }
.brand:active { background: var(--nu-powder); }
.brand:focus-visible { outline: 2px solid var(--nu-blue); outline-offset: 2px; }
.brand-shield {
  width: 76px;
  height: 80px;
  flex-shrink: 0;
  object-fit: contain;
  /* The shield is a square aspect 170x180 — the layout reserves 80px
     to preserve vertical alignment with the text block. */
  filter: drop-shadow(0 4px 10px rgba(0, 38, 61, 0.18));
}
.brand-text { min-width: 0; }
.brand-name {
  font-family: var(--font-serif);
  font-size: 30px; line-height: 1.1;
  color: var(--nu-midnight);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.brand-sub {
  font-size: 14px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--nu-navy);
  opacity: 0.7;
  margin-top: 4px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.loc-pill {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 28px;
  background: var(--nu-powder);
  border-radius: 999px;
  font-size: 18px; font-weight: 600;
  color: var(--nu-navy);
  flex-shrink: 0;
}
.loc-dot {
  width: 12px; height: 12px;
  border-radius: 999px;
  background: var(--nu-leaf);
  box-shadow: 0 0 0 5px rgba(68, 186, 130, 0.18);
}

/* === DRAWER === */
.drawer-root {
  position: absolute; inset: 0;
  z-index: 40;
  background: rgba(0, 38, 61, 0.45);
  backdrop-filter: blur(6px);
}
.drawer {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 720px;
  max-width: 90%;
  background: var(--nu-wisp);
  box-shadow: 8px 0 40px rgba(0, 38, 61, 0.25);
  display: flex; flex-direction: column;
  padding: 56px 56px 56px;
}
.drawer-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 40px;
  animation: fadeRight 0.4s var(--ease-out-soft) both;
}
.close-btn {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: var(--nu-powder);
  border: 1px solid var(--nu-sky);
  font-size: 44px; line-height: 1;
  color: var(--nu-midnight);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.close-btn:hover { background: var(--nu-skylight); }
.close-btn:active { transform: scale(0.92); }

.drawer-list {
  flex: 1;
  display: flex; flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}
.drawer-item {
  display: flex; align-items: center; gap: 20px;
  padding: 24px 28px;
  background: var(--nu-cloud);
  border: none;
  border-radius: 22px;
  text-align: left;
  cursor: pointer;
  min-height: 96px;
  transition: background 0.25s var(--ease-out-soft),
              transform 0.25s var(--ease-out-soft);
  animation: fadeRight 0.5s var(--ease-out-soft) both;
}
.drawer-item:hover { background: var(--nu-powder); }
.drawer-item:active { transform: scale(0.99); }
.drawer-item.is-active {
  background: var(--nu-navy);
  color: var(--nu-wisp);
}
.di-bar {
  width: 6px; height: 44px;
  background: var(--nu-sky);
  border-radius: 3px;
  flex-shrink: 0;
  transition: background 0.2s, width 0.2s;
}
.drawer-item.is-active .di-bar {
  background: var(--nu-tour);
  width: 10px;
}
.di-num {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--nu-navy);
  opacity: 0.45;
  width: 44px;
  text-align: right;
  flex-shrink: 0;
}
.drawer-item.is-active .di-num { color: var(--nu-sky); opacity: 0.85; }
.di-text {
  flex: 1;
  display: flex; align-items: center; justify-content: space-between;
  min-width: 0;
}
.di-label {
  font-family: var(--font-serif);
  font-size: 32px;
  line-height: 1.1;
  color: inherit;
}
.di-arrow {
  font-size: 28px;
  color: var(--nu-blue);
  transition: transform 0.2s;
}
.drawer-item.is-active .di-arrow { color: var(--nu-tour); }
.drawer-item:hover .di-arrow { transform: translateX(6px); }

.drawer-foot {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--nu-cloud);
  display: flex; flex-direction: column; gap: 8px;
  font-size: 16px;
  color: var(--nu-navy);
  opacity: 0.65;
  letter-spacing: 0.04em;
}
.drawer-foot kbd {
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid var(--nu-sky);
  border-radius: 6px;
  background: var(--nu-wisp);
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--nu-navy);
  margin: 0 2px;
}

.drawer-enter-active,
.drawer-leave-active { transition: opacity 0.3s var(--ease-out-soft); }
.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
  transition: transform 0.4s var(--ease-out-soft);
}
.drawer-enter-from,
.drawer-leave-to { opacity: 0; }
.drawer-enter-from .drawer,
.drawer-leave-to .drawer { transform: translateX(-100%); }

/* === PAGE === */
.page-area {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  position: relative;
  /* Each world page is an absolutely-positioned child that scrolls
     internally (its .world-body-inner has overflow-y: auto). The
     page-area itself is the viewport that contains them. */
  overflow: hidden;
  touch-action: pan-y;
}
.page-area > * {
  height: 100%;
  min-height: 0;
}

/* === BOTTOM HINT === */
.bottom-hint {
  flex: 0 0 auto;
  height: 56px;
  display: flex; align-items: center; justify-content: center;
  gap: 20px;
  font-size: 14px;
  color: var(--nu-navy);
  opacity: 0.55;
  letter-spacing: 0.04em;
  z-index: 20;
}
.bottom-hint kbd {
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid var(--nu-sky);
  border-radius: 6px;
  background: var(--nu-wisp);
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--nu-navy);
  margin: 0 3px;
}
.dot-sep {
  width: 5px; height: 5px;
  background: var(--nu-sky);
  border-radius: 999px;
  display: inline-block;
}
</style>
