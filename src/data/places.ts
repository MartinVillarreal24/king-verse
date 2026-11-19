// Derry places per cycle, drawn as numbered points on that era's mini-map (src/components/DerryMap.astro).
// Only places seen on screen and backed by a verified source. Positions are illustrative, not real geography:
// the map is not to scale and no real map position is claimed.
// The full map page (src/components/MapPage.astro) draws every place here; the home's mini-maps only the ones not marked
// `home: false`. A place that keeps its id in another era is the same place on screen and keeps its spot.
import type { Locale } from '../i18n/ui';
import type { Sentence } from './cycles';

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
  /** Map page: the description as cited sentences (defaults to the description with all its sources). */
  body?: Sentence[];
  /** Map page: characters seen there (ids of src/data/characters.ts) and the sources that back it. */
  people?: { ids: string[]; cite: string[] };
  /** False for places drawn only on the map page, not on the home's mini-map. */
  home?: false;
}

const s = (es: string, en: string, ...cite: string[]): Sentence => ({ text: { es, en }, cite });
const who = (ids: string[], ...cite: string[]) => ({ ids, cite });
/** A place drawn only on the map page, written as cited sentences. */
const mapOnly = (place: Omit<Place, 'description' | 'sourceIds' | 'home' | 'body'>, ...body: Sentence[]): Place => ({
  ...place,
  description: { es: body.map((b) => b.text.es).join(' '), en: body.map((b) => b.text.en).join(' ') },
  sourceIds: [...new Set(body.flatMap((b) => b.cite))],
  body,
  home: false,
});

const COL = 'collider-it-timeline';
const sky = (n: number) => `sky-derry-e${n}`;

