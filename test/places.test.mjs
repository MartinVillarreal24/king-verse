// cycle-content S3, S4: per-era Derry mini-map with clickable, keyboard-accessible places; notes numbered in order.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const homes = { es: page('/'), en: page('/en') };
const sources = { es: page('/fuentes'), en: page('/en/sources') };
const RELEASED = ['1962', '1988', '2016'];
const UPCOMING = ['1908', '1935'];
const CAPTION = {
  es: 'Mapa ilustrativo: no a escala, posiciones aproximadas.',
  en: 'Illustrative map: not to scale, approximate positions.',
};
const PLACES_EMPTY = {
  es: 'Los lugares de esta época están en preparación.',
  en: 'The places of this era are being prepared.',
};
const UPCOMING_LABEL = { es: 'Próximamente', en: 'Coming soon' };

const section = (html, year) => html.split(`id="cycle-${year}"`)[1].split('</section>')[0];
const placesBlock = (sec) => sec.slice(sec.indexOf('data-places'));
const points = (sec) =>
  [...sec.matchAll(/<a\b[^>]*data-point[^>]*>/g)].map((m) => ({
    href: m[0].match(/href="([^"]*)"/)?.[1],
    label: m[0].match(/aria-label="([^"]*)"/)?.[1],
  }));
const placeItems = (sec) =>
  [...sec.matchAll(/<li\b([^>]*\bid="(place-[\w-]+)"[^>]*)>([\s\S]*?)<\/li>/g)].map((m) => ({
    attrs: m[1],
    id: m[2],
    body: m[3],
  }));
const noteNumbers = (html) => [...html.matchAll(/<a[^>]*data-note[^>]*>\[(\d+)\]<\/a>/g)].map((m) => Number(m[1]));

test('1962 renders a Derry mini-map with its places', () => {
  for (const html of Object.values(homes)) {
    const sec = section(html, '1962');
    assert.equal((sec.match(/data-map\b/g) ?? []).length, 1, 'one map');
    assert.ok(points(sec).length > 0, 'points');
  }
});

test('each released cycle with places has one map, one point per list item, linked by number', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const sec = section(html, year);
      const block = placesBlock(sec);
      if (!/data-map\b/.test(block)) {
        assert.ok(block.includes(PLACES_EMPTY[lang]), `${lang} ${year}: no places yet text`);
        continue;
      }
      assert.equal((block.match(/data-map\b/g) ?? []).length, 1, `${lang} ${year}: one map`);
      assert.match(block, /<svg\b/, `${lang} ${year}: svg map`);
      const pts = points(block);
      const items = placeItems(block);
      assert.equal(pts.length, items.length, `${lang} ${year}: points = list items`);
      const ids = new Set(items.map((i) => i.id));
      pts.forEach((p, i) => {
        assert.ok(p.href?.startsWith(`#place-${year}-`), `${lang} ${year}: point href ${p.href}`);
        assert.ok(ids.has(p.href.slice(1)), `${lang} ${year}: point targets an li in the section (${p.href})`);
        assert.ok(p.label?.startsWith(`${i + 1}. `), `${lang} ${year}: point aria-label "${p.label}" starts with ${i + 1}`);
        assert.equal(p.href.slice(1), items[i].id, `${lang} ${year}: point ${i + 1} matches list item ${i + 1}`);
      });
      for (const item of items) {
        assert.match(item.attrs, /tabindex="-1"/, `${lang} ${item.id}: focusable target`);
      }
    }
  }
});

test('the map shows its illustrative caption in each language', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const block = placesBlock(section(html, '1962'));
    const caption = block.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? '';
    assert.equal(caption.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), CAPTION[lang]);
  }
});

test('every place cites at least one source with a numbered note', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      for (const item of placeItems(section(html, year))) {
        assert.match(item.body, /<a[^>]*data-note[^>]*>\[\d+\]<\/a>/, `${lang} ${item.id}: note`);
      }
    }
  }
});

test('upcoming cycles render no map and say coming soon in their places block', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of UPCOMING) {
      const block = placesBlock(section(html, year));
      assert.doesNotMatch(block, /data-map\b|data-point/, `${lang} ${year}: no map`);
      assert.ok(block.includes(UPCOMING_LABEL[lang]), `${lang} ${year}: coming soon in places`);
    }
  }
});

test('on each home the first appearances of note numbers read 1, 2, 3... in order', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const firsts = [...new Set(noteNumbers(html))];
    assert.ok(firsts.length > 0, `${lang}: notes`);
    assert.deepEqual(firsts, firsts.map((_, i) => i + 1), `${lang}: first appearances`);
  }
});

test('the sources page lists sources in note order: source N on the page is item N', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const listed = [...sources[lang].matchAll(/<li[^>]*id="source-([\w-]+)"/g)].map((m) => m[1]);
    for (const m of html.matchAll(/<a[^>]*data-note[^>]*href="[^"#]*#source-([\w-]+)"[^>]*>\[(\d+)\]<\/a>/g)) {
      assert.equal(listed.indexOf(m[1]) + 1, Number(m[2]), `${lang}: ${m[1]} is note ${m[2]}`);
    }
  }
});

test('a place that appears in several eras keeps the same position on every map', () => {
  for (const html of Object.values(homes)) {
    const positions = new Map();
    for (const m of html.matchAll(/<a[^>]*data-point[^>]*href="#place-(\d{4})-([\w-]+)"[^>]*>\s*<circle[^>]*cx="(\d+)" cy="(\d+)"/g)) {
      const [, year, id, cx, cy] = m;
      const seen = positions.get(id);
      if (seen) assert.equal(`${cx},${cy}`, seen.at, `${id} in ${year} moved from ${seen.year}`);
      else positions.set(id, { year, at: `${cx},${cy}` });
    }
    assert.ok(positions.size >= 7, `parsed ${positions.size} places`);
  }
});
