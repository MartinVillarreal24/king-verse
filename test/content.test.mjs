// cycle-content S1, S2, S3, S5, S6: body text per released cycle, cited sentence by sentence, and era places.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, allPages, page } from './helpers.mjs';

const homes = { es: page('/'), en: page('/en') };
const RELEASED = ['1962', '1988', '2016'];
const UPCOMING = ['1908', '1935'];
const PLACEHOLDER = { es: 'Contenido en preparación.', en: 'Content in preparation.' };
const NOTE = /<a[^>]*data-note[^>]*>\[\d+\]<\/a>/;
const PLACES = {
  1988: ['storm-drain', 'kissing-bridge', 'barrens', 'quarry', 'neibolt', 'library', 'cistern'],
  2016: ['kissing-bridge', 'jade', 'library', 'fun-house', 'neibolt', 'quarry'],
};

const section = (html, year) => html.split(`id="cycle-${year}"`)[1].split('</section>')[0];
const bodyOf = (sec) => sec.match(/<div\b[^>]*data-body[^>]*>([\s\S]*?)<\/div>/)?.[1];
const paragraphs = (body) => [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
const sentences = (body) =>
  [...body.matchAll(/<span\b[^>]*data-sentence[^>]*>([\s\S]*?)<\/span>(?=\s*(?:<span\b[^>]*data-sentence|<\/p>))/g)].map(
    (m) => m[1],
  );
const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('each released cycle has one or two body paragraphs in each locale, with notes', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const body = bodyOf(section(html, year));
      assert.ok(body, `${lang} ${year}: data-body`);
      const ps = paragraphs(body);
      assert.ok(ps.length >= 1 && ps.length <= 2, `${lang} ${year}: ${ps.length} paragraphs`);
      for (const p of ps) assert.match(p, NOTE, `${lang} ${year}: paragraph note`);
      assert.ok(!body.includes(PLACEHOLDER[lang]), `${lang} ${year}: placeholder gone`);
    }
  }
});

test('every body sentence carries at least one numbered note', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const body = bodyOf(section(html, year)) ?? '';
      const list = sentences(body);
      assert.ok(list.length > 0, `${lang} ${year}: sentences`);
      for (const s of list) assert.match(s, NOTE, `${lang} ${year}: "${textOf(s).trim().slice(0, 60)}" has no note`);
    }
  }
});

test('released cycles drop the placeholder; upcoming cycles keep it', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) assert.ok(!section(html, year).includes(PLACEHOLDER[lang]), `${lang} ${year}`);
    for (const year of UPCOMING) assert.ok(section(html, year).includes(PLACEHOLDER[lang]), `${lang} ${year}`);
  }
});

test('1988 and 2016 render a mini-map whose points match their places, in order', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const [year, ids] of Object.entries(PLACES)) {
      const block = section(html, year).split('data-places')[1];
      assert.equal((block.match(/data-map\b/g) ?? []).length, 1, `${lang} ${year}: one map`);
      const hrefs = [...block.matchAll(/<a\b[^>]*data-point[^>]*href="#([^"]+)"/g)].map((m) => m[1]);
      const items = [...block.matchAll(/<li\b[^>]*id="(place-[\w-]+)"/g)].map((m) => m[1]);
      const expected = ids.map((id) => `place-${year}-${id}`);
      assert.deepEqual(items, expected, `${lang} ${year}: list items`);
      assert.deepEqual(hrefs, expected, `${lang} ${year}: points`);
    }
  }
});

test('conflicting or unverified facts never appear on any page', () => {
  for (const rel of allPages()) {
    const text = textOf(readFileSync(join(DIST, rel), 'utf8')).toLowerCase();
    for (const banned of ['1986', 'fence post', 'poste', 'sqoteawapskot']) {
      assert.ok(!text.includes(banned), `${rel} mentions "${banned}"`);
    }
  }
});
