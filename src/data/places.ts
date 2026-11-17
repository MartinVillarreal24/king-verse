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
      es: 'Una redada deja varios muertos, entre ellos el capitán Pauly Russo.',
      en: 'A raid leaves several dead, Captain Pauly Russo among them.',
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
  // 1988–89: IT (2017). Same place, same position across eras.
  {
    id: 'storm-drain',
    cycleId: '1988',
    name: { es: 'La alcantarilla de Georgie', en: 'The storm drain' },
    description: {
      es: 'Bajo la lluvia, Georgie pierde aquí el barco de papel que le hizo Bill y se encuentra con Pennywise.',
      en: 'In the rain, Georgie loses the paper boat Bill made him here and meets Pennywise.',
    },
    x: 122,
    y: 134,
    sourceIds: ['collider-it-timeline', 'variety-it-review'],
  },
  {
    id: 'kissing-bridge',
    cycleId: '1988',
    name: { es: 'Puente de los Besos', en: 'The Kissing Bridge' },
    description: {
      es: 'Henry Bowers empieza a grabar su nombre en el cuerpo de Ben, que escapa hacia los Barrens.',
      en: 'Henry Bowers starts carving his name into Ben, who escapes to the Barrens.',
    },
    x: 186,
    y: 120,
    sourceIds: ['collider-it-timeline'],
  },
  {
    id: 'barrens',
    cycleId: '1988',
    name: { es: 'Los Barrens', en: 'The Barrens' },
    description: {
      es: 'Los Perdedores salvan a Mike de la pandilla de Bowers con una guerra de piedras y, al final, sellan aquí su pacto de sangre.',
      en: 'The Losers save Mike from the Bowers gang with a rock war and, at the end, seal their blood oath here.',
    },
    x: 240,
    y: 152,
    sourceIds: ['collider-it-timeline', 'collider-it-ending'],
  },
  {
    id: 'quarry',
    cycleId: '1988',
    name: { es: 'La cantera', en: 'The quarry' },
    description: {
      es: 'Los chicos nadan aquí y Ben les cuenta la historia oscura de Derry.',
      en: 'The kids swim here and Ben tells them about Derry’s dark history.',
    },
    x: 70,
    y: 186,
    sourceIds: ['collider-it-timeline'],
  },
  {
    id: 'neibolt',
    cycleId: '1988',
    name: { es: 'Calle Neibolt 29', en: '29 Neibolt Street' },
    description: {
      es: 'Eddie ve aquí al leproso; en la primera visita se rompe el brazo y Bev le clava un atizador a Pennywise, y en agosto bajan por su pozo.',
      en: 'Eddie sees the leper here; on the first visit he breaks his arm and Bev drives a fire poker into Pennywise, and in August they climb down its well.',
    },
    x: 126,
    y: 178,
    sourceIds: ['collider-it-timeline', 'collider-it-ending'],
  },
  {
    id: 'library',
    cycleId: '1988',
    name: { es: 'La biblioteca', en: 'The library' },
    description: {
      es: 'Ben investiga aquí el pasado oscuro de Derry.',
      en: 'Ben researches Derry’s dark past here.',
    },
    x: 160,
    y: 106,
    sourceIds: ['collider-it-timeline'],
  },
  {
    id: 'cistern',
    cycleId: '1988',
    name: { es: 'La cisterna', en: 'The cistern' },
    description: {
      es: 'Bajo las cloacas, Ben despierta a Bev de las luces muertas con un beso y los Perdedores vencen a Pennywise.',
      en: 'Under the sewers, Ben wakes Bev from the deadlights with a kiss and the Losers beat Pennywise.',
    },
    x: 150,
    y: 202,
    sourceIds: ['collider-it-timeline', 'collider-it-ending'],
  },
  // 2016: IT Chapter Two (2019).
  {
    id: 'kissing-bridge',
    cycleId: '2016',
    name: { es: 'Puente de los Besos y Canal Days', en: 'Kissing Bridge and Canal Days' },
    description: {
      es: 'Tras el festival, arrojan a Adrian Mellon desde el puente; al final, Richie graba otra vez «R + E» en él.',
      en: 'After the festival, Adrian Mellon is thrown off the bridge; at the end, Richie re-carves "R + E" on it.',
    },
    x: 186,
    y: 120,
    sourceIds: ['collider-it-timeline', 'time-it2-ending'],
  },
  {
    id: 'jade',
    cycleId: '2016',
    name: { es: 'Jade of the Orient', en: 'Jade of the Orient' },
    description: {
      es: 'En la cena de reencuentro vuelven los recuerdos y salen criaturas de las galletas de la fortuna.',
      en: 'At the reunion dinner the memories return and creatures burst out of the fortune cookies.',
    },
    x: 206,
    y: 98,
    sourceIds: ['collider-it-timeline', 'collider-jade-scene'],
  },
  {
    id: 'library',
    cycleId: '2016',
    name: { es: 'La biblioteca', en: 'The library' },
    description: {
      es: 'Henry apuñala a Eddie, y Richie mata a Henry.',
      en: 'Henry stabs Eddie, and Richie kills Henry.',
    },
    x: 160,
    y: 106,
    sourceIds: ['collider-it-timeline'],
  },
  {
    id: 'fun-house',
    cycleId: '2016',
    name: { es: 'Casa de la risa de la feria', en: 'Carnival fun house' },
    description: {
      es: 'Pennywise mata aquí a un niño, Dean.',
      en: 'Pennywise kills a boy, Dean, here.',
    },
    x: 236,
    y: 104,
    sourceIds: ['collider-it-timeline', 'time-it2-ending'],
  },
  {
    id: 'neibolt',
    cycleId: '2016',
    name: { es: 'Casa Neibolt y el cráter de It', en: 'Neibolt house and It’s crash site' },
    description: {
      es: 'Bajo la casa, donde cayó It, el Ritual de Chüd fracasa, los Perdedores lo vencen y la cueva se derrumba con el cuerpo de Eddie.',
      en: 'Under the house, where It crashed, the Ritual of Chüd fails, the Losers defeat It and the cave collapses with Eddie’s body inside.',
    },
    x: 126,
    y: 178,
    sourceIds: ['collider-it-timeline', 'time-it2-ending'],
  },
  {
    id: 'quarry',
    cycleId: '2016',
    name: { es: 'La cantera', en: 'The quarry' },
    description: {
      es: 'Tras vencer a It, los Perdedores saltan a la cantera.',
      en: 'After defeating It, the Losers jump into the quarry.',
    },
    x: 70,
    y: 186,
    sourceIds: ['time-it2-ending'],
  },
];

/** Places of one cycle, in map order. */
export const placesOf = (cycleId: string): Place[] => places.filter((p) => p.cycleId === cycleId);
