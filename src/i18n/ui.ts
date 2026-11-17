// UI strings and routes for both locales. Spanish (neutral "tú") is the default; English mirrors it.
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

// Every page exists in both locales; the layout uses this map for the language switch and hreflang.
export const routes = {
  home: { es: '/', en: '/en/' },
  sources: { es: '/fuentes/', en: '/en/sources/' },
} as const;
export type RouteKey = keyof typeof routes;

export const ui = {
  es: {
    siteName: 'King Verse',
    skipLink: 'Saltar al contenido',
    nav: { home: 'Inicio', sources: 'Fuentes' },
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
      notesLabel: 'Notas',
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
    nav: { home: 'Home', sources: 'Sources' },
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
      notesLabel: 'Notes',
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
