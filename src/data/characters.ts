// Characters page: the seven Losers (1988–89 and 2016) and nine people of Derry in 1962, each drawn as the object the
// screen ties to them (design/characters/01-what-they-left.html). Facts come only from odd/research/characters.md and
// every sentence cites at least one entry of src/data/sources.ts. Never state anything on that file's "Do NOT state" list.
import type { Locale } from '../i18n/ui';
import type { Sentence } from './cycles';
import type { ObjectArt } from '../components/characters/objects';

export type Group = 'losers' | 'derry-1962';

export interface Character {
  /** Anchor id on the page. */
  id: string;
  name: string;
  group: Group;
  /** Displayed eras, e.g. "1988–89". */
  eras: string[];
  /** Short epithet under the name. */
  tag: Record<Locale, string>;
  /** Key of the original object illustration. */
  art: ObjectArt;
  /** Name of the object, shown as the plate caption. */
  object: Record<Locale, string>;
  /** No strong on-screen object is backed by a source: the card says so. */
  provisional?: boolean;
  /** Why this object: the first sentence on the card. */
  why: Sentence;
  /** Their fear (Losers only). */
  fear?: Sentence;
  /** Family link across eras. */
  link?: Sentence;
  /** Content note shown on the card. */
  contentNote?: Record<Locale, string>;
  /** Full arc, endings included; shown behind a spoiler toggle. */
  story: Sentence[];
  /** Actor credits line. */
  actors: Sentence;
}

const VAR = 'variety-it-review';
const TIME = 'time-it2-ending';
const COL = 'collider-it-timeline';
const COLEND = 'collider-it-ending';
const DB = 'dailybeast-it2-review';
const POL = 'polygon-derry-ending';
const RT = 'radiotimes-derry-ending';
const MC = 'marieclaire-derry-cast';
const NER = 'nerdist-operation-precept';
const IGN = 'ign-derry-finale';
const BM = 'bellmedia-derry-trailer';
const C7 = 'collider-derry-e7';
const [E1, E2, E3, E4, E5, E6, E7, E8] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `sky-derry-e${n}`);

const s = (es: string, en: string, ...cite: string[]): Sentence => ({ text: { es, en }, cite });
const LOSER_ERAS = ['1988–89', '2016'];

