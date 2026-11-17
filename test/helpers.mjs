// Helpers to inspect the static build in dist/ (run after `astro build`).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

export const DIST = new URL('../dist/', import.meta.url).pathname;

export function page(route) {
  const file = join(DIST, route, 'index.html');
  if (!existsSync(file)) throw new Error(`missing page ${route} (${file})`);
  return readFileSync(file, 'utf8');
}

export function allPages(dir = DIST) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return allPages(full);
    return name.endsWith('.html') ? [relative(DIST, full)] : [];
  });
}

export const DISCLAIMER = {
  es: 'Sitio de fans no oficial y sin fines de lucro. No está afiliado a Stephen King, Warner Bros. ni HBO.',
  en: 'Unofficial, non-profit fan site. Not affiliated with Stephen King, Warner Bros. or HBO.',
};
