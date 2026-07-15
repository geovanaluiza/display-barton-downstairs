import type { EventItem, StoryItem, TeamItem, ClubItem, ProgramItem } from '~/types'

// Events are stored as ABSOLUTE dates. The `date` and `when` fields below
// are derived at render-time via whenLabel() / countdownFor() in pages.
// Sources: northwestu.edu/calendar + 2026-2027 Academic Calendar.
type RawEvent = Omit<EventItem, 'date'> & { start: string; allDay?: boolean }

const RAW: RawEvent[] = [
  // ---- Summer 2026 (right now) ----
  {
    id: 'evt-youth-camp',
    title: 'Northwest Ministry Network Youth Camp',
    start: '2026-06-29T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'service',
    blurb: 'High-schoolers gather for a week of teaching, worship, and community on campus, hosted by the Northwest Ministry Network.',
    image: '250912 SunnyDay (10).jpg',
    allDay: true
  },
  // ---- Fall 2026 Welcome Week (per Academic Calendar) ----
  {
    id: 'evt-fall-cele',
    title: 'CELE Welcome (Aug 25-26)',
    start: '2026-08-25T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'academic',
    blurb: 'Two-day welcome program for the College of Lifelong Education. Per the 2026-2027 academic calendar.',
    image: '250821 StudentLeadershipFairEdited5483.jpg',
    allDay: true
  },
  {
    id: 'evt-movein-new',
    title: 'New Students Move In',
    start: '2026-08-27T09:00:00',
    time: '9:00 AM',
    location: 'Residence Halls',
    category: 'social',
    blurb: 'Residence Halls and Dining Hall open for the Class of 2030.',
    image: '250821 StudentLeadershipFairEdited5488.jpg'
  },
  // ---- Fall 2026 Welcome Week (per Academic Calendar) ----
  {
    id: 'evt-welcome-weekend',
    title: 'Welcome Weekend',
    start: '2026-08-27T17:00:00',
    time: 'All Weekend',
    location: 'Campus Wide',
    category: 'social',
    blurb: 'Four days of move-in, orientations, games, and a campus-wide welcome for new and returning students.',
    image: '250824IgniteJREdited  (5).jpg',
    allDay: true
  },
  {
    id: 'evt-movein-returning',
    title: 'Returning Students Move In',
    start: '2026-08-28T09:00:00',
    time: '9:00 AM',
    location: 'Residence Halls',
    category: 'social',
    blurb: 'Residence Halls and Dining Hall open for returning students.',
    image: '250918BridalTrails-5070.jpg'
  },
  {
    id: 'evt-first-day',
    title: 'First Day of Fall Classes',
    start: '2026-08-31T08:00:00',
    time: '8:00 AM',
    location: 'Campus Wide',
    category: 'academic',
    blurb: 'The first day of the Fall 2026 semester. Coffee, giveaways, and new beginnings.',
    image: '250903ChurchFair-4465.jpg'
  },
  {
    id: 'evt-add-drop',
    title: 'Last Day to Add / Drop',
    start: '2026-09-06T23:59:00',
    time: '11:59 PM',
    location: 'Registrar',
    category: 'academic',
    blurb: 'Last day to register and to add/drop courses for full refund.',
    image: '250824IgniteJREdited  (56).jpg'
  },
  {
    id: 'evt-labor-day',
    title: 'Labor Day — University Closed',
    start: '2026-09-07T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'academic',
    blurb: 'No classes. University offices closed.',
    image: '250912 SunnyDay (2).jpg',
    allDay: true
  },
  {
    id: 'evt-fall-2026-semester',
    title: 'Fall 2026 Semester Begins',
    start: '2026-08-31T08:00:00',
    time: '8:00 AM',
    location: 'Campus Wide',
    category: 'academic',
    blurb: 'First day of Fall 2026 undergraduate classes per the academic calendar.',
    image: '250902YouBelongFair-4451.jpg'
  },
  {
    id: 'evt-reading-days-oct',
    title: 'Reading Days — No Classes',
    start: '2026-10-22T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'academic',
    blurb: 'Catch up, study, rest. No classes held.',
    image: '250824IgniteJREdited  (71).jpg',
    allDay: true
  },
  {
    id: 'evt-priority-reg',
    title: 'Priority Registration Opens (Spring)',
    start: '2026-11-02T08:00:00',
    time: '8:00 AM',
    location: 'Registrar',
    category: 'academic',
    blurb: 'Priority registration for Spring 2027 begins. Meet with your advisor early.',
    image: '250915LowerCampus-4892.jpg'
  },
  {
    id: 'evt-withdraw-fall',
    title: 'Last Day to Withdraw',
    start: '2026-11-14T23:59:00',
    time: '11:59 PM',
    location: 'Registrar',
    category: 'academic',
    blurb: 'Final deadline to withdraw from Fall 2026 classes with a "W" on your transcript.',
    image: 'WW_2025_Day1-2605.jpg'
  },
  {
    id: 'evt-board',
    title: 'Board of Directors Meeting',
    start: '2026-11-19T08:00:00',
    time: 'All Day',
    location: 'HSC',
    category: 'academic',
    blurb: 'NU Board of Directors on campus.',
    image: '250828 Convocation Chapel Edited-1593.jpg',
    allDay: true
  },
  {
    id: 'evt-thanksgiving',
    title: 'Thanksgiving Break',
    start: '2026-11-25T00:00:00',
    time: 'All Week',
    location: 'Campus',
    category: 'academic',
    blurb: 'No classes Nov 25-27. University offices closed Nov 26-27.',
    image: '250824IgniteJREdited  (74).jpg',
    allDay: true
  },
  {
    id: 'evt-last-day-fall',
    title: 'Last Day of Fall Classes',
    start: '2026-12-14T23:59:00',
    time: '11:59 PM',
    location: 'Campus',
    category: 'academic',
    blurb: 'Final day of instruction for the Fall 2026 semester.',
    image: '250903ChurchFair-4466.jpg'
  },
  {
    id: 'evt-finals-fall',
    title: 'Fall Final Exams',
    start: '2026-12-15T08:00:00',
    time: 'All Week',
    location: 'Campus',
    category: 'academic',
    blurb: 'Final exams run Dec 15-18. Residence halls close Dec 19.',
    image: 'WW_2025_Day1-3809.jpg',
    allDay: true
  },
  {
    id: 'evt-winter-break',
    title: 'University Closed for Winter',
    start: '2026-12-24T00:00:00',
    time: 'All Week',
    location: 'Campus',
    category: 'academic',
    blurb: 'Offices closed Dec 24 through Jan 1. Have a blessed Christmas.',
    image: '250912 SunnyDay (23).jpg',
    allDay: true
  },
  // ---- Spring 2027 ----
  {
    id: 'evt-spring-movein',
    title: 'Spring Semester Move-In',
    start: '2027-01-10T09:00:00',
    time: 'All Day',
    location: 'Residence Halls',
    category: 'social',
    blurb: 'Residence Halls and Dining Hall open for the Spring 2027 semester.',
    image: '250902YouBelongFair-4403.jpg',
    allDay: true
  },
  {
    id: 'evt-first-day-spring',
    title: 'First Day of Spring Classes',
    start: '2027-01-11T08:00:00',
    time: '8:00 AM',
    location: 'Campus Wide',
    category: 'academic',
    blurb: 'The first day of the Spring 2027 semester.',
    image: '250902YouBelongFair-4422.jpg'
  },
  {
    id: 'evt-mlk',
    title: 'MLK Day — University Closed',
    start: '2027-01-18T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'academic',
    blurb: 'No classes. University offices closed in honor of Dr. Martin Luther King Jr.',
    image: 'WW_2025_Day1-3846.jpg',
    allDay: true
  },
  {
    id: 'evt-presidents-day',
    title: 'Presidents\u2019 Day — University Closed',
    start: '2027-02-15T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'academic',
    blurb: 'No classes. University offices closed.',
    image: '250915LowerCampus-4941.jpg',
    allDay: true
  },
  {
    id: 'evt-spring-break',
    title: 'Spring Break',
    start: '2027-03-08T00:00:00',
    time: 'All Week',
    location: 'Campus',
    category: 'academic',
    blurb: 'No classes Mar 8-12. Travel, rest, serve.',
    image: '250915LowerCampus-4958.jpg',
    allDay: true
  },
  {
    id: 'evt-good-friday',
    title: 'Good Friday — University Closed',
    start: '2027-03-26T00:00:00',
    time: 'All Day',
    location: 'Campus',
    category: 'academic',
    blurb: 'No classes. University offices closed.',
    image: 'WW_2025_Day1-3762.jpg',
    allDay: true
  },
  {
    id: 'evt-baccalaureate',
    title: 'Baccalaureate Chapel',
    start: '2027-04-30T16:00:00',
    time: '4:00 PM',
    location: 'HSC Chapel',
    category: 'chapel',
    blurb: 'A sacred service of blessing and commissioning for the graduating class.',
    image: '250828 Convocation Chapel Edited-3974.jpg'
  },
  {
    id: 'evt-commencement',
    title: 'Commencement',
    start: '2027-05-08T10:00:00',
    time: '10:00 AM',
    location: 'HSC / Campus Wide',
    category: 'academic',
    blurb: 'The Class of 2027 graduates. A day of celebration for the whole NU family.',
    image: '250828WomensSoccer-1742.jpg'
  }
]

