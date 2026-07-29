<script setup lang="ts">
import { TEAMS } from '~/utils/content'

// Upcoming games pulled from the official 2026-2027 schedule.
// Cascade Collegiate Conference opponents. All in Pacific Time.
const upcomingGames = [
  { date: 'Aug 20', time: '4:00 PM', sport: 'Men\u2019s Soccer',     home: 'Eagles',  vs: 'College of Idaho',      venue: 'Northwest Soccer Field' },
  { date: 'Aug 22', time: '7:00 PM', sport: 'Women\u2019s Volleyball', home: 'Eagles',  vs: 'Eastern Oregon',         venue: 'Northwest Pavilion' },
  { date: 'Aug 29', time: '5:00 PM', sport: 'Women\u2019s Volleyball', home: 'Visitors', vs: 'Walla Walla',            venue: 'Northwest Pavilion' },
  { date: 'Aug 30', time: '4:00 PM', sport: 'Men\u2019s Soccer',     home: 'Eagles',  vs: 'Southern Oregon',        venue: 'Northwest Soccer Field' },
  { date: 'Sep  6', time: '9:00 AM', sport: 'Cross Country',         home: 'Eagles',  vs: 'CCC Invite',             venue: 'Lower Campus' }
]
</script>

<template>
  <div class="world-body-inner">
    <WorldHeader
      eyebrow="Eagles Athletics"
      title="Go Eagles."
    />

    <div class="hero">
      <img class="hero-photo" src="/images/250811VolleyballMediaDay-1183.jpg" alt="Eagles athlete" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <h2 class="hero-title">Go Eagles.</h2>
        <p class="hero-sub">9 teams &middot; Cascade Collegiate Conference</p>
      </div>
    </div>

    <h2 class="h2 sect">Upcoming Games</h2>
    <div class="games stagger">
      <div v-for="(g, i) in upcomingGames" :key="g.date + g.sport" class="game" :style="{ animationDelay: `${i * 60}ms` }">
        <div class="game-date">
          <div class="game-month">{{ g.date.split(' ')[0] }}</div>
          <div class="game-day">{{ g.date.split(' ')[1] }}</div>
          <div class="game-time">{{ g.time }}</div>
        </div>
        <div class="game-body">
          <div class="game-sport">{{ g.sport }}</div>
          <div class="game-matchup">
            <span class="matchup-team" :class="{ 'is-home': g.home === 'Eagles' }">Northwest</span>
            <span class="matchup-vs">vs</span>
            <span class="matchup-opp">{{ g.vs }}</span>
          </div>
          <div class="game-venue">
            <span class="home-badge" v-if="g.home === 'Eagles'">HOME</span>
            <span class="away-badge" v-else>AWAY</span>
            {{ g.venue }}
          </div>
        </div>
      </div>
    </div>

    <h2 class="h2 sect">Teams</h2>
    <div class="teams">
      <article v-for="t in TEAMS" :key="t.id" class="team">
        <div class="team-photo" :style="{ backgroundImage: `url(/images/${t.image})` }" />
        <div class="team-overlay" />
        <div class="team-body">
          <h3 class="card-title">{{ t.sport }}</h3>
        </div>
      </article>
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

.hero {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  height: 480px;
  box-shadow: 0 18px 36px rgba(0, 38, 61, 0.18);
  animation: scaleIn 0.7s var(--ease-out-soft) both;
}
.hero-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 22%;
  display: block;
  animation: kenburns 18s ease-in-out infinite alternate;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,38,61,0.40) 0%, rgba(0,38,61,0.75) 60%, rgba(0,38,61,0.95) 100%);
}
.hero-content {
  position: absolute; inset: 0;
  padding: 40px;
  color: var(--nu-wisp);
  display: flex; flex-direction: column;
  justify-content: flex-end;
}
.hero-title {
  font-family: 'Redzone', Georgia, serif;
  font-size: 64px; line-height: 1.05;
  color: var(--nu-wisp);
  margin: 0;
}
.hero-sub { font-size: 18px; line-height: 1.45; color: var(--nu-skylight); margin: 8px 0 0; }

.sect { margin: 28px 0 12px; }
.h2 { font-family: 'Redzone', Georgia, serif; }

.teams {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.team {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  height: 360px;
  background: var(--nu-cloud);
  animation: fadeUp 0.7s var(--ease-out-soft) both;
}
.team-photo {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: transform 0.8s var(--ease-out-soft);
}
.team:hover .team-photo { transform: scale(1.05); }
.team-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,38,61,0) 40%, rgba(0,38,61,0.92) 100%);
}
.team-body {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 20px 24px;
  color: var(--nu-wisp);
}
.team .card-title { font-size: 26px; margin: 0; }

/* === UPCOMING GAMES === */
.games {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 32px;
}
.game {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  background: var(--nu-wisp);
  border-radius: 16px;
  padding: 16px 22px;
  box-shadow: 0 4px 14px rgba(0, 38, 61, 0.05);
  border-left: 4px solid var(--nu-blue);
  animation: fadeUp 0.5s var(--ease-out-soft) both;
  align-items: center;
}
.game-date {
  text-align: center;
  border-right: 1px solid var(--nu-cloud);
  padding-right: 16px;
}
.game-month {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--nu-tour);
}
.game-day {
  font-family: var(--font-serif);
  font-size: 36px; font-weight: 700;
  color: var(--nu-midnight);
  line-height: 1;
  margin: 4px 0;
}
.game-time {
  font-size: 13px; font-weight: 600;
  color: var(--nu-navy);
  opacity: 0.75;
}
.game-body { display: flex; flex-direction: column; gap: 4px; }
.game-sport {
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--nu-navy);
  opacity: 0.7;
}
.game-matchup {
  display: flex; align-items: baseline; gap: 12px;
  font-family: var(--font-serif);
  font-size: 24px;
}
.matchup-team {
  color: var(--nu-blue);
  font-weight: 700;
}
.matchup-team.is-home { color: var(--nu-blue); }
.matchup-vs {
  font-size: 14px; font-style: italic;
  color: var(--nu-navy);
  opacity: 0.5;
}
.matchup-opp { color: var(--nu-midnight); }
.game-venue {
  font-size: 13px;
  color: var(--nu-navy);
  opacity: 0.8;
  display: flex; align-items: center; gap: 8px;
}
.home-badge, .away-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.16em;
}
.home-badge { background: var(--nu-tour); color: var(--nu-midnight); }
.away-badge { background: var(--nu-cloud); color: var(--nu-navy); }
</style>
