// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Vercel's default URL for now; switch to the martinherrera.dev subdomain once it is picked.
  // Used for absolute canonical and hreflang URLs.
  site: 'https://king-verse-pi.vercel.app',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // Spanish at the root (/), English under /en/.
      prefixDefaultLocale: false,
    },
  },
  trailingSlash: 'always',
});