// The exported list gets the `date` label computed at module load.
export const EVENTS: EventItem[] = RAW.map(e => {
  const d = new Date(e.start)
  return { ...e, date: formatAbsoluteDate(d) }
})

// Helper: human label like "Today", "Tomorrow", "Sat, Aug 31"
export function whenLabel(iso: string, now: Date = new Date()): string {
  const d = new Date(iso)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days > 1 && days < 7) {
    return d.toLocaleDateString('en-US', { weekday: 'short' })
  }
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

// Days-from-now label like "in 5 days", "in 2 weeks"
export function inLabel(iso: string, now: Date = new Date()): string {
  const d = new Date(iso)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000)
  if (days <= 0)  return 'today'
  if (days === 1) return 'tomorrow'
  if (days < 7)   return `in ${days} days`
  if (days < 14)  return 'in 1 week'
  if (days < 30)  return `in ${Math.round(days / 7)} weeks`
  if (days < 60)  return 'in 1 month'
  return `in ${Math.round(days / 30)} months`
}

function formatAbsoluteDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

// STORIES — only items verifiable on northwestu.edu.
// Dr. Jeremy Johnson's bio is published at /faculty/jeremy-johnson.
// The other three are NU's own institutional descriptions of student
// pathways (academics, campus ministries, life at NU), quoted from
// the relevant official page rather than invented.
export const STORIES: StoryItem[] = [
  {
    id: 's-001',
    name: 'Dr. Jeremy Johnson',
    program: 'President of Northwest University',
    year: '7th President (since Fall 2025)',
    quote: 'I\u2019m a proud product of the Northwest — both the region and Northwest University. I grew up in North Idaho with an early desire to follow Jesus. As high school graduation approached, I chose Northwest because of the meaningful connections I had through mentors who had attended before me.',
    image: '250828WomensSoccer-1763.jpg'
  },
  {
    id: 's-002',
    name: 'Pursuit Magazine',
    program: 'Northwest University',
    year: 'Published for prospective students',
    quote: 'Pursuit is published for high school students to learn about the Northwest University community. It reflects your pursuit of the exceptional, the high level of spiritual growth, and academic excellence that has come to define Northwest University.',
    image: 'WW_2025_Day1-3168.jpg'
  },
  {
    id: 's-003',
    name: 'Christ at the Center',
    program: 'Campus Ministries',
    year: 'Northwest University',
    quote: 'Jesus is at the heart of NU and faith is deeply woven into the student experience. From chapel and worship nights to mission trips and mentoring, you\u2019ll encounter God in powerful ways and learn to live out your faith authentically in every season of life. Worship deeply. Grow spiritually. Live purposefully.',
    image: '250902YouBelongFair-4339.jpg'
  },
  {
    id: 's-004',
    name: 'Life at NU',
    program: 'Undergraduate Admissions',
    year: 'Northwest University',
    quote: 'At Northwest University, we take learning seriously. But we also know that education doesn\u2019t end outside the walls of the classroom. We are formed by the people that surround us and by the experience we live each day. At NU, you\u2019ll discover fellow students who will inspire and encourage you.',
    image: '250902YouBelongFair-4356.jpg'
  },
  {
    id: 's-005',
    name: 'Discover Your Calling',
    program: 'Academic Programs',
    year: 'Northwest University',
    quote: 'Whether you\u2019re called to lead in business, serve in healthcare, innovate in technology, or create through the arts, you\u2019ll find a program that equips you both professionally and spiritually. With a wide variety of career-focused majors and hands-on learning experiences, you can explore your passions, develop your skills, and build a successful career.',
    image: '250903ChurchFair-4457.jpg'
  }
]

