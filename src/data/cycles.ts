// The 27-year cycles as the screen tells them (Welcome to Derry and the films), in story order.
// Never use the novel's years and never add cycles after 2016 (see BRIEF.md).
import type { Locale } from '../i18n/ui';

export interface Cycle {
  /** Anchor id: `cycle-<id>`. */
  id: string;
  /** Displayed year or span. */
  year: string;
  /** Not on screen yet: drawn hollow and marked as upcoming. */
  upcoming: boolean;
  source: Record<Locale, string>;
  status: Record<Locale, string>;
  /** Ids of entries in src/data/sources.ts backing the facts of this cycle (numbered inline notes). */
  sourceIds: string[];
}

export const cycles: Cycle[] = [
  {
    id: '1908',
    year: '1908',
    upcoming: true,
    source: { es: 'Welcome to Derry, temporada 3', en: 'Welcome to Derry, season 3' },
    status: { es: 'Planeada por sus creadores; aún no encargada.', en: 'Planned by its creators; not ordered yet.' },
    sourceIds: ['variety-muschietti-three-seasons', 'variety-derry-renewed'],
  },
  {
    id: '1935',
    year: '1935',
    upcoming: true,
    source: { es: 'Welcome to Derry, temporada 2', en: 'Welcome to Derry, season 2' },
    status: { es: 'Renovada por HBO el 17 de agosto de 2026.', en: 'Renewed by HBO on August 17, 2026.' },
    sourceIds: ['variety-derry-renewed', 'deadline-derry-renewed'],
  },
  {
    id: '1962',
    year: '1962',
    upcoming: false,
    source: { es: 'Welcome to Derry, temporada 1', en: 'Welcome to Derry, season 1' },
    status: {
      es: 'Estrenada el 26 de octubre de 2025; final el 14 de diciembre de 2025.',
      en: 'Premiered on October 26, 2025; finale on December 14, 2025.',
    },
    sourceIds: ['deadline-derry-schedule', 'variety-derry-renewed'],
  },
  {
    id: '1988',
    year: '1988–89',
    upcoming: false,
    source: { es: 'IT (2017)', en: 'IT (2017)' },
    status: { es: 'Estrenada el 8 de septiembre de 2017.', en: 'Released on September 8, 2017.' },
    sourceIds: ['variety-it-sequel-date', 'latimes-it-review', 'laweekly-it-chapter-two-review'],
  },
  {
    id: '2016',
    year: '2016',
    upcoming: false,
    source: { es: 'IT: Capítulo 2 (2019)', en: 'IT Chapter Two (2019)' },
    status: {
      es: 'Estrenada el 6 de septiembre de 2019; aquí termina el ciclo.',
      en: 'Released on September 6, 2019; the cycle ends here.',
    },
    sourceIds: ['variety-it-sequel-date', 'laweekly-it-chapter-two-review'],
  },
];
