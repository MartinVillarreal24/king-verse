// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Hosted on Vercel's default URL for now; set `site` once the martinherrera.dev subdomain is picked
  // (canonical and hreflang URLs become absolute then).
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
