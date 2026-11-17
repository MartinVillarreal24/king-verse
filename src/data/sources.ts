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

// Ordered by first appearance on the home, so note numbers read 1, 2, 3... down the page.
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
];

/** Note number (1-based) of a source, in bibliography order, so inline notes and the sources page agree. */
export const noteNumber = (id: string): number => {
  const index = sources.findIndex((s) => s.id === id);
  if (index === -1) throw new Error(`Unknown source "${id}" — add it to src/data/sources.ts first.`);
  return index + 1;
};