export const characters: Character[] = [
  {
    id: 'bill', name: 'Bill Denbrough', group: 'losers', eras: LOSER_ERAS, art: 'boat',
    tag: { es: 'El que perdió a Georgie', en: 'The one who lost Georgie' },
    object: { es: 'El barquito de papel', en: 'The paper boat' },
    why: s('Le arma un barquito de papel a su hermano Georgie, que lo pierde en una alcantarilla y desaparece; Bill carga con esa culpa.',
      'He folds a paper boat for his brother Georgie, who loses it down a storm drain and vanishes; Bill carries the guilt.', COL, VAR),
    fear: s('Un Georgie convertido en zombi, en el sótano de su casa.', 'A zombie Georgie in the basement of his house.', COL),
    link: s('Hermano mayor de Georgie Denbrough.', 'Older brother of Georgie Denbrough.', VAR),
    story: [
      s('En la cisterna dispara contra Eso la pistola de Mike aunque está descargada: lo que importa es creer.',
        "In the cistern he fires Mike's bolt gun at It even though it is empty: belief is what matters.", COL),
      s('De adulto es escritor, y todos le reprochan sus malos finales.', 'As an adult he is a writer, and everyone teases him about his bad endings.', DB, COL),
      s('En 2016 recupera el barquito y lo usa como su ofrenda para el Ritual de Chüd.',
        'In 2016 he gets the boat back and uses it as his token for the Ritual of Chüd.', COL, TIME),
      s('Bajo la casa de Neibolt por fin se perdona la muerte de Georgie; al final empieza una novela nueva.',
        "Under the Neibolt house he finally forgives himself for Georgie's death; at the end he starts a new novel.", COL, TIME),
    ],
    actors: s('Jaeden Lieberher (niño) · James McAvoy (adulto)', 'Jaeden Lieberher (kid) · James McAvoy (adult)', VAR, TIME),
  },
  {
    id: 'ben', name: 'Ben Hanscom', group: 'losers', eras: LOSER_ERAS, art: 'yearbook',
    tag: { es: 'El chico nuevo de la biblioteca', en: 'The new kid in the library' },
    object: { es: 'La página del anuario', en: 'The yearbook page' },
    why: s('Beverly es la única que le firma el anuario; él guarda esa página en la billetera y en 2016 la usa como su ofrenda.',
      'Beverly is the only one who signs his yearbook; he keeps that page in his wallet and in 2016 uses it as his token.', COL, TIME),
    fear: s('Las víctimas sin cabeza de la explosión de la Ferrería lo persiguen en la biblioteca.',
      'The headless victims of the Ironworks explosion chase him through the library.', COL),
    story: [
      s('Es tímido y pasa sus días en la biblioteca.', 'He is shy and spends his days in the library.', VAR),
      s('Le escribe a Beverly una postal con un poema y no la firma.', 'He writes Beverly a postcard with a poem and does not sign it.', COL),
      s('En la cisterna la despierta de las luces muertas con un beso.', 'In the cistern he wakes her from the deadlights with a kiss.', COL, COLEND),
      s('De adulto es arquitecto.', 'As an adult he is an architect.', DB),
      s('En la pelea final salva a Bev y le dice que la ama; al final se van juntos.',
        'In the final fight he saves Bev and tells her he loves her; at the end they leave together.', COL, TIME),
    ],
    actors: s('Jeremy Ray Taylor (niño) · Jay Ryan (adulto)', 'Jeremy Ray Taylor (kid) · Jay Ryan (adult)', VAR, TIME),
  },
  {
    id: 'beverly', name: 'Beverly Marsh', group: 'losers', eras: LOSER_ERAS, art: 'postcard',
    tag: { es: 'La que no se deja', en: 'The one who fights back' },
    object: { es: 'La postal de «brasas de enero»', en: 'The “January embers” postcard' },
    why: s('Su ofrenda para el ritual es la postal con el poema que recibió de niña.',
      'Her token for the ritual is the postcard with the poem she got as a kid.', COL, TIME),
    fear: s('Pelo y sangre que brotan del lavabo de su baño.', 'Hair and blood bursting out of her bathroom sink.', COL),
    link: s('Ingrid Kersh, de la temporada de 1962, la conoce de niña en Juniper Hill.',
      'Ingrid Kersh, from the 1962 season, meets her as a kid at Juniper Hill.', POL),
    story: [
      s('Intenta escapar de un padre abusivo.', 'She is trying to escape an abusive father.', VAR, COL),
      s('En la casa de Neibolt le clava un atizador a Pennywise.', 'At the Neibolt house she drives a fire poker into Pennywise.', COL),
      s('Eso se la lleva; tras las luces muertas ve a los Perdedores volver de adultos.',
        'It takes her; after the deadlights she sees the Losers coming back as adults.', COL),
      s('De adulta es diseñadora de moda y deja un matrimonio abusivo.', 'As an adult she is a fashion designer who leaves an abusive marriage.', DB, COL),
      s('Descubre que el poema era de Ben, no de Bill, y termina con él.', 'She learns the poem was from Ben, not Bill, and ends up with him.', COL, TIME),
    ],
    actors: s('Sophia Lillis (niña) · Jessica Chastain (adulta)', 'Sophia Lillis (kid) · Jessica Chastain (adult)', VAR, TIME),
  },
  {
    id: 'richie', name: 'Richie Tozier', group: 'losers', eras: LOSER_ERAS, art: 'token',
    tag: { es: 'El bocón de anteojos', en: 'The loudmouth in glasses' },
    object: { es: 'La ficha del salón de juegos', en: 'The arcade token' },
    why: s('Su ofrenda para el ritual es una ficha del salón de videojuegos.', 'His token for the ritual is a token from the arcade.', COL, TIME),
    fear: s('Los payasos.', 'Clowns.', COL),
    link: s('Hijo de Marge Truman, de 1962; según Polygon, ella lo llamó así por Rich Santos.',
      'Son of Marge Truman, from 1962; according to Polygon, she named him after Rich Santos.', POL, RT),
    story: [
      s('Bromista y malhablado, con anteojos de cristales gruesos.', 'A foul-mouthed joker with thick glasses.', VAR),
      s('De adulto es comediante y esconde su sexualidad.', 'As an adult he is a stand-up comedian hiding his sexuality.', DB, COL),
      s('En 2016 mata a Henry Bowers en la biblioteca para salvar a Mike.', 'In 2016 he kills Henry Bowers in the library to save Mike.', COL),
      s('Al final vuelve a tallar «R + E» en el Puente de los Besos.', 'At the end he carves “R + E” into the Kissing Bridge again.', TIME),
    ],
    actors: s('Finn Wolfhard (niño) · Bill Hader (adulto)', 'Finn Wolfhard (kid) · Bill Hader (adult)', VAR, TIME),
  },
  {
    id: 'eddie', name: 'Eddie Kaspbrak', group: 'losers', eras: LOSER_ERAS, art: 'inhaler',
    tag: { es: 'El hipocondríaco', en: 'The hypochondriac' },
    object: { es: 'El inhalador', en: 'The inhaler' },
    why: s('Nunca suelta su inhalador, y en 2016 lo lleva como ofrenda al ritual.',
      'He never lets go of his inhaler, and in 2016 he brings it as his token for the ritual.', VAR, COL, TIME),
    fear: s('El leproso de la calle Neibolt.', 'The leper of Neibolt Street.', COL),
    story: [
      s('Se quiebra el brazo en la casa de Neibolt.', 'He breaks his arm at the Neibolt house.', COL),
      s('De adulto analiza riesgos y está casado con una mujer parecida a su madre.',
        'As an adult he assesses risk for a living and is married to a woman much like his mother.', DB, COL),
      s('Hiere a Eso para salvar a Richie y muere apuñalado; su cuerpo queda en la cueva que se derrumba.',
        'He wounds It to save Richie and is fatally stabbed; his body stays in the collapsing cave.', COL, TIME),
    ],
    actors: s('Jack Dylan Grazer (niño) · James Ransone (adulto)', 'Jack Dylan Grazer (kid) · James Ransone (adult)', VAR, TIME),
  },
  {
    id: 'mike', name: 'Mike Hanlon', group: 'losers', eras: LOSER_ERAS, art: 'rock',
    tag: { es: 'El que se quedó', en: 'The one who stayed' },
    object: { es: 'La piedra', en: 'The rock' },
    why: s('Su ofrenda es la piedra que Bev le lanzó a Henry Bowers para salvarlo.', 'His token is the rock Bev threw at Henry Bowers to save him.', TIME),
    fear: s('Visiones de sus padres ardiendo.', 'Visions of his parents burning.', COL),
    link: s('Hijo de Will Hanlon y nieto de Leroy y Charlotte; crece en la granja con su abuelo.',
      'Son of Will Hanlon and grandson of Leroy and Charlotte; he grows up on the farm with his grandfather.', POL, MC, COL),
    story: [
      s('Estudia en casa y la pandilla de Bowers lo acosa hasta que los Perdedores lo defienden en la guerra de piedras.',
        'He is home-schooled, and the Bowers gang bullies him until the Losers defend him in the rock war.', VAR, COL),
      s('Empuja a Henry Bowers al pozo de Neibolt.', 'He pushes Henry Bowers down the Neibolt well.', COL),
      s('Es el único que se queda en Derry, como bibliotecario, y llama a los demás para que vuelvan.',
        'He is the only one who stays in Derry, as the librarian, and calls the others back.', DB, COL),
      s('Le arranca el corazón a Eso y al final se va de Derry.', "He tears out It's heart and at the end drives away from Derry.", COL, TIME),
    ],
    actors: s('Chosen Jacobs (niño) · Isaiah Mustafa (adulto)', 'Chosen Jacobs (kid) · Isaiah Mustafa (adult)', VAR, TIME),
  },
  {
    id: 'stan', name: 'Stanley Uris', group: 'losers', eras: LOSER_ERAS, art: 'cap',
    tag: { es: 'El escéptico', en: 'The skeptic' },
    object: { es: 'El gorro de baño', en: 'The shower cap' },
    contentNote: { es: 'Aviso: menciona un suicidio.', en: 'Content note: mentions a suicide.' },
    why: s('En la guarida reparte gorros de baño para que no se les metan arañas en el pelo; los Perdedores usan uno como su ofrenda.',
      "In the clubhouse he hands out shower caps to keep spiders out of everyone's hair; the Losers use one as his token.", COL, TIME),
    fear: s('Un cuadro deformado en la oficina de su padre.', "A distorted painting in his father's office.", COL),
    story: [
      s('Se prepara para su bar mitzvá, donde por fin le planta cara a su padre.',
        'He is preparing for his bar mitzvah, where he finally stands up to his father.', VAR, COL),
      s('De adulto se quita la vida después de la llamada de Mike.', "As an adult he takes his own life after Mike's call.", COL, TIME),
      s('Sus cartas explican que lo hizo para que los demás siguieran unidos.', 'His letters explain he did it so the others would stay united.', COL, TIME),
    ],
    actors: s('Wyatt Oleff (niño) · Andy Bean (adulto)', 'Wyatt Oleff (kid) · Andy Bean (adult)', VAR, TIME),
  },
  {
    id: 'will', name: 'Will Hanlon', group: 'derry-1962', eras: ['1962'], art: 'telescope',
    tag: { es: 'El chico de ciencias', en: 'The science kid' },
    object: { es: 'El telescopio', en: 'The telescope' },
    why: s('Su padre le regala un telescopio, y por él ve una figura parecida a un payaso.',
      'His father gives him a telescope, and through it he sees a clown-like figure.', E2, E4),
    link: s('Hijo de Leroy y Charlotte; futuro padre de Mike Hanlon.', 'Son of Leroy and Charlotte; future father of Mike Hanlon.', MC, POL),
    story: [
      s('Llega nuevo a Derry y Rich se hace su amigo el primer día.', 'He is new in Derry, and Rich befriends him on his first day.', E2, MC),
      s('Pennywise lo persigue porque su hijo ayudará a matarlo.', 'Pennywise goes after him because his son will help kill It.', POL),
      s('En el final Pennywise se lo lleva, y él ayuda a clavar la daga junto al árbol muerto.',
        'In the finale Pennywise takes him, and he helps plant the dagger by the dead tree.', RT),
      s('Su familia se queda en la granja de Rose; le escribe una carta a Ronnie para que no lo olvide.',
        "His family stays on Rose's farm; he writes Ronnie a letter so she won't forget him.", E8, RT, POL),
    ],
    actors: s('Blake Cameron James', 'Blake Cameron James', MC),
  },
  {
    id: 'leroy', name: 'Leroy Hanlon', group: 'derry-1962', eras: ['1962'], art: 'gate', provisional: true,
    tag: { es: 'El mayor sin miedo', en: 'The major without fear' },
    object: { es: 'El portón de la granja', en: 'The farm gate' },
    why: s('Al final la familia se queda en la granja de Rose, la misma donde, ya mayor, cría a su nieto Mike.',
      "In the end the family stays on Rose's farm, where, as an old man, he raises his grandson Mike.", RT, POL),
    link: s('Esposo de Charlotte, padre de Will y abuelo de Mike.', 'Husband of Charlotte, father of Will and grandfather of Mike.', MC, POL),
    story: [
      s('Mayor y piloto condecorado, veterano de Corea, destinado a la base aérea de Derry.',
        'A major and decorated pilot, a Korean War veteran posted to the Derry air base.', MC, E1),
      s('Una herida de guerra le quitó la capacidad de sentir miedo; por eso lo quiere el general Shaw.',
        'A war wound left him unable to feel fear, which is why General Shaw wants him.', NER),
      s('Descubre que Shaw planea liberar a Eso, no encerrarlo.', 'He learns that Shaw plans to free It, not cage it.', C7, NER),
      s('Herido en la pierna y dado de baja con honores, guarda silencio y se queda en Derry.',
        'Shot in the leg and honorably discharged, he keeps quiet and stays in Derry.', NER),
    ],
    actors: s('Jovan Adepo', 'Jovan Adepo', MC, BM),
  },
  {
    id: 'charlotte', name: 'Charlotte Hanlon', group: 'derry-1962', eras: ['1962'], art: 'car', provisional: true,
    tag: { es: 'La activista', en: 'The activist' },
    object: { es: 'El auto cargado', en: 'The packed car' },
    why: s('Con todo listo para irse de Derry, duda, y la familia decide quedarse.',
      'With everything ready to leave Derry, she hesitates, and the family decides to stay.', RT, E8),
    link: s('Esposa de Leroy, madre de Will y abuela de Mike.', 'Wife of Leroy, mother of Will and grandmother of Mike.', MC, POL),
    story: [
      s('En Luisiana era activista por los derechos civiles.', 'Back in Louisiana she was a civil rights activist.', MC),
      s('Ayuda a sacar a Hank Grogan de Derry rumbo a la frontera con Canadá.', 'She helps get Hank Grogan out of Derry toward the Canadian border.', C7),
    ],
    actors: s('Taylour Paige', 'Taylour Paige', MC, BM),
  },
  {
    id: 'lilly', name: 'Lilly Bainbridge', group: 'derry-1962', eras: ['1962'], art: 'dagger',
    tag: { es: 'La que llaman «Loony»', en: 'The one they call “Loony”' },
    object: { es: 'La daga de estrella', en: 'The star dagger' },
    why: s('Encuentra en las alcantarillas una daga de estrella y ve que detiene a la criatura.',
      'She finds a star dagger in the sewers and sees it stop the creature.', E5, E6),
    story: [
      s('Le dicen «Loony» desde que pasó por Juniper Hill tras la muerte de su padre.',
        "They call her “Loony” since her stay at Juniper Hill after her father's death.", MC),
      s('Sobrevive con Ronnie a la masacre del cine Capitol.', 'She and Ronnie survive the massacre at the Capitol theater.', E1),
      s('En el final la daga le nubla la mente; Marge se la quita y ella se recupera.',
        'In the finale the dagger clouds her mind; Marge takes it from her and she recovers.', RT),
      s('Con Ronnie, Marge y Will clava la daga y deja a Eso encerrado; se queda en Derry.',
        'With Ronnie, Marge and Will she plants the dagger and locks It in; she stays in Derry.', RT, IGN),
    ],
    actors: s('Clara Stack', 'Clara Stack', MC),
  },
  {
    id: 'ronnie', name: 'Ronnie Grogan', group: 'derry-1962', eras: ['1962'], art: 'reel',
    tag: { es: 'La hija del proyeccionista', en: "The projectionist's daughter" },
    object: { es: 'El rollo de película', en: 'The film reel' },
    why: s('Ayuda a su padre en el cine, y es ella quien arranca el proyector la noche de la masacre.',
      'She helps her father at the theater, and she is the one who starts the projector on the night of the massacre.', MC, E1),
    link: s('Hija de Hank Grogan.', 'Daughter of Hank Grogan.', MC),
    story: [
      s('Lucha por limpiar el nombre de su padre, acusado de las muertes.', "She fights to clear her father's name after he is blamed for the killings.", POL),
      s('Escapa del incendio del Black Spot gracias a Hallorann.', 'She escapes the Black Spot fire thanks to Hallorann.', C7),
      s('Se va de Derry con Hank después de despedirse de Will con un beso; se espera que lo olvide.',
        'She leaves Derry with Hank after a goodbye kiss with Will; she is expected to forget.', RT, IGN),
    ],
    actors: s('Amanda Christine', 'Amanda Christine', MC),
  },
  {
    id: 'rich', name: 'Rich Santos', group: 'derry-1962', eras: ['1962'], art: 'sticks',
    tag: { es: 'El baterista', en: 'The drummer' },
    object: { es: 'Las baquetas', en: 'The drumsticks' },
    why: s('Toca la batería en el escenario del Black Spot.', 'He plays the drums on stage at the Black Spot.', E6),
    story: [
      s('Chico cubanoamericano de la banda, se hace amigo de Will y está enamorado de Marge.',
        'A Cuban American band kid, he befriends Will and has a crush on Marge.', MC, E3),
      s('Le regala a Marge un parche para el ojo.', 'He gives Marge an eyepatch.', E6),
      s('En el incendio esconde a Marge y muere protegiéndola.', 'In the fire he hides Marge and dies keeping her safe.', C7, E7),
      s('Su espíritu ayuda a clavar la daga en el final.', 'His spirit helps plant the dagger in the finale.', RT),
    ],
    actors: s('Arian S. Cartaya', 'Arian S. Cartaya', MC),
  },
  {
    id: 'marge', name: 'Marge Truman', group: 'derry-1962', eras: ['1962'], art: 'patch',
    tag: { es: 'La del parche', en: 'The girl with the eyepatch' },
    object: { es: 'El parche', en: 'The eyepatch' },
    why: s('Tras una grave herida en el ojo usa el parche que le regaló Rich.', 'After a bad eye injury she wears the patch Rich gave her.', E5, E6, C7),
    link: s('Futura madre de Richie Tozier.', 'Future mother of Richie Tozier.', POL, RT),
    story: [
      s('Amiga de Lilly, quiere entrar en el grupo popular de las «Pattycakes».', 'A friend of Lilly who wants into the popular “Pattycakes” clique.', MC),
      s('Rich la salva del incendio del Black Spot.', 'Rich saves her from the Black Spot fire.', C7),
      s('Pennywise la persigue por el hijo que tendrá.', 'Pennywise goes after her because of the son she will have.', POL),
      s('Despide a Rich en su funeral y se queda en Derry.', 'She gives the eulogy at Rich’s funeral and stays in Derry.', RT),
    ],
    actors: s('Matilda Lawler', 'Matilda Lawler', MC),
  },
  {
    id: 'hallorann', name: 'Dick Hallorann', group: 'derry-1962', eras: ['1962'], art: 'slingshot',
    tag: { es: 'El del resplandor', en: 'The one with the shine' },
    object: { es: 'La resortera en la caja de puros', en: 'The slingshot in the cigar box' },
    why: s('Usa una vieja resortera guardada en una caja de puros como brújula psíquica.',
      'He uses an old slingshot kept in a cigar box as a psychic compass.', E3),
    story: [
      s('Aviador con un don psíquico, el «resplandor»; Shaw lo recluta para encontrar a Eso.',
        'An airman with a psychic gift, the “shine”; Shaw recruits him to find It.', MC, NER),
      s('Saca a Hank, Ronnie y Will del incendio del Black Spot.', 'He gets Hank, Ronnie and Will out of the Black Spot fire.', C7),
      s('En el hielo congela a Pennywise con la mente.', 'On the ice he freezes Pennywise with his mind.', RT),
      s('El té de Rose calma sus voces, y se va a trabajar a un hotel de Londres.',
        "Rose's tea quiets his voices, and he leaves for a hotel job in London.", RT, E8, NER),
    ],
    actors: s('Chris Chalk', 'Chris Chalk', MC),
  },
  {
    id: 'pauly', name: 'Pauly Russo', group: 'derry-1962', eras: ['1962'], art: 'plane', provisional: true,
    tag: { es: 'El amigo de Corea', en: 'The friend from Korea' },
    object: { es: 'El avión de transporte', en: 'The transport plane' },
    why: s('Vuela con Leroy en el avión de transporte durante el vuelo de vigilancia.',
      'He flies with Leroy in the transport plane on the surveillance flight.', E3),
    story: [
      s('Capitán y piloto, amigo leal de Leroy desde Corea.', 'A captain and pilot, Leroy’s loyal friend since Korea.', MC, E1),
      s('Derriba una puerta para salvar a Leroy de unos atacantes y se rompe la nariz.',
        'He breaks down a door to save Leroy from attackers and breaks his nose.', E1),
      s('Muere en el asalto a la Casa del Pozo.', 'He is killed in the raid on the Well House.', NER),
    ],
    actors: s('Rudy Mancuso', 'Rudy Mancuso', MC, BM),
  },
];