export const TEAMS: TeamItem[] = [
  {
    id: 't-vb',
    sport: 'Women\u2019s Volleyball',
    season: 'Fall 2026',
    record: 'Season begins Aug 22',
    nextGame: 'Fri, Aug 22',
    nextOpponent: 'Home opener',
    image: '250920VolleyballGame-2036.jpg'
  },
  {
    id: 't-ms',
    sport: 'Men\u2019s Soccer',
    season: 'Fall 2026',
    record: 'Season begins Aug 20',
    nextGame: 'Wed, Aug 20',
    nextOpponent: 'Home opener',
    image: '250811MensSoccerMediaDay--7.jpg'
  },
  {
    id: 't-ws',
    sport: 'Women\u2019s Soccer',
    season: 'Fall 2026',
    record: 'Season begins Aug 22',
    nextGame: 'Fri, Aug 22',
    nextOpponent: 'Home opener',
    image: '250828WomensSoccer-1763.jpg'
  },
  {
    id: 't-cc',
    sport: 'Cross Country',
    season: 'Fall 2026',
    record: 'Season begins Sep 6',
    nextGame: 'Sat, Sep 6',
    nextOpponent: 'CCC Invite',
    image: '250818CrossCountryMediaDay--6.jpg'
  },
  {
    id: 't-mb',
    sport: 'Men\u2019s Basketball',
    season: 'Winter 2026\u201327',
    record: 'Season begins Nov 1',
    nextGame: 'Sat, Nov 1',
    nextOpponent: 'Home opener',
    image: '251027MensBasketballMediaDay--2.jpg'
  },
  {
    id: 't-wb',
    sport: 'Women\u2019s Basketball',
    season: 'Winter 2026\u201327',
    record: 'Season begins Nov 6',
    nextGame: 'Fri, Nov 6',
    nextOpponent: 'Home opener',
    image: '251027WomensBasketballMediaDay-6422.jpg'
  }
]

