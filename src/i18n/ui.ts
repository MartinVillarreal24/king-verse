// UI strings and routes for both locales. Spanish (neutral "tú") is the default; English mirrors it.
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

// Every page exists in both locales; the layout uses this map for the language switch and hreflang.
export const routes = {
  home: { es: '/', en: '/en/' },
  characters: { es: '/personajes/', en: '/en/characters/' },
  map: { es: '/mapa/', en: '/en/map/' },
  sources: { es: '/fuentes/', en: '/en/sources/' },
} as const;
export type RouteKey = keyof typeof routes;

/** A short quote with its attribution: speaker, work (cited) and year. */
export interface Quote { text: string; speaker: string; work: string; year: string }

export const ui = {
  es: {
    siteName: 'King Verse',
    skipLink: 'Saltar al contenido',
    nav: { home: 'Inicio', characters: 'Personajes', map: 'Mapa', sources: 'Fuentes' },
    langSwitch: { label: 'English', title: 'Read in English' },
    disclaimer:
      'Sitio de fans no oficial y sin fines de lucro. No está afiliado a Stephen King, Warner Bros. ni HBO.',
    credits: 'Arte y textos originales de Martín Herrera.',
    home: {
      title: 'Cada 27 años',
      description: 'Un recorrido animado y no oficial por los ciclos de 27 años de Derry, tal como los cuentan Welcome to Derry y las películas.',
      lead: 'Derry despierta cada 27 años. Recorre sus ciclos, de 1908 a 2016, tal como los cuentan Welcome to Derry y las películas.',
      cyclesLabel: 'Ciclos de Derry',
      gap: '+27 años',
      upcoming: 'Próximamente',
      placesTitle: 'Derry en esta época',
      placesEmpty: 'Los lugares de esta época están en preparación.',
      bodyEmpty: 'Contenido en preparación.',
      mapLabel: 'Mapa de Derry',
      mapCaption: 'Mapa ilustrativo: no a escala, posiciones aproximadas.',
      placesListLabel: 'Lugares',
      notesLabel: 'Notas',
      eyebrow: 'Derry, Maine · un recorrido no oficial',
      contentNote: 'Contiene escenas de terror e imágenes de sangre ilustradas.',
      cue: 'Desliza para despertar a Derry',
      railLabel: 'Capítulos',
      prelude: 'Antes de 1962',
      end: 'Aquí termina el ciclo.',
      chapters: {
        '1962': { label: 'Capítulo I', mood: 'Invierno en la base' },
        '1988': { label: 'Capítulo II', mood: 'Verano en los Barrens' },
        '2016': { label: 'Capítulo III', mood: 'Canal Days' },
      } as Record<string, { label: string; mood: string }>,
      // Short attributed quotes shown on their own panel inside a chapter (design/home-cinematic/04).
      quotes: {
        '1988': { text: '«Aquí abajo todos flotan.»', speaker: 'Pennywise', work: 'IT', year: '2017' },
      } as Record<string, Quote>,
    },
    characters: {
      title: 'Personajes',
      description: 'Los Perdedores y la gente de Derry en 1962, dibujados como los objetos que los identifican en pantalla.',
      lead: 'Aquí no hay caras. Cada personaje aparece como el objeto que lo identifica en pantalla, dibujado desde cero. Pasa el cursor o el foco por una ficha y el objeto despierta.',
      tocLabel: 'Secciones',
      groups: {
        losers: { kicker: 'It (2017) · It Chapter Two (2019)', title: 'El Club de los Perdedores', toc: 'Los Perdedores · 1988–89 y 2016' },
        'derry-1962': { kicker: 'IT: Welcome to Derry · temporada 1', title: 'Derry, 1962', toc: 'Derry · 1962' },
      },
      ties: { kicker: 'De 1962 a 2016', title: 'Lazos entre épocas', lead: 'Dos linajes cruzan los ciclos.', toc: 'Lazos entre épocas' },
      erasLabel: 'Épocas',
      fear: 'Su miedo',
      link: 'Lazo',
      story: 'Toda su historia',
      spoilers: '(con spoilers)',
      provisional: 'Objeto provisional: sin un objeto propio claro en pantalla.',
    },
    map: {
      title: 'Mapa de Derry',
      description: 'Un mapa interactivo de Derry en 1962, 1988–89 y 2016: dónde pasó cada cosa y quién estuvo allí.',
      lead: 'Las mismas calles, tres épocas. Elige un año y Derry cambia: los lugares donde pasó todo, quién estuvo allí y cuáles vuelven en otra época.',
      eraLegend: 'Época',
      eras: {
        '1962': { label: '1962', work: 'IT: Welcome to Derry' },
        '1988': { label: '1988–89', work: 'It' },
        '2016': { label: '2016', work: 'It Chapter Two' },
      },
      places: (n: number) => `${n} lugares`,
      mapLabel: 'Mapa ilustrativo de Derry',
      caption: 'Mapa ilustrativo: no a escala, posiciones aproximadas.',
      recurringKey: 'Vuelve en otra época',
      panelTitle: 'Lugares',
      panelHint: 'Toca un punto o una ficha',
      listLabel: (era: string) => `Lugares de ${era}`,
      people: 'Pasan por aquí',
      alsoIn: 'También en',
      labels: { woods: 'Bosque', farms: 'Granjas' },
    },
    sources: {
      title: 'Fuentes',
      description: 'Fuentes primarias y citas de King Verse.',
      lead: 'Cada dato del sitio lleva una nota numerada que remite a esta lista. Solo usamos fuentes reales y verificables: comunicados y créditos oficiales, las obras publicadas de Stephen King y prensa especializada.',
      listLabel: 'Bibliografía',
      empty: 'La bibliografía se está reuniendo. Cada fuente se agrega aquí cuando se verifica.',
      accessed: 'Consultado el',
    },
  },
  en: {
    siteName: 'King Verse',
    skipLink: 'Skip to content',
    nav: { home: 'Home', characters: 'Characters', map: 'Map', sources: 'Sources' },
    langSwitch: { label: 'Español', title: 'Leer en español' },
    disclaimer: 'Unofficial, non-profit fan site. Not affiliated with Stephen King, Warner Bros. or HBO.',
    credits: 'Original art and text by Martín Herrera.',
    home: {
      title: 'Every 27 Years',
      description: "An unofficial, animated journey through Derry's 27-year cycles, as Welcome to Derry and the films tell them.",
      lead: 'Derry wakes up every 27 years. Travel through its cycles, from 1908 to 2016, as Welcome to Derry and the films tell them.',
      cyclesLabel: 'Derry cycles',
      gap: '+27 years',
      upcoming: 'Coming soon',
      placesTitle: 'Derry in this era',
      placesEmpty: 'The places of this era are being prepared.',
      bodyEmpty: 'Content in preparation.',
      mapLabel: 'Map of Derry',
      mapCaption: 'Illustrative map: not to scale, approximate positions.',
      placesListLabel: 'Places',
      notesLabel: 'Notes',
      eyebrow: 'Derry, Maine · an unofficial journey',
      contentNote: 'Contains horror scenes and illustrated blood.',
      cue: 'Scroll to wake Derry',
      railLabel: 'Chapters',
      prelude: 'Before 1962',
      end: 'The cycle ends here.',
      chapters: {
        '1962': { label: 'Chapter I', mood: 'Winter at the base' },
        '1988': { label: 'Chapter II', mood: 'Summer in the Barrens' },
        '2016': { label: 'Chapter III', mood: 'Canal Days' },
      } as Record<string, { label: string; mood: string }>,
      quotes: {
        '1988': { text: '“We all float down here.”', speaker: 'Pennywise', work: 'IT', year: '2017' },
      } as Record<string, Quote>,
    },
    characters: {
      title: 'Characters',
      description: 'The Losers and the people of Derry in 1962, drawn as the objects the screen ties to them.',
      lead: 'There are no faces here. Each character appears as the object the screen ties to them, drawn from scratch. Hover or focus a card and the object wakes up.',
      tocLabel: 'Sections',
      groups: {
        losers: { kicker: 'It (2017) · It Chapter Two (2019)', title: "The Losers' Club", toc: 'The Losers · 1988–89 and 2016' },
        'derry-1962': { kicker: 'IT: Welcome to Derry · season 1', title: 'Derry, 1962', toc: 'Derry · 1962' },
      },
      ties: { kicker: 'From 1962 to 2016', title: 'Ties across eras', lead: 'Two bloodlines cross the cycles.', toc: 'Ties across eras' },
      erasLabel: 'Eras',
      fear: 'Their fear',
      link: 'Tie',
      story: 'Full story',
      spoilers: '(spoilers)',
      provisional: 'Provisional object: no clear object of their own on screen.',
    },
    map: {
      title: 'Map of Derry',
      description: 'An interactive map of Derry in 1962, 1988–89 and 2016: where everything happened and who was there.',
      lead: 'The same streets, three eras. Pick a year and Derry changes: the places where it all happened, who was there and which ones come back in another era.',
      eraLegend: 'Era',
      eras: {
        '1962': { label: '1962', work: 'IT: Welcome to Derry' },
        '1988': { label: '1988–89', work: 'It' },
        '2016': { label: '2016', work: 'It Chapter Two' },
      },
      places: (n: number) => `${n} places`,
      mapLabel: 'Illustrative map of Derry',
      caption: 'Illustrative map: not to scale, approximate positions.',
      recurringKey: 'Returns in another era',
      panelTitle: 'Places',
      panelHint: 'Tap a point or an entry',
      listLabel: (era: string) => `Places in ${era}`,
      people: 'Who passes through',
      alsoIn: 'Also in',
      labels: { woods: 'Woods', farms: 'Farms' },
    },
    sources: {
      title: 'Sources',
      description: 'Primary sources and citations for King Verse.',
      lead: "Every fact on this site carries a numbered note pointing to this list. We only use real, verifiable sources: official press releases and credits, Stephen King's published works, and trade press.",
      listLabel: 'Bibliography',
      empty: 'The bibliography is being compiled. Each source is added here once verified.',
      accessed: 'Accessed',
    },
  },
} satisfies Record<Locale, unknown>;

export const otherLocale = (locale: Locale): Locale => (locale === 'es' ? 'en' : 'es');