/** Intro sentence of each group, cited. */
export const groupIntro: Record<Group, Sentence> = {
  losers: s('Siete chicos que enfrentan a Eso en el verano de 1989 y vuelven 27 años después, en 2016, a terminar lo que empezaron.',
    'Seven kids who face It in the summer of 1989 and come back 27 years later, in 2016, to finish what they started.', COL, TIME),
  'derry-1962': s('Una base aérea, un cine, un grupo de chicos y una familia recién llegada, 27 años antes de los Perdedores.',
    'An air base, a movie theater, a group of kids and a family just arrived in town, 27 years before the Losers.', E1, E2),
};

/** Family lines across eras: each member links to a card. */
export const ties: { id: string; title: Record<Locale, string>; members: { id: string; partner?: string; year: string; role: Record<Locale, string> }[]; note: Sentence }[] = [
  {
    id: 'hanlon',
    title: { es: 'Los Hanlon', en: 'The Hanlons' },
    members: [
      { id: 'leroy', partner: 'charlotte', year: '1962', role: { es: 'los abuelos', en: 'the grandparents' } },
      { id: 'will', year: '1962', role: { es: 'su hijo', en: 'their son' } },
      { id: 'mike', year: '1988–89 · 2016', role: { es: 'su nieto', en: 'their grandson' } },
    ],
    note: s('Ya mayor, Leroy cría a su nieto Mike en la granja familiar.', 'As an old man, Leroy raises his grandson Mike on the family farm.', POL, MC),
  },
  {
    id: 'tozier',
    title: { es: 'Los Tozier', en: 'The Toziers' },
    members: [
      { id: 'marge', year: '1962', role: { es: 'la madre', en: 'the mother' } },
      { id: 'richie', year: '1988–89 · 2016', role: { es: 'su hijo', en: 'her son' } },
    ],
    note: s('Pennywise persigue a Marge en 1962 por el hijo que tendrá.', 'In 1962 Pennywise goes after Marge because of the son she will have.', POL, RT),
  },
];

/** Every source id cited on the characters page, in render order. */
export const characterCitations = (): string[] => [
  ...groupIntro.losers.cite,
  ...characters.filter((c) => c.group === 'losers').flatMap(cardCitations),
  ...groupIntro['derry-1962'].cite,
  ...characters.filter((c) => c.group === 'derry-1962').flatMap(cardCitations),
  ...ties.flatMap((t) => t.note.cite),
];

function cardCitations(c: Character): string[] {
  return [c.why, c.fear, c.link, ...c.story, c.actors].flatMap((x) => x?.cite ?? []);
}
