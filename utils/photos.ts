import type { Photo, Category } from '~/types'

// Curated, hand-picked gallery: which photos to use where.
// Files copied to /public/images/ — names below must match exactly.

export const FEATURED_PHOTOS: Photo[] = [
  { src: '250903ChurchFair-4473.jpg',          name: 'First Day of Class',     category: 'student-life' },
  { src: '250903ChurchFair-4476.jpg',          name: 'Welcome to NU',    category: 'student-life' },
  { src: '250903ChurchFair-4488.jpg', name: 'Leadership Fair',    category: 'student-life' },
  { src: '250903ChurchFair-4489.jpg', name: 'Find Your People',   category: 'student-life' },
  { src: '250903ChurchFair-4491.jpg', name: 'Clubs & Orgs',       category: 'student-life' },
  { src: '250821 StudentLeadershipFairEdited5518.jpg', name: 'Get Involved',       category: 'student-life' },
  { src: '250903ChurchFair-4500.jpg', name: 'Convocation',         category: 'faith' },
  { src: '250903ChurchFair-4507.jpg', name: 'Worship Together',    category: 'faith' },
  { src: '250828 Convocation Chapel Edited-3985.jpg', name: 'Chapel',              category: 'faith' },
  { src: '250828 Convocation Chapel Edited-3987.jpg', name: 'Gathering',           category: 'faith' },
  { src: '250903ChurchFair-4516.jpg', name: 'United',              category: 'faith' },
  { src: '250912 SunnyDay (32).jpg', name: 'Pursuit',             category: 'faith' },
  { src: '250824IgniteJREdited  (2).jpg',           name: 'Ignite',                category: 'faith' },
  { src: '250912 SunnyDay (38).jpg',          name: 'Ignite Worship',         category: 'faith' },
  { src: '250912 SunnyDay (44).jpg',          name: 'Ignite Night',           category: 'faith' },
  { src: '250824IgniteJREdited  (34).jpg',          name: 'Ignite Prayer',          category: 'faith' },
  { src: '250811MensSoccerMediaDay--7.jpg',         name: 'Men\u2019s Soccer',       category: 'athletics' },
  { src: '250912 SunnyDay (6).jpg',       name: 'Eagles',                  category: 'athletics' },
  { src: '250912 SunnyDay (7).jpg',       name: 'Volleyball',              category: 'athletics' },
  { src: '250811VolleyballMediaDay-1207.jpg',       name: 'Spike',                   category: 'athletics' },
  { src: '250811VolleyballMediaDay-1213.jpg',       name: 'Block',                   category: 'athletics' },
  { src: '250811VolleyballMediaDay-1253.jpg',       name: 'Set',                     category: 'athletics' },
  { src: '250912 SunnyDay (9).jpg',       name: 'Cross Country',           category: 'athletics' },
  { src: '250818CrossCountryMediaDay--6.jpg',       name: 'Cross Country',            category: 'athletics' },
  { src: '250826VolleyballTailgateEdited (6).jpg', name: 'Tailgate',                 category: 'events' },
  { src: '250826VolleyballTailgateEdited (11).jpg',name: 'Game Day',                 category: 'events' },
  { src: '250826VolleyballTailgateEdited (17).jpg',name: 'Eagles Nation',            category: 'events' },
  { src: '250826VolleyballTailgateEdited (34).jpg',name: 'Pre-Game',                 category: 'events' },
  { src: '250826VolleyballTailgateEdited (44).jpg',name: 'Cheer',                    category: 'events' },
  { src: '250915LowerCampus-4898.jpg',             name: 'Bridal Trails',           category: 'student-life' },
  { src: '250915LowerCampus-4926.jpg',             name: 'Traditions',              category: 'student-life' },
  { src: '250903ChurchFair-4482.jpg',               name: 'Church Fair',             category: 'community' },
  { src: '250915LowerCampus-4946.jpg',                   name: 'The Way',                 category: 'faith' },
  { src: '250918BridalTrails-5034.jpg',                 name: 'The Way Service',         category: 'faith' },
  { src: '251106PeabodConcert-7092.jpg',            name: 'PEABOD Concert',         category: 'events' },
  { src: '251106PeabodConcert-7127.jpg',            name: 'Music at NU',             category: 'events' },
  { src: '251027MensBasketballMediaDay--2.jpg', name: 'Men\u2019s Basketball', category: 'athletics' },
  { src: '250918BridalTrails-5073.jpg',                   name: 'Womens Worship',          category: 'faith' },
  { src: '250920VolleyballGame-2010.jpg',                   name: 'Worship Conference',      category: 'faith' },
  { src: '250920VolleyballGame-2036.jpg',                   name: 'Conference',              category: 'faith' },
  { src: '250920VolleyballGame-2086.jpg',                   name: 'Worship',                 category: 'faith' },
  { src: '250920VolleyballGame-2175.jpg',                   name: 'Praise',                  category: 'faith' },
  { src: 'WW_2025_Day1-3617.jpg',                   name: 'Gather',                  category: 'faith' },
  { src: 'WW_2025_Day1-3640.jpg',                   name: 'Sing',                    category: 'faith' },
  { src: 'WW_2025_Day1-3724.jpg',                   name: 'Lift',                    category: 'faith' },
  { src: 'WW_2025_Day1-3759.jpg',                   name: 'Belong',                  category: 'faith' },
  { src: '250920VolleyballGame-2212.jpg',                   name: 'Family',                  category: 'community' },
  { src: 'WW_2025_Day1-3773.jpg',                   name: 'Friends',                 category: 'community' },
  { src: 'WW_2025_Day1-3785.jpg',                   name: 'Joy',                     category: 'community' },
  { src: '250920VolleyballGame-2271.jpg',                   name: 'Together',                category: 'community' },
  { src: 'WW_2025_Day1-3822.jpg',                   name: 'Home',                    category: 'community' },
  { src: '250920VolleyballGame-2386.jpg',                   name: 'Northwest',               category: 'community' },
  { src: 'WW_2025_Day1-3875.jpg',                   name: 'Campus',                  category: 'campus' },
  { src: 'WW_2025_Day1-3888.jpg',                   name: 'On Campus',             category: 'campus' },
  { src: 'WW_2025_Day1-3903.jpg',                   name: 'Daily Life',              category: 'campus' },
  { src: '250921SOEVisionLaunch_8035.jpg',                   name: 'Beautiful',               category: 'campus' },
  { src: 'WW_2025_Day1-3912.jpg',                   name: 'Kirkland',                category: 'campus' },
]

// Buckets used by the idle slideshow & home map.
export const PHOTOS_BY_CATEGORY: Record<Category, Photo[]> = FEATURED_PHOTOS.reduce(
  (acc, p) => {
    (acc[p.category] ||= []).push(p)
    return acc
  },
  {} as Record<Category, Photo[]>
)