export const CLUBS: ClubItem[] = [
  // === STUDENT ORGANIZATIONS (faculty-recognized leadership) ===
  { id: 'c-001', name: 'Associated Students of NU', category: 'Leadership', members: 32, meeting: 'Weekly',   blurb: 'ASNU. The student government body. Listening, advocating, and bringing positive change to NU.', image: 'club-logos/club-asnu.jpeg' },
  { id: 'c-002', name: 'Campus Ministries',          category: 'Faith',      members: 24, meeting: 'Weekly',   blurb: 'Chapel, convocation, and student-led worship across the campus.', image: 'club-logos/club-campus-ministries.jpeg' },
  { id: 'c-003', name: 'Honors Program',            category: 'Academic',   members: 40, meeting: 'Monthly',  blurb: 'The students of the Northwest University Honors program.', image: 'club-logos/club-honors-program.png' },
  { id: 'c-004', name: 'Mosaic',                    category: 'Leadership', members: 28, meeting: 'Monthly',  blurb: 'A multicultural student organization celebrating the diversity of the NU community.', image: 'club-logos/club-mosaic.png' },
  { id: 'c-005', name: 'Student Activities Board',  category: 'Leadership', members: 30, meeting: 'Weekly',   blurb: 'SAB. Building an inclusive, engaging community through campus events.', image: 'club-logos/club-sab.png' },

  // === STUDENT CLUBS ===
  { id: 'c-101', name: 'Blue Crew',                 category: 'Athletics',  members: 60, meeting: 'Game Days', blurb: 'Cheering on Northwest athletics. Stand up. Get loud. NU.', image: 'club-logos/club-blue-crew.jpeg' },
  { id: 'c-102', name: 'Club Pong',                 category: 'Athletics',  members: 18, meeting: 'Weekly',   blurb: 'To play and teach ping pong.', image: 'club-logos/club-pong.jpeg' },
  { id: 'c-103', name: 'Dancing for Jesus Club',    category: 'Faith',      members: 22, meeting: 'Weekly',   blurb: 'Christian fellowship through the intentional development of coordinated dancing.', image: 'club-logos/club-dancing-for-jesus.jpeg' },
  { id: 'c-104', name: 'Dunamis Pockets',           category: 'Faith',      members: 14, meeting: 'Weekly',   blurb: 'A wave of healing, transformation, and renewed faith for students hungry for more of God.', image: 'club-logos/club-dunamis-pockets.png' },
  { id: 'c-105', name: 'End Scene Improv',          category: 'Arts',       members: 24, meeting: 'Weekly',   blurb: 'Laughter, community, and entertainment via improv comedy.', image: 'club-logos/club-end-scene-improv.png' },
  { id: 'c-106', name: 'Entrepreneurship Club',     category: 'Business',   members: 26, meeting: 'Bi-weekly',blurb: 'Cultivating leaders and change-makers. Spiritual and professional development for future entrepreneurs.', image: 'club-logos/club-entrepreneurship.png' },
  { id: 'c-107', name: 'Film Club',                 category: 'Arts',       members: 18, meeting: 'Bi-weekly',blurb: 'A community that comes together to share in a love of films and cinema.', image: 'club-logos/club-film.jpeg' },
  { id: 'c-108', name: 'Imani Student Group',       category: 'Cultural',   members: 18, meeting: 'Monthly',  blurb: 'Celebrating and sharing Black culture with everyone at Northwest.', image: 'club-logos/club-imani.jpeg' },
  { id: 'c-109', name: 'International Student Club', category: 'Cultural',   members: 36, meeting: 'Weekly',   blurb: 'Building community between international and domestic students through life groups and excursions.', image: 'club-logos/club-international.jpeg' },
  { id: 'c-110', name: 'KPop Club',                 category: 'Arts',       members: 28, meeting: 'Weekly',   blurb: 'A community where everyone is welcome to enjoy K-pop, music, and dance together.', image: 'club-logos/club-kpop.jpeg' },
  { id: 'c-111', name: 'Lego Club',                 category: 'General',    members: 22, meeting: 'Bi-weekly',blurb: 'Building a strong community, piece by piece.', image: 'club-logos/club-lego.jpeg' },
  { id: 'c-112', name: 'Lokahi',                    category: 'Cultural',   members: 16, meeting: 'Monthly',  blurb: 'An inclusive multicultural fellowship. The exchange of cultures, customs, and education.', image: 'club-logos/club-lokahi.png' },
  { id: 'c-113', name: 'NU Gaming Club',            category: 'General',    members: 30, meeting: 'Weekly',   blurb: 'A Jesus-first community for esports and gaming. Fellowship, humor, and competition.', image: 'club-logos/club-gaming.png' },
  { id: 'c-114', name: 'NU Science Society',         category: 'Academic',   members: 22, meeting: 'Bi-weekly',blurb: 'NUSS. A supportive community to explore science together through hands-on experiences.', image: 'club-logos/club-science-society.jpeg' },
  { id: 'c-115', name: 'Pickleball Club',           category: 'Athletics',  members: 30, meeting: 'Weekly',   blurb: 'A welcoming, uplifting community for the fastest-growing sport in America.', image: 'club-logos/club-pickleball.jpeg' },
  { id: 'c-116', name: 'Poetry Club',               category: 'Arts',       members: 20, meeting: 'Bi-weekly',blurb: 'Cultivating community by celebrating and discovering a deep appreciation for poetry.', image: 'club-logos/club-poetry.png' },
  { id: 'c-117', name: 'Sigma Tau Delta',           category: 'Academic',   members: 18, meeting: 'Monthly',  blurb: 'The International English Honor Society. Celebrating language and the humanities.', image: 'club-logos/club-sigma-tau-delta.jpeg' },
  { id: 'c-118', name: 'Vida',                      category: 'Cultural',   members: 16, meeting: 'Monthly',  blurb: 'An inclusive multicultural fellowship around Hispanic culture, history, and community.', image: 'club-logos/club-vida.png' }
]

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'p-cast',
    college: 'College of Arts, Sciences, and Technology',
    programs: ['Biology', 'English', 'Communication and Media Studies', 'Exercise Science', 'Interdisciplinary Studies'],
    tagline: 'Liberal arts core and career-focused majors grounded in a biblical worldview.',
    image: '251004FamilyWeekend-5232.jpg'
  },
  {
    id: 'p-com',
    college: 'College of Ministry',
    programs: ['Biblical and Theological Studies', 'Intercultural Studies and Missions', 'Pastoral Ministries', 'Worship and Music Studies', 'Youth, Children, and Family Ministries'],
    tagline: 'Forming leaders for ministry through biblical faithfulness and Spirit-filled service.',
    image: '251001 SavedByTheBagel Edited_7958.jpg'
  },
  {
    id: 'p-bus',
    college: 'School of Business',
    programs: ['Business Administration', 'Management', 'Marketing', 'MBA', 'MS Information Technology Management'],
    tagline: 'Ethics-first business and IT education for service and leadership.',
    image: '251004FamilyWeekend-5175.jpg'
  },
  {
    id: 'p-nur',
    college: 'School of Nursing',
    programs: ['Prelicensure Nursing (BSN)'],
    tagline: 'A nursing program built on caring for the whole person.',
    image: '251004FamilyWeekend-5261.jpg'
  },
  {
    id: 'p-pa',
    college: 'School of PA Medicine',
    programs: ['MS Physician Assistant Studies'],
    tagline: 'Training physician assistants in whole-person care.',
    image: '250912 SunnyDay (32).jpg'
  },
  {
    id: 'p-sbs',
    college: 'College of Social and Behavioral Sciences',
    programs: ['Psychology', 'MA Clinical Mental Health Counseling', 'PsyD Counseling Psychology'],
    tagline: 'Psychology and counseling programs that equip you to serve people well.',
    image: '250902YouBelongFair-4451.jpg'
  },
  {
    id: 'p-cre',
    college: 'Creatio Center for Technology, Media, and Design',
    programs: ['Computer Science', 'Film Production', 'Human-Centered Design', 'Music Production', 'Visual Design'],
    tagline: 'Where designers, coders, and makers sharpen their craft.',
    image: '251004FamilyWeekend-5284.jpg'
  }
]
