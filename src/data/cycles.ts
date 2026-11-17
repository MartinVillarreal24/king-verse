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
    sourceIds: [],
  },
  {
    id: '1935',
    year: '1935',
    upcoming: true,
    source: { es: 'Welcome to Derry, temporada 2', en: 'Welcome to Derry, season 2' },
    status: { es: 'Renovada por HBO.', en: 'Renewed by HBO.' },
    sourceIds: [],
  },
  {
    id: '1962',
    year: '1962',
    upcoming: false,
    source: { es: 'Welcome to Derry, temporada 1', en: 'Welcome to Derry, season 1' },
    status: { es: 'Estrenada en HBO.', en: 'Aired on HBO.' },
    sourceIds: [],
  },
  {
    id: '1988',
    year: '1988–89',
    upcoming: false,
    source: { es: 'IT (2017)', en: 'IT (2017)' },
    status: { es: 'Película estrenada.', en: 'Released film.' },
    sourceIds: [],
  },
  {
    id: '2016',
    year: '2016',
    upcoming: false,
    source: { es: 'IT: Capítulo 2 (2019)', en: 'IT Chapter Two (2019)' },
    status: { es: 'Película estrenada; aquí termina el ciclo.', en: 'Released film; the cycle ends here.' },
    sourceIds: [],
  },
];
