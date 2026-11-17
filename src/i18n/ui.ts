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
  },
  en: {
    siteName: 'King Verse',
    skipLink: 'Skip to content',
    nav: { home: 'Home', sources: 'Sources' },
    langSwitch: { label: 'Español', title: 'Leer en español' },
    disclaimer: 'Unofficial, non-profit fan site. Not affiliated with Stephen King, Warner Bros. or HBO.',
    credits: 'Original art and text by Martín Herrera.',
  },
} satisfies Record<Locale, unknown>;

export const otherLocale = (locale: Locale): Locale => (locale === 'es' ? 'en' : 'es');
