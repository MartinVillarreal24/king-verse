// The 27-year cycles as the screen tells them (Welcome to Derry and the films), in story order.
// Never use the novel's years and never add cycles after 2016 (see BRIEF.md).
import type { Locale } from '../i18n/ui';

/** One sentence of body text in both locales, followed by its numbered notes. */
export interface Sentence {
  text: Record<Locale, string>;
  /** Ids of entries in src/data/sources.ts backing this sentence; every factual sentence cites at least one. */
  cite: string[];
}

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
  /**
   * Original summary of the cycle, full plot including the ending: one or two paragraphs, each a list of sentences
   * shared by both locales so their notes always match. Its notes are numbered after the status notes.
   */
  body?: Sentence[][];
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
    body: [
      [
        {
          text: {
            es: 'En abril de 1962, el mayor Leroy Hanlon llega a la base aérea de Derry, que se prepara para una posible guerra nuclear, mientras unos chicos buscan a Matty Clements, que huyó de casa el invierno anterior.',
            en: 'In April 1962, Major Leroy Hanlon arrives at the Derry air base, which is preparing for a possible nuclear war, while a group of kids searches for Matty Clements, who ran away the winter before.',
          },
          cite: ['sky-derry-e1'],
        },
        {
          text: {
            es: 'En el cine Capitol, Matty aparece en la pantalla y una criatura mata a tres chicos; solo Lilly Bainbridge y Ronnie Grogan sobreviven, y la policía detiene por las muertes a Hank, el padre de Ronnie.',
            en: 'At the Capitol, Matty appears on the screen and a creature kills three kids; only Lilly Bainbridge and Ronnie Grogan survive, and the police arrest Ronnie’s father, Hank, for the deaths.',
          },
          cite: ['sky-derry-e1', 'sky-derry-e2'],
        },
        {
          text: {
            es: 'Con la Operación Precept, el general Shaw busca un «arma» enterrada en Derry para ganar la Guerra Fría y usa el resplandor del aviador Dick Hallorann para encontrarla.',
            en: 'Through Operation Precept, General Shaw hunts for a "weapon" buried in Derry to win the Cold War and uses Airman Dick Hallorann’s shine to find it.',
          },
          cite: ['nerdist-operation-precept'],
        },
        {
          text: {
            es: 'El pueblo es una jaula: los shokopiwah levantaron trece pilares con fragmentos de la estrella caída de It alrededor de los Bosques del Oeste para retenerlo en Derry.',
            en: 'The town is a cage: the Shokopiwah raised thirteen pillars from shards of It’s fallen star around the Western Woods to keep It in Derry.',
          },
          cite: ['cbr-derry-retcons'],
        },
        {
          text: {
            es: 'It tomó la forma de Pennywise de Bob Gray, un payaso real al que conoció en 1908, y la hija de Bob, Ingrid Kersh, está a su servicio.',
            en: 'It took Pennywise’s form from Bob Gray, a real clown it met in 1908, and Bob’s daughter, Ingrid Kersh, serves it.',
          },
          cite: ['variety-derry-credits-scene'],
        },
      ],
      [
        {
          text: {
            es: 'Alertada por Ingrid, que busca despertar a It, una turba encabezada por el destituido jefe de policía Clint Bowers encadena y quema el Black Spot, el club de los aviadores negros, y Pennywise aparece entre las llamas.',
            en: 'Tipped off by Ingrid, who wants to wake It, a mob led by the ousted police chief Clint Bowers chains and burns the Black Spot, the club for Black airmen, and Pennywise appears in the flames.',
          },
          cite: ['collider-derry-e7', 'cbr-derry-retcons'],
        },
        {
          text: {
            es: 'El ejército desentierra un pilar, Shaw lo quema en la base y Leroy descubre el plan: liberar a It y usar el miedo para controlar el país.',
            en: 'The army digs up a pillar, Shaw burns it at the base, and Leroy uncovers the plan: free It and use fear to control the country.',
          },
          cite: ['collider-derry-e7', 'nerdist-operation-precept'],
        },
        {
          text: {
            es: 'Sin ese pilar, Pennywise despierta antes de tiempo, hipnotiza a los niños en un acto escolar y los guía sobre el Penobscot congelado.',
            en: 'Without that pillar, Pennywise wakes early, hypnotises the children at a school assembly and leads them across the frozen Penobscot.',
          },
          cite: ['cbr-derry-retcons', 'ign-derry-finale'],
        },
        {
          text: {
            es: 'Lilly, Ronnie y Marge deben colocar una daga ceremonial junto a un árbol retorcido de la orilla para encerrarlo; el fantasma de Rich los ayuda, Hallorann distrae a Pennywise, los soldados disparan a Taniel y Pennywise mata a Shaw.',
            en: 'Lilly, Ronnie and Marge must set a ceremonial dagger at a gnarled tree on the bank to lock It in; Rich’s ghost helps them, Hallorann distracts Pennywise, soldiers shoot Taniel and Pennywise kills Shaw.',
          },
          cite: ['ign-derry-finale', 'nerdist-operation-precept'],
        },
        {
          text: {
            es: 'Pennywise va tras Marge porque su hijo, Richie Tozier, ayudará a matarlo: It percibe el pasado, el presente y el futuro a la vez.',
            en: 'Pennywise goes after Marge because her son, Richie Tozier, will help kill it: It perceives past, present and future at once.',
          },
          cite: ['polygon-derry-ending'],
        },
        {
          text: {
            es: 'Después, Leroy acepta una baja honrosa y guarda silencio, Hallorann se va a Londres a trabajar como chef de hotel, los Hanlon se quedan con la granja de Rose, y Hank y Ronnie huyen a Canadá.',
            en: 'Afterwards, Leroy takes an honorable discharge and keeps quiet, Hallorann leaves for London to work as a hotel chef, the Hanlons take over Rose’s farm, and Hank and Ronnie flee to Canada.',
          },
          cite: ['nerdist-operation-precept', 'polygon-derry-ending', 'ign-derry-finale'],
        },
        {
          text: {
            es: 'En la escena poscréditos, una Ingrid anciana conoce en Juniper Hill a la joven Beverly Marsh.',
            en: 'In the post-credits scene, an elderly Ingrid meets young Beverly Marsh at Juniper Hill.',
          },
          cite: ['variety-derry-credits-scene', 'ign-derry-finale'],
        },
      ],
    ],
  },
  {
    id: '1988',
    year: '1988–89',
    upcoming: false,
    source: { es: 'IT (2017)', en: 'IT (2017)' },
    status: { es: 'Estrenada el 8 de septiembre de 2017.', en: 'Released on September 8, 2017.' },
    sourceIds: ['variety-it-sequel-date', 'latimes-it-review', 'laweekly-it-chapter-two-review'],
    body: [
      [
        {
          text: {
            es: 'En octubre de 1988, Bill le hace un barco de papel a su hermano Georgie, que lo pierde bajo la lluvia en una alcantarilla donde lo espera Pennywise; su muerte pone en marcha toda la historia.',
            en: 'In October 1988, Bill makes a paper boat for his brother Georgie, who loses it in the rain down a storm drain where Pennywise is waiting; his death sets the whole story in motion.',
          },
          cite: ['collider-it-timeline', 'variety-it-review'],
        },
        {
          text: {
            es: 'Bill, Richie, Eddie y Stanley, a quienes se suman Ben, Mike y Beverly, forman el Club de los Perdedores, acosado por Henry Bowers y su pandilla, en la que está Patrick Hockstetter.',
            en: 'Bill, Richie, Eddie and Stanley, later joined by Ben, Mike and Beverly, form the Losers’ Club, bullied by Henry Bowers and his gang, which includes Patrick Hockstetter.',
          },
          cite: ['variety-it-review', 'collider-it-timeline'],
        },
        {
          text: {
            es: 'En junio de 1989, Henry empieza a grabar su nombre en el cuerpo de Ben en el Puente de los Besos, los chicos nadan en la cantera y Ben les cuenta la historia oscura de Derry que investigó en la biblioteca.',
            en: 'In June 1989, Henry starts carving his name into Ben on the Kissing Bridge, the kids swim in the quarry, and Ben tells them the dark history of Derry he dug up at the library.',
          },
          cite: ['collider-it-timeline'],
        },
        {
          text: {
            es: 'Juntos salvan a Mike de la pandilla de Bowers en los Barrens con una guerra de piedras, y Ben descubre que la casa de la calle Neibolt es el centro de todo.',
            en: 'Together they save Mike from the Bowers gang in the Barrens with a rock war, and Ben works out that the house on Neibolt Street is the center of everything.',
          },
          cite: ['collider-it-timeline'],
        },
        {
          text: {
            es: 'En la primera visita, Eddie se rompe el brazo, Bev le clava un atizador en la cabeza a Pennywise y el grupo se separa.',
            en: 'On the first visit, Eddie breaks his arm, Bev drives a fire poker into Pennywise’s head and the group splits up.',
          },
          cite: ['collider-it-timeline'],
        },
      ],
      [
        {
          text: {
            es: 'En agosto, Henry mata a su padre y Pennywise se lleva a Bev; los demás bajan por el pozo de Neibolt, donde Mike empuja a Henry al fondo.',
            en: 'In August, Henry kills his father and Pennywise takes Bev; the others climb down the Neibolt well, where Mike pushes Henry in.',
          },
          cite: ['collider-it-timeline', 'collider-it-ending'],
        },
        {
          text: {
            es: 'En la cisterna, Ben despierta a Bev de las luces muertas con un beso y los Perdedores vencen a Pennywise, que cae al vacío.',
            en: 'In the cistern, Ben wakes Bev from the deadlights with a kiss and the Losers beat Pennywise, who falls into the void.',
          },
          cite: ['collider-it-timeline', 'collider-it-ending'],
        },
        {
          text: {
            es: 'En los Barrens sellan un pacto de sangre con un trozo de vidrio: volverán si It regresa.',
            en: 'In the Barrens they seal a blood oath with a shard of glass: they will come back if It returns.',
          },
          cite: ['collider-it-timeline', 'collider-it-ending'],
        },
        {
          text: {
            es: 'Bev se va a Portland, Henry aparece arrastrado por el agua en los Barrens y termina internado, Mike se queda en Derry y los demás olvidan.',
            en: 'Bev leaves for Portland, Henry washes up in the Barrens and is committed to an asylum, Mike stays in Derry and the others forget.',
          },
          cite: ['collider-it-timeline', 'collider-it-ending'],
        },
      ],
    ],
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
    body: [
      [
        {
          text: {
            es: 'Tras el festival Canal Days, Adrian Mellon sufre una golpiza en un crimen de odio, lo arrojan desde el Puente de los Besos y Pennywise lo mata.',
            en: 'After the Canal Days festival, Adrian Mellon is beaten in a hate crime, thrown off the Kissing Bridge and killed by Pennywise.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
        {
          text: {
            es: 'Mike, el único que se quedó en Derry, encuentra «Come Home» escrito con sangre y llama a los demás; tras la llamada, Stan se quita la vida.',
            en: 'Mike, the only one who stayed in Derry, finds "Come Home" written in blood and calls the others; after the call, Stan takes his own life.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
        {
          text: {
            es: 'Henry escapa del asilo.',
            en: 'Henry escapes from the asylum.',
          },
          cite: ['collider-it-timeline'],
        },
        {
          text: {
            es: 'En la cena de reencuentro en el Jade of the Orient vuelven los recuerdos, y de las galletas de la fortuna salen criaturas.',
            en: 'At the reunion dinner at Jade of the Orient the memories come back, and creatures burst out of the fortune cookies.',
          },
          cite: ['collider-it-timeline', 'collider-jade-scene'],
        },
        {
          text: {
            es: 'Mike le muestra a Bill una visión del Ritual de Chüd y cada Perdedor busca un objeto de su infancia, mientras Pennywise mata a un niño, Dean, en una casa de la risa.',
            en: 'Mike shows Bill a vision of the Ritual of Chüd and each Loser gathers a token from childhood, while Pennywise kills a boy, Dean, in a fun house.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
        {
          text: {
            es: 'Henry apuñala a Eddie, y Richie mata a Henry en la biblioteca.',
            en: 'Henry stabs Eddie, and Richie kills Henry in the library.',
          },
          cite: ['collider-it-timeline'],
        },
      ],
      [
        {
          text: {
            es: 'Bajo Neibolt el ritual fracasa, porque Mike ocultó que ya había fallado antes, e It se convierte en una araña payaso gigante.',
            en: 'Under Neibolt the ritual fails, because Mike hid that it had failed before, and It becomes a giant spider-clown.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
        {
          text: {
            es: 'Cada Perdedor enfrenta su miedo; Eddie hiere a It para salvar a Richie y recibe una herida mortal.',
            en: 'Each Loser faces a fear; Eddie wounds It to save Richie and is fatally stabbed.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
        {
          text: {
            es: 'Los Perdedores lo hacen sentir pequeño hasta que se encoge, Mike le arranca el corazón y entre todos lo aplastan; la cueva se derrumba con el cuerpo de Eddie dentro.',
            en: 'The Losers make It feel small until it shrinks, Mike tears out its heart and together they crush it; the cave collapses with Eddie’s body inside.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
        {
          text: {
            es: 'Después saltan a la cantera, las cartas de Stan explican su decisión, Bill vuelve a escribir, Richie graba otra vez «R + E» en el Puente de los Besos, Ben y Bev están juntos y Mike se va de Derry; esta vez no olvidan.',
            en: 'Afterwards they jump into the quarry, Stan’s letters explain his choice, Bill writes again, Richie re-carves "R + E" on the Kissing Bridge, Ben and Bev are together and Mike leaves Derry; this time they do not forget.',
          },
          cite: ['collider-it-timeline', 'time-it2-ending'],
        },
      ],
    ],
  },
];
