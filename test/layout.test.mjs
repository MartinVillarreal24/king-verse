// S2, S3: es at /, en at /en/, disclaimer visible on every page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, DISCLAIMER, allPages, page } from './helpers.mjs';

test('Spanish is the default locale at / and English lives at /en/', () => {
  assert.match(page('/'), /<html lang="es"/);
  assert.match(page('/en'), /<html lang="en"/);
});

test('each home links its alternate language and declares hreflang', () => {
  const es = page('/');
  const en = page('/en');
  assert.match(es, /<a [^>]*href="\/en\/"[^>]*hreflang="en"/);
  assert.match(en, /<a [^>]*href="\/"[^>]*hreflang="es"/);
  for (const html of [es, en]) {
    assert.match(html, /<link rel="alternate" hreflang="es" href="[^"]*\/"/);
    assert.match(html, /<link rel="alternate" hreflang="en" href="[^"]*\/en\/"/);
  }
});

test('every page shows the disclaimer in its own language', () => {
  const pages = allPages();
  assert.ok(pages.length >= 2, `expected built pages, got ${pages.length}`);
  for (const rel of pages) {
    const html = readFileSync(join(DIST, rel), 'utf8');
    const lang = html.match(/<html lang="(\w+)"/)?.[1];
    assert.ok(lang in DISCLAIMER, `${rel}: unknown lang ${lang}`);
    const block = html.match(/<p[^>]*data-disclaimer[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '';
    assert.equal(block.replace(/\s+/g, ' ').trim(), DISCLAIMER[lang], `${rel}: disclaimer`);
    // Visible: not hidden with attributes or a visually-hidden class.
    assert.doesNotMatch(html.match(/<p[^>]*data-disclaimer[^>]*>/)[0], /hidden|sr-only/);
  }
});
