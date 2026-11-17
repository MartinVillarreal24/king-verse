// Derry places per cycle, drawn as numbered points on that era's mini-map (src/components/DerryMap.astro).
// Only places seen on screen and backed by a verified source. Positions are illustrative, not real geography:
// the map is not to scale and no real map position is claimed.
import type { Locale } from '../i18n/ui';

export interface Place {
  /** Anchor id: `place-<cycleId>-<id>`. */
  id: string;
  /** Id of the cycle in src/data/cycles.ts. */
  cycleId: string;
  name: Record<Locale, string>;
  /** One original line on what happens there. */
  description: Record<Locale, string>;
  /** Position in the map viewBox (0 0 320 220). */
  x: number;
  y: number;
  /** Ids of entries in src/data/sources.ts backing the description (numbered inline notes). */
  sourceIds: string[];
}

// Listed in story order; the list order is the point number on the map.
export const places: Place[] = [
  {
    id: 'capitol',
    cycleId: '1962',
    name: { es: 'Cine Capitol', en: 'Capitol Theater' },
    description: {
      es: 'Durante una función de The Music Man, Matty aparece en la pantalla y una criatura mata a tres chicos; Lilly y Ronnie sobreviven.',
      en: 'During a screening of The Music Man, Matty appears on screen and a creature kills three kids; Lilly and Ronnie survive.',
    },
    x: 170,
    y: 104,
    sourceIds: ['sky-derry-e1'],
  },
  {
    id: 'air-base',
    cycleId: '1962',
    name: { es: 'Base de la Fuerza Aérea de Derry', en: 'Derry Air Force Base' },
    description: {
      es: 'La base se prepara para una posible guerra nuclear y guarda un búnker de «Proyectos Especiales»; allí el general Shaw quema un pilar desenterrado.',
      en: 'The base prepares for a possible nuclear war and holds a "Special Projects" bunker; there General Shaw burns a dug-up pillar.',
    },
    x: 214,
    y: 186,
    sourceIds: ['sky-derry-e1', 'collider-derry-e7'],
  },
  {
    id: 'juniper-hill',
    cycleId: '1962',
    name: { es: 'Hospital Juniper Hill', en: 'Juniper Hill' },
    description: {
      es: 'Hospital psiquiátrico donde estuvo internada Lilly; al final, una Ingrid anciana conoce allí a la joven Beverly Marsh.',
      en: 'The psychiatric hospital where Lilly was a patient; at the end, an elderly Ingrid meets young Beverly Marsh there.',
    },
    x: 232,
    y: 36,
    sourceIds: ['sky-derry-e1', 'variety-derry-credits-scene'],
  },
  {
    id: 'well-house',
    cycleId: '1962',
    name: { es: 'Well House', en: 'The Well House' },
    description: {
      es: 'Una redada militar deja varios muertos, entre ellos el capitán Pauly Russo.',
      en: 'A military raid leaves several dead, Captain Pauly Russo among them.',
    },
    x: 112,
    y: 66,
    sourceIds: ['nerdist-operation-precept'],
  },
  {
    id: 'black-spot',
    cycleId: '1962',
    name: { es: 'The Black Spot', en: 'The Black Spot' },
    description: {
      es: 'El club de los aviadores negros: una turba lo cierra con cadenas y le prende fuego, y Pennywise aparece entre las llamas.',
      en: 'The club for Black airmen: a mob chains it shut and sets it on fire, and Pennywise appears in the flames.',
    },
    x: 252,
    y: 160,
    sourceIds: ['collider-derry-e7'],
  },
  {
    id: 'western-woods',
    cycleId: '1962',
    name: { es: 'Bosques del Oeste', en: 'Western Woods' },
    description: {
      es: 'Los shokopiwah rodearon el bosque con trece pilares hechos de la estrella caída de It: una jaula que lo retiene en Derry.',
      en: "The Shokopiwah ringed the woods with thirteen pillars made from It's fallen star: a cage that keeps It in Derry.",
    },
    x: 48,
    y: 108,
    sourceIds: ['cbr-derry-retcons'],
  },
  {
    id: 'penobscot',
    cycleId: '1962',
    name: { es: 'Río Penobscot', en: 'Penobscot River' },
    description: {
      es: 'En el final, Pennywise guía a los niños sobre el río congelado; Lilly, Ronnie y Marge deben llevar una daga ceremonial a un árbol retorcido de la orilla para encerrarlo.',
      en: 'In the finale, Pennywise leads the children across the frozen river; Lilly, Ronnie and Marge must set a ceremonial dagger at a gnarled tree on the bank to lock It in.',
    },
    x: 286,
    y: 84,
    sourceIds: ['ign-derry-finale'],
  },
];

/** Places of one cycle, in map order. */
export const placesOf = (cycleId: string): Place[] => places.filter((p) => p.cycleId === cycleId);
