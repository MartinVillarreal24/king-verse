// S4, S5, S6, S8: Derry scene, five screen-chronology cycles with their Derry places, sources page, motion safety.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, allPages, page } from './helpers.mjs';

const homes = { es: page('/'), en: page('/en') };
const sources = { es: page('/fuentes'), en: page('/en/sources') };
const CYCLES = ['1908', '1935', '1962', '1988', '2016'];

test('each home shows the decorative Derry scene with the red balloon', () => {
  for (const html of Object.values(homes)) {
    const scene = html.match(/<svg[^>]*data-scene[^>]*>/)?.[0];
    assert.ok(scene, 'scene svg');
    assert.match(scene, /aria-hidden="true"/);
    assert.match(html, /data-balloon/);
  }
});

test('each home has the five cycles in story order, each opening its Derry places', () => {
  for (const html of Object.values(homes)) {
    const ids = [...html.matchAll(/<section[^>]*id="cycle-(\d{4})"/g)].map((m) => m[1]);
    assert.deepEqual(ids, CYCLES);
    assert.match(html, /1988–89/);
    for (const year of CYCLES) {
      const section = html.split(`id="cycle-${year}"`)[1].split('</section>')[0];
      assert.match(section, /data-places/, `cycle ${year} places`);
    }
  }
});

test('upcoming seasons are marked as upcoming in each language', () => {
  const label = { es: 'Próximamente', en: 'Coming soon' };
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of ['1908', '1935']) {
      const section = html.split(`id="cycle-${year}"`)[1].split('</section>')[0];
      assert.match(section, /data-upcoming/);
      assert.ok(section.includes(label[lang]), `${lang} ${year} upcoming label`);
    }
  }
});

test('no novel years or speculative cycles appear on any page', () => {
  for (const rel of allPages()) {
    const text = readFileSync(join(DIST, rel), 'utf8').replace(/<[^>]+>/g, ' ');
    for (const year of ['1957', '1958', '1984', '1985', '2043']) {
      assert.ok(!text.includes(year), `${rel} mentions ${year}`);
    }
  }
});

test('each sources page links its alternate and every inline note points to a listed source', () => {
  assert.match(sources.es, /<html lang="es"/);
  assert.match(sources.en, /<html lang="en"/);
  assert.match(sources.es, /<a [^>]*href="\/en\/sources\/"[^>]*hreflang="en"/);
  assert.match(sources.en, /<a [^>]*href="\/fuentes\/"[^>]*hreflang="es"/);
  for (const [lang, html] of Object.entries(sources)) {
    assert.match(html, /<h1[^>]*>/);
    assert.match(html, /data-sources/);
    const listed = new Set([...html.matchAll(/<li[^>]*id="(source-[\w-]+)"/g)].map((m) => m[1]));
    const sourcesPath = lang === 'es' ? '/fuentes/' : '/en/sources/';
    for (const m of homes[lang].matchAll(/<a[^>]*data-note[^>]*href="([^"]+)"/g)) {
      const [path, id] = m[1].split('#');
      assert.equal(path, sourcesPath);
      assert.ok(listed.has(id), `${lang}: note to unknown ${id}`);
    }
  }
});

test('content is readable without JS and motion respects reduced-motion', () => {
  for (const html of Object.values(homes)) {
    // Nothing is hidden or pre-armed in the static HTML; the script arms animations at runtime.
    assert.doesNotMatch(html, /data-armed|style="[^"]*opacity:\s*0/);
  }
  const js = readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(DIST, '_astro', f), 'utf8')).join('\n');
  assert.match(js, /prefers-reduced-motion/);
  assert.match(js, /ScrollTrigger/);
});
