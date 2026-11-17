// visual-polish S1(1), S1(3), S2, S3: cinematic chapters — rail, era illustrations, hero years, motion safety.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, DISCLAIMER, page } from './helpers.mjs';

const homes = { es: page('/'), en: page('/en') };
const CYCLES = ['1908', '1935', '1962', '1988', '2016'];
const RELEASED = ['1962', '1988', '2016'];
const UPCOMING = ['1908', '1935'];
const YEARS = ['1908', '1935', '1962', '1988–89', '2016'];
const RAIL_LABEL = { es: 'Capítulos', en: 'Chapters' };

const section = (html, year) => html.split(`id="cycle-${year}"`)[1].split('</section>')[0];
const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const links = (html) =>
  [...html.matchAll(/<a\b[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], inner: m[2] }));

test('the chapter rail lists the five chapters in story order, linking to each cycle', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const nav = html.match(/<nav\b[^>]*data-rail[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, `${lang}: rail nav`);
    assert.ok(nav.match(/<nav\b[^>]*>/)[0].includes(`aria-label="${RAIL_LABEL[lang]}"`), `${lang}: rail label`);
    const items = links(nav);
    assert.deepEqual(items.map((l) => l.href), CYCLES.map((id) => `cycle-${id}`), `${lang}: rail targets`);
    assert.deepEqual(items.map((l) => textOf(l.inner)), YEARS, `${lang}: rail years`);
    // Rail targets exist on the page.
    for (const id of CYCLES) assert.match(html, new RegExp(`<section[^>]*id="cycle-${id}"`), `${lang}: cycle-${id}`);
    // No chapter is marked current in the static HTML; the script marks the one in view.
    assert.doesNotMatch(nav, /aria-current/, `${lang}: no static aria-current`);
  }
});

test('each released chapter has its own decorative era illustration; upcoming ones share a simple one', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const art = section(html, year).match(/<svg\b[^>]*data-era-art="([^"]+)"[^>]*>/);
      assert.ok(art, `${lang} ${year}: era art`);
      assert.equal(art[1], year, `${lang} ${year}: art of its own era`);
      assert.match(art[0], /aria-hidden="true"/, `${lang} ${year}: decorative`);
      assert.match(art[0], /focusable="false"/, `${lang} ${year}: not focusable`);
    }
    for (const year of UPCOMING) {
      const art = section(html, year).match(/<svg\b[^>]*data-era-art="([^"]+)"[^>]*>/);
      assert.ok(art, `${lang} ${year}: upcoming art`);
      assert.equal(art[1], 'upcoming', `${lang} ${year}: shared upcoming art`);
      assert.match(art[0], /aria-hidden="true"/, `${lang} ${year}: decorative`);
    }
  }
});

test('each released chapter shows a giant year, decorative, matching its heading', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const sec = section(html, year);
      const giant = sec.match(/<p\b[^>]*data-giant[^>]*>([\s\S]*?)<\/p>/);
      assert.ok(giant, `${lang} ${year}: giant year`);
      assert.match(giant[0], /aria-hidden="true"/, `${lang} ${year}: giant year hidden from AT`);
      const heading = sec.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)[1];
      assert.equal(textOf(giant[1]).replace(/\s/g, ''), textOf(heading), `${lang} ${year}: same year`);
    }
  }
});

test('the hero lists the cycle years 1908 to 2016 in order, linked to their chapters, with the disclaimer', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const hero = html.split('id="cycle-1908"')[0];
    const list = hero.match(/<ol\b[^>]*data-years[^>]*>[\s\S]*?<\/ol>/)?.[0];
    assert.ok(list, `${lang}: hero years list`);
    const items = links(list);
    assert.deepEqual(items.map((l) => l.href), CYCLES.map((id) => `cycle-${id}`), `${lang}: hero targets`);
    assert.deepEqual(items.map((l) => textOf(l.inner.replace(/<small\b[\s\S]*?<\/small>/g, ''))), YEARS, `${lang}: hero years`);
    assert.ok(textOf(hero).includes(DISCLAIMER[lang]), `${lang}: disclaimer visible in the hero`);
  }
});

test('each released map shows its own era statically and names the previous era for the transition', () => {
  const from = { 1962: 'none', 1988: '1962', 2016: '1988' };
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const svg = section(html, year).split('data-places')[1].match(/<svg\b[^>]*>/)[0];
      assert.match(svg, new RegExp(`data-era="${year}"`), `${lang} ${year}: static era`);
      assert.match(svg, new RegExp(`data-era-from="${from[year]}"`), `${lang} ${year}: transition from`);
    }
  }
});

test('static HTML is unpinned and fully visible; the motion script pins only behind reduced-motion checks', () => {
  for (const [lang, html] of Object.entries(homes)) {
    // Runtime-only classes never ship in markup (stylesheets may mention them; class attributes must not).
    assert.doesNotMatch(html, /class="[^"]*\b(?:pin-spacer|kv-cinema|kv-motion)\b/, `${lang}: no runtime motion state`);
    assert.doesNotMatch(html, /style="[^"]*(?:position:\s*fixed|visibility:\s*hidden|opacity:\s*0)/, `${lang}: nothing hidden inline`);
    assert.doesNotMatch(html, /data-armed/, `${lang}: nothing armed`);
  }
  const chunks = readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(DIST, '_astro', f), 'utf8'));
  // The home's own motion script (it toggles the kv-cinema class) is the one that pins.
  const motion = chunks.find((js) => js.includes('kv-cinema'));
  assert.ok(motion, 'home motion script');
  assert.match(motion, /pinSpacing/, 'the motion script pins the chapters');
  assert.match(motion, /prefers-reduced-motion: no-preference/, 'pinning is gated on reduced motion');
  assert.match(motion, /min-width: 64rem/, 'pinning is limited to wide screens');
});

test('each "+27" in the hero years sits in the same item as the year it leads to', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const list = html.match(/<ol\b[^>]*data-years[^>]*>([\s\S]*?)<\/ol>/)[1];
    const items = [...list.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1].trim());
    assert.equal(items.length, CYCLES.length, `${lang}: one item per cycle`);
    assert.doesNotMatch(items[0], /\+27/, `${lang}: the first year has no "+27"`);
    for (const item of items.slice(1)) {
      assert.match(item, /^<span\b[^>]*aria-hidden="true"[^>]*>\+27<\/span>\s*<a\b/, `${lang}: "+27" right before its year`);
    }
  }
});

test('chapters that follow a chapter are marked for the crossfade; every stage has a frame', () => {
  for (const [lang, html] of Object.entries(homes)) {
    for (const year of RELEASED) {
      const open = html.match(new RegExp(`<section\\b[^>]*id="cycle-${year}"[^>]*>`))[0];
      assert.equal(/data-follows/.test(open), year !== '1962', `${lang} ${year}: data-follows`);
      assert.match(section(html, year), /<div\b[^>]*data-frame/, `${lang} ${year}: stage frame`);
    }
  }
});