// Listed in story order; the list order is the point number on the map.
// Places that appear in more than one era share one position, so they never drift between maps.
const spot = {
  kissingBridge: { x: 186, y: 120 },
  quarry: { x: 70, y: 186 },
  neibolt: { x: 126, y: 178 },
  library: { x: 160, y: 106 },
  club: { x: 220, y: 140 },
  denbrough: { x: 104, y: 120 },
  farm: { x: 40, y: 30 },
  marsh: { x: 140, y: 152 },
  park: { x: 176, y: 76 },
};

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
  people: who(['ronnie', 'lilly'], sky(1)),
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
  people: who(['leroy', 'pauly', 'hallorann', 'will', 'charlotte'], sky(1), sky(2), sky(5)),
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
  people: who(['lilly', 'beverly'], sky(2), 'variety-derry-credits-scene'),
  },
  {
    // The raid happens in the tunnels under the Neibolt house (sky-derry-e5), so 1962 shares the Neibolt spot.
    id: 'neibolt',
    cycleId: '1962',
    name: { es: 'Calle Neibolt 29', en: '29 Neibolt Street' },
    description: {
      es: 'Soldados y chicos bajan a los túneles bajo la casa Neibolt; Pauly Russo muere en la redada y Lilly encuentra la daga.',
      en: 'Soldiers and kids go down into the tunnels under the Neibolt house; Pauly Russo dies in the raid and Lilly finds the dagger.',
    },
    ...spot.neibolt,
    sourceIds: [sky(5), 'nerdist-operation-precept'],
    people: who(['leroy', 'pauly', 'hallorann', 'lilly', 'ronnie', 'will'], sky(5)),
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
  people: who(['hallorann', 'ronnie', 'will', 'rich', 'marge', 'charlotte', 'leroy'], sky(6), sky(7), 'collider-derry-e7'),
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
  people: who(['lilly', 'ronnie', 'marge', 'will', 'leroy', 'charlotte', 'hallorann', 'rich'], sky(8), 'radiotimes-derry-ending'),
  },
  mapOnly(
    {
      id: 'lookout', cycleId: '1962', x: 100, y: 40,
      name: { es: 'El mirador de los chicos', en: 'The kids’ lookout' },
      people: who(['lilly', 'ronnie', 'will', 'rich', 'marge'], sky(4), sky(6), 'collider-derry-e7'),
    },
    s('El escondite de Matty se vuelve el punto de reunión de Lilly, Ronnie, Will y Rich.', 'Matty’s hideout becomes the meeting point of Lilly, Ronnie, Will and Rich.', sky(1), sky(4)),
    s('Allí Rich cura la herida de Marge y lanza sus planeadores.', 'There Rich dresses Marge’s wound and throws his gliders.', sky(6), sky(8)),
  ),
  // Sources never say the 1962 school is the same building as the 1988–89 one, so it keeps its own id and spot.
  mapOnly(
    {
      id: 'high-school', cycleId: '1962', x: 180, y: 56,
      name: { es: 'Escuela secundaria de Derry', en: 'Derry High School' },
      people: who(['lilly', 'marge', 'will', 'rich', 'ronnie'], sky(1), sky(2)),
    },
    s('Lilly encuentra su casillero lleno de pepinillos, y Will conoce a Rich y a Ronnie en su primer día.', 'Lilly finds her locker stuffed with pickles, and Will meets Rich and Ronnie on his first day.', sky(1), sky(2)),
    s('En el final, Pennywise toma una asamblea e hipnotiza a los alumnos.', 'In the finale, Pennywise takes over an assembly and hypnotizes the students.', sky(8), 'radiotimes-derry-ending'),
  ),
  mapOnly(
    {
      id: 'hanlon-house', cycleId: '1962', x: 148, y: 46,
      name: { es: 'Casa de los Hanlon', en: 'The Hanlon house' },
      people: who(['leroy', 'charlotte', 'will', 'hallorann'], sky(2), sky(3)),
    },
    s('La familia se instala en el pueblo y Leroy le regala a Will un telescopio.', 'The family settles into town and Leroy gives Will a telescope.', sky(2)),
    s('Solo en casa, Will atiende el teléfono y Pennywise se lo lleva.', 'Home alone, Will answers the phone and Pennywise takes him.', sky(7), 'collider-derry-e7'),
  ),
  mapOnly(
    {
      id: 'farm', cycleId: '1962', ...spot.farm,
      name: { es: 'La granja de Rose', en: 'Rose’s farm' },
      people: who(['leroy', 'charlotte', 'will'], sky(8), 'polygon-derry-ending'),
    },
    s('Rose les pide a los Hanlon que compren su granja y vigilen a Pennywise; casi se van, pero se quedan.', 'Rose asks the Hanlons to buy her farm and keep watch on Pennywise; they nearly leave, but stay.', sky(8), 'radiotimes-derry-ending'),
  ),
  mapOnly(
    {
      id: 'kersh-house', cycleId: '1962', x: 196, y: 156,
      name: { es: 'Casa de Ingrid Kersh', en: 'Ingrid Kersh’s house' },
      people: who(['lilly'], sky(5)),
    },
    s('Lilly le confía sus secretos a Ingrid aquí.', 'Lilly confides her secrets to Ingrid here.', sky(5)),
    s('En el desván encuentra fotos del padre de Ingrid vestido de payaso y escapa hiriéndola con la daga.', 'In the attic she finds photos of Ingrid’s father dressed as a clown and escapes by wounding her with the dagger.', sky(6)),
  ),
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
  people: who(['bill'], COL),
  },
  {
    id: 'kissing-bridge',
    cycleId: '1988',
    name: { es: 'Puente de los Besos', en: 'The Kissing Bridge' },
    description: {
      es: 'Henry Bowers empieza a grabar su nombre en el cuerpo de Ben, que escapa hacia los Barrens.',
      en: 'Henry Bowers starts carving his name into Ben, who escapes to the Barrens.',
    },
    ...spot.kissingBridge,
    sourceIds: ['collider-it-timeline'],
  people: who(['ben'], COL),
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
  people: who(['ben', 'bill', 'richie', 'eddie', 'stan', 'mike', 'beverly'], COL),
  },
  {
    id: 'quarry',
    cycleId: '1988',
    name: { es: 'La cantera', en: 'The quarry' },
    description: {
      es: 'Los chicos nadan aquí y Ben les cuenta la historia oscura de Derry.',
      en: 'The kids swim here and Ben tells them about Derry’s dark history.',
    },
    ...spot.quarry,
    sourceIds: ['collider-it-timeline'],
  people: who(['bill', 'ben', 'beverly', 'richie', 'eddie', 'stan'], COL),
  },
  {
    id: 'neibolt',
    cycleId: '1988',
    name: { es: 'Calle Neibolt 29', en: '29 Neibolt Street' },
    description: {
      es: 'Eddie ve aquí al leproso; en la primera visita se rompe el brazo y Bev le clava un atizador a Pennywise, y en agosto bajan por su pozo.',
      en: 'Eddie sees the leper here; on the first visit he breaks his arm and Bev drives a fire poker into Pennywise, and in August they climb down its well.',
    },
    ...spot.neibolt,
    sourceIds: ['collider-it-timeline', 'collider-it-ending'],
  people: who(['eddie', 'bill', 'richie', 'beverly', 'ben', 'mike'], COL),
  },
  {
    id: 'library',
    cycleId: '1988',
    name: { es: 'La biblioteca', en: 'The library' },
    description: {
      es: 'Ben investiga aquí el pasado oscuro de Derry.',
      en: 'Ben researches Derry’s dark past here.',
    },
    ...spot.library,
    sourceIds: ['collider-it-timeline'],
  people: who(['ben'], COL),
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
  people: who(['ben', 'beverly', 'bill', 'stan', 'mike'], COL, 'collider-it-ending'),
  },
  mapOnly(
    {
      id: 'school', cycleId: '1988', x: 196, y: 64,
      name: { es: 'La escuela', en: 'The school' },
      people: who(['bill', 'richie', 'eddie', 'stan', 'ben', 'beverly'], COL),
    },
    s('El último día de clases la pandilla de Bowers acorrala a los chicos, y Beverly le firma el anuario a Ben en la escalera.', 'On the last day of school the Bowers gang corners the kids, and Beverly signs Ben’s yearbook on the steps.', COL),
  ),
  mapOnly(
    {
      id: 'clubhouse', cycleId: '1988', ...spot.club,
      name: { es: 'La guarida', en: 'The clubhouse' },
      people: who(['ben', 'stan'], COL),
    },
    s('Ben construye para los Perdedores una guarida subterránea, y Stan reparte gorros de baño contra las arañas.', 'Ben builds the Losers an underground clubhouse, and Stan hands out shower caps against spiders.', COL),
  ),
  mapOnly(
    {
      id: 'denbrough-house', cycleId: '1988', ...spot.denbrough,
      name: { es: 'La casa Denbrough', en: 'The Denbrough house' },
      people: who(['bill', 'ben'], COL),
    },
    s('Bill le hace aquí a Georgie el barquito de papel, y en el sótano lo enfrenta un Georgie zombi.', 'Here Bill makes Georgie the paper boat, and in the basement a zombie Georgie confronts him.', COL, 'variety-it-review'),
    s('En el garaje, Ben muestra que todo apunta a Neibolt y Pennywise sale de las diapositivas.', 'In the garage, Ben shows that everything points to Neibolt and Pennywise bursts out of the slides.', COL),
  ),
  mapOnly(
    {
      id: 'marsh-home', cycleId: '1988', ...spot.marsh,
      name: { es: 'La casa de Beverly', en: 'Beverly’s house' },
      people: who(['beverly'], COL),
    },
    s('Pelo y sangre brotan del lavabo de su baño.', 'Hair and blood gush from her bathroom sink.', COL),
  ),
  mapOnly(
    {
      id: 'park', cycleId: '1988', ...spot.park,
      name: { es: 'El parque y la estatua de Paul Bunyan', en: 'The park and the Paul Bunyan statue' },
      people: who(['richie'], COL),
    },
    s('Al salir del salón de juegos, Richie va al parque y la estatua gigante de Paul Bunyan cobra vida y lo ataca.', 'Leaving the arcade, Richie goes to the park and the giant Paul Bunyan statue comes to life and attacks him.', COL),
  ),
  mapOnly(
    {
      id: 'farm', cycleId: '1988', ...spot.farm,
      name: { es: 'La granja Hanlon', en: 'The Hanlon farm' },
      people: who(['mike', 'leroy'], 'polygon-derry-ending'),
    },
    s('Mike vive aquí con su abuelo Leroy, ahora un hombre más frío que lo obliga a sacrificar ovejas.', 'Mike lives here with his grandfather Leroy, now a colder man who makes him slaughter sheep.', 'polygon-derry-ending'),
  ),
  // 2016: IT Chapter Two (2019).
  {
    id: 'kissing-bridge',
    cycleId: '2016',
    name: { es: 'Puente de los Besos y Canal Days', en: 'Kissing Bridge and Canal Days' },
    description: {
      es: 'Tras el festival, arrojan a Adrian Mellon desde el puente; al final, Richie graba otra vez «R + E» en él.',
      en: 'After the festival, Adrian Mellon is thrown off the bridge; at the end, Richie re-carves "R + E" on it.',
    },
    ...spot.kissingBridge,
    sourceIds: ['collider-it-timeline', 'time-it2-ending'],
  people: who(['mike', 'richie'], COL, 'time-it2-ending'),
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
  people: who(['bill', 'ben', 'beverly', 'richie', 'eddie', 'mike'], COL),
  },
  {
    id: 'library',
    cycleId: '2016',
    name: { es: 'La biblioteca', en: 'The library' },
    description: {
      es: 'Henry ataca a Mike, y Richie llega a tiempo para matar a Henry.',
      en: 'Henry attacks Mike, and Richie arrives in time to kill Henry.',
    },
    ...spot.library,
    sourceIds: ['collider-it-timeline'],
  people: who(['mike', 'richie'], COL, 'dailybeast-it2-review'),
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
  people: who(['bill'], COL, 'dailybeast-it2-review'),
  },
  {
    id: 'neibolt',
    cycleId: '2016',
    name: { es: 'Casa Neibolt y el cráter de It', en: 'Neibolt house and It’s crash site' },
    description: {
      es: 'Bajo la casa, donde cayó It, el Ritual de Chüd fracasa, los Perdedores lo vencen y la cueva se derrumba con el cuerpo de Eddie.',
      en: 'Under the house, where It crashed, the Ritual of Chüd fails, the Losers defeat It and the cave collapses with Eddie’s body inside.',
    },
    ...spot.neibolt,
    sourceIds: ['collider-it-timeline', 'time-it2-ending'],
  people: who(['bill', 'ben', 'beverly', 'richie', 'eddie', 'mike'], COL),
  },
  {
    id: 'quarry',
    cycleId: '2016',
    name: { es: 'La cantera', en: 'The quarry' },
    description: {
      es: 'Tras vencer a It, los Perdedores saltan a la cantera.',
      en: 'After defeating It, the Losers jump into the quarry.',
    },
    ...spot.quarry,
    sourceIds: ['time-it2-ending'],
  people: who(['bill', 'ben', 'beverly', 'richie', 'mike'], COL),
  },
  mapOnly(
    {
      id: 'inn', cycleId: '2016', x: 262, y: 122,
      name: { es: 'La posada', en: 'The inn' },
      people: who(['bill', 'ben', 'beverly', 'richie', 'eddie'], 'screenrant-it2-questions', COL),
    },
    s('Todos los Perdedores menos Mike se alojan aquí.', 'All the Losers except Mike stay here.', 'screenrant-it2-questions'),
    s('Bill y Beverly se besan, y Henry apuñala a Eddie en la cara antes de escapar por una ventana.', 'Bill and Beverly kiss, and Henry stabs Eddie in the face before escaping through a window.', COL),
  ),
  mapOnly(
    {
      id: 'pharmacy', cycleId: '2016', x: 226, y: 78,
      name: { es: 'La farmacia del señor Keene', en: 'Mr. Keene’s pharmacy' },
      people: who(['eddie'], COL),
    },
    s('Eddie vuelve por su inhalador y se reencuentra con el leproso.', 'Eddie goes back for his inhaler and runs into the leper again.', COL),
  ),
  mapOnly(
    {
      id: 'clubhouse', cycleId: '2016', ...spot.club,
      name: { es: 'La guarida', en: 'The clubhouse' },
      people: who(['bill', 'ben', 'beverly', 'richie', 'eddie', 'mike'], COL),
    },
    s('Los Perdedores vuelven a la guarida, recuerdan el verano del 89 y encuentran el gorro de baño de Stan.', 'The Losers return to the clubhouse, remember the summer of ’89 and find Stan’s shower cap.', COL),
  ),
  mapOnly(
    {
      id: 'denbrough-house', cycleId: '2016', ...spot.denbrough,
      name: { es: 'La casa Denbrough y la alcantarilla', en: 'The Denbrough house and the storm drain' },
      people: who(['bill'], COL),
    },
    s('Bill pasa por su vieja casa y, en la alcantarilla donde murió Georgie, recupera el barquito.', 'Bill passes his old house and, at the drain where Georgie died, gets the paper boat back.', COL),
    s('Ahora vive allí un chico, Dean, que oye susurros desde el desagüe de la bañera.', 'A boy, Dean, lives there now and hears whispers from the bathtub drain.', COL),
  ),
  mapOnly(
    {
      id: 'marsh-home', cycleId: '2016', ...spot.marsh,
      name: { es: 'La antigua casa de Beverly', en: 'Beverly’s old house' },
      people: who(['beverly'], COL, 'dailybeast-it2-review'),
    },
    s('Beverly visita la casa de su infancia y conoce a la anciana «señora Kersh», que resulta ser Pennywise.', 'Beverly visits her childhood home and meets old “Mrs. Kersh”, who turns out to be Pennywise.', COL, 'dailybeast-it2-review'),
  ),
  mapOnly(
    {
      id: 'park', cycleId: '2016', ...spot.park,
      name: { es: 'El salón de juegos y el parque', en: 'The arcade and the park' },
      people: who(['richie'], COL),
    },
    s('Richie vuelve al salón de juegos por una ficha y luego al parque, donde Pennywise lo atormenta.', 'Richie goes back to the arcade for a token and then to the park, where Pennywise torments him.', COL),
  ),
];

/** Places of one cycle drawn on the home's mini-map, in map order. */
export const placesOf = (cycleId: string): Place[] => places.filter((p) => p.cycleId === cycleId && p.home !== false);

/** Every place of one cycle drawn on the map page, in map order. */
export const mapPlacesOf = (cycleId: string): Place[] => places.filter((p) => p.cycleId === cycleId);

/** Eras of the map page, in order. */
export const mapEras = ['1962', '1988', '2016'] as const;

/** Every source id cited on the map page, in render order: each era's places, their sentences, then their people. */
export const mapCitations = (): string[] =>
  mapEras.flatMap((era) => mapPlacesOf(era).flatMap((p) => [...(p.body ?? []).flatMap((b) => b.cite), ...(p.body ? [] : p.sourceIds), ...(p.people?.cite ?? [])]));
