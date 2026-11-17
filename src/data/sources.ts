// Bibliography for the whole site. Only real, primary sources (official press releases and credits, King's
// published works), then reputable trade press. Each entry must be verified before it is added; never invent one.
export interface Source {
  /** Anchor id on the sources page: `source-<id>`. */
  id: string;
  /** Author or organisation, e.g. "HBO". */
  author: string;
  title: string;
  /** Publisher or outlet. */
  publisher: string;
  /** Publication date, ISO `YYYY-MM-DD`; omitted when the page does not state it. */
  date?: string;
  url?: string;
  /** Date the URL was last checked, ISO `YYYY-MM-DD`. */
  accessed?: string;
}

// Any order: src/data/citations.ts numbers them by first appearance on the home.
// Verified 2026-11-17: each claim was checked on the fetched page itself.
export const sources: Source[] = [
  {
    id: 'variety-muschietti-three-seasons',
    author: 'Variety',
    title: "'It: Welcome to Derry': Director Andy Muschietti on Killing Off the Kids",
    publisher: 'Variety',
    url: 'https://variety.com/2025/tv/news/it-welcome-to-derry-director-andy-muschietti-kidding-the-kids-1236560839/',
    accessed: '2026-11-17',
  },
  {
    id: 'variety-derry-renewed',
    author: 'Joe Otterson',
    title: "'It: Welcome to Derry' Renewed for Season 2 at HBO",
    publisher: 'Variety',
    date: '2026-08-17',
    url: 'https://variety.com/2026/tv/news/it-welcome-to-derry-renewed-season-2-hbo-1236836194/',
    accessed: '2026-11-17',
  },
  {
    id: 'deadline-derry-renewed',
    author: 'Deadline',
    title: "'It: Welcome To Derry' Renewed For Season 2 By HBO; Brad Caleb Kane Now Sole Showrunner",
    publisher: 'Deadline',
    date: '2026-08-17',
    url: 'https://deadline.com/2026/08/it-welcome-to-derry-renewed-season-2-hbo-1237042942/',
    accessed: '2026-11-17',
  },
  {
    id: 'deadline-derry-schedule',
    author: 'Deadline',
    title: "'IT: Welcome To Derry' Release Rollout: When Do New Episodes Hit HBO Max?",
    publisher: 'Deadline',
    date: '2025-10-27',
    url: 'https://deadline.com/2025/10/it-welcome-to-derry-release-schedule-hbo-max-1236596683/',
    accessed: '2026-11-17',
  },
  {
    id: 'variety-it-sequel-date',
    author: 'Dave McNary',
    title: "'It' Movie Sequel Release Date Set",
    publisher: 'Variety',
    date: '2017-09-25',
    url: 'https://variety.com/2017/film/news/it-movie-sequel-release-date-1202570309/',
    accessed: '2026-11-17',
  },
  {
    id: 'latimes-it-review',
    author: 'Jen Yamato',
    title: "'It' delivers nightmarish visuals but misses the true horror of Stephen King's classic",
    publisher: 'Los Angeles Times',
    date: '2017-09-07',
    url: 'https://www.latimes.com/entertainment/movies/la-et-mn-it-review-20170907-story.html',
    accessed: '2026-11-17',
  },
  {
    id: 'laweekly-it-chapter-two-review',
    author: 'Michael Cooper',
    title: 'Review: Can IT Chapter 2 Creep Into our Contemporary Consciousness?',
    publisher: 'LA Weekly',
    date: '2019-09-06',
    url: 'https://www.laweekly.com/review-can-it-chapter-2-creep-into-our-contemporary-consciousness/',
    accessed: '2026-11-17',
  },
  {
    id: 'sky-derry-e1',
    author: 'Sky',
    title: "IT: Welcome to Derry - Season 1 Episode 1 'The Pilot' explained",
    publisher: 'Sky',
    url: 'https://www.sky.com/watch/it-welcome-to-derry/episode-1',
    accessed: '2026-11-17',
  },
  {
    id: 'nerdist-operation-precept',
    author: 'Tai Gooden',
    title: 'The Military and Operation Precept in WELCOME TO DERRY, Explained',
    publisher: 'Nerdist',
    date: '2025-10-31',
    url: 'https://nerdist.com/article/the-military-and-operation-precept-in-welcome-to-derry-explained/',
    accessed: '2026-11-17',
  },
  {
    id: 'cbr-derry-retcons',
    author: 'Amy Watkins',
    title: "6 Welcome to Derry Season 1 Retcons That Broke Stephen King's IT Lore",
    publisher: 'CBR',
    date: '2025-12-15',
    url: 'https://www.cbr.com/welcome-to-derry-retcons-broke-stephen-king-it-lore/',
    accessed: '2026-11-17',
  },
  {
    id: 'variety-derry-credits-scene',
    author: 'Andrew McGowan',
    title: "'It: Welcome to Derry' Finale Credits Scene: Sophia Lillis as Beverly",
    publisher: 'Variety',
    date: '2025-12-15',
    url: 'https://variety.com/2025/tv/news/it-welcome-to-derry-finale-credits-scene-sophia-lillis-beverly-1236607044/',
    accessed: '2026-11-17',
  },
  {
    id: 'collider-derry-e7',
    author: 'Shawn Van Horn',
    title: "'IT: Welcome to Derry' Episode 7 Recap: Prepare To Have Your Heart Ripped Out by the Season's Scariest, Saddest Hour",
    publisher: 'Collider',
    date: '2025-12-08',
    url: 'https://collider.com/it-welcome-to-derry-episode-7-recap-hbo-pennywise/',
    accessed: '2026-11-17',
  },
  {
    id: 'ign-derry-finale',
    author: 'Tom Jorgensen',
    title: 'It: Welcome to Derry Season Finale Review',
    publisher: 'IGN Middle East',
    date: '2025-12-15',
    url: 'https://me.ign.com/en/it-welcome-to-derry-season-finale/239104/review/it-welcome-to-derry-season-finale-review',
    accessed: '2026-11-17',
  },
];
