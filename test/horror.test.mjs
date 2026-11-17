// horror-motion S1, S2, S3, S5: floating balloons, an implied It, blood accents (design/home-cinematic/04).
// Checks the static build only: every effect is decorative and hidden from AT, the page ships at rest (nothing
// running, nothing hidden), and the motion script gates on reduced motion and on a fine pointer.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, page } from './helpers.mjs';

const homes = { es: page('/'), en: page('/en') };
const RELEASED = ['1962', '1988', '2016'];
const QUOTE = {
  es: { text: '«Aquí abajo todos flotan.»', caption: '— Pennywise, IT (2017)' },
  en: { text: '“We all float down here.”', caption: '— Pennywise, IT (2017)' },
};

const section = (html, year) => html.split(`id="cycle-${year}"`)[1].split('</section>')[0];
const hero = (html) => html.match(/<section\b[^>]*data-hero[^>]*>[\s\S]*?<\/section>/)[0];
const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const eraArt = (html, year) => section(html, year).match(new RegExp(`<svg\\b[^>]*data-era-art="${year}"[^>]*>[\\s\\S]*?</svg>`))[0];
const openTag = (html, hook) => html.match(new RegExp(`<[a-z]+\\b[^>]*\\b${hook}\\b[^>]*>`))?.[0];

test('the 1988–89 chapter quotes Pennywise once, short and attributed, in each locale', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const figures = html.match(/<figure\b[^>]*data-quote[^>]*>[\s\S]*?<\/figure>/g) ?? [];
    assert.equal(figures.length, 1, `${lang}: one quote on the page`);
    const sec = section(html, '1988');
    const figure = sec.match(/<figure\b[^>]*data-quote[^>]*>[\s\S]*?<\/figure>/)?.[0];
    assert.ok(figure, `${lang}: quote in the 1988 chapter`);
    const quote = figure.match(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/)?.[1];
    assert.equal(textOf(quote ?? ''), QUOTE[lang].text, `${lang}: quote text`);
    const caption = figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/)?.[1];
    assert.equal(textOf(caption ?? '').replace(/\s+([,)])/g, '$1').replace(/\(\s+/g, '('), QUOTE[lang].caption, `${lang}: attribution`);
    assert.match(caption, /<cite\b[^>]*>IT<\/cite>/, `${lang}: work cited`);
  }
});

test('the drain eyes and the white glove live in the 1988–89 art; the clown shadow on the 2016 wall', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const art88 = eraArt(html, '1988');
    assert.match(art88.match(/<svg\b[^>]*>/)[0], /aria-hidden="true"/, `${lang}: 1988 art decorative`);
    for (const hook of ['data-eyes', 'data-pupil', 'data-glove', 'data-boat', 'data-rain', 'data-lamp-it']) {
      assert.ok(openTag(art88, hook), `${lang}: 1988 art has ${hook}`);
    }
    assert.equal((art88.match(/\bdata-pupil\b/g) ?? []).length, 2, `${lang}: two pupils`);
    const art16 = eraArt(html, '2016');
    assert.ok(openTag(art16, 'data-clown-shadow'), `${lang}: 2016 clown shadow`);
    assert.ok(openTag(art16, 'data-lamp'), `${lang}: 2016 fun-house lamp`);
    const art62 = eraArt(html, '1962');
    assert.ok(openTag(art62, 'data-seep'), `${lang}: 1962 red glow under the ice`);
    assert.ok((art62.match(/\bdata-lamp\b/g) ?? []).length >= 3, `${lang}: 1962 base lamps`);
    // Only hinted: no other chapter carries It.
    assert.doesNotMatch(eraArt(html, '1962') + art16, /data-eyes|data-glove/, `${lang}: eyes and glove only in 1988`);
  }
});

test('on narrow screens the 1988–89 art reframes on the storm drain; desktop keeps the centered crop', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const svg = eraArt(html, '1988').match(/<svg\b[^>]*>/)[0];
    assert.match(svg, /data-narrow-focus="drain"/, `${lang}: 1988 art carries the narrow framing hook`);
    assert.match(svg, /preserveAspectRatio="xMidYMid slice"/, `${lang}: desktop crop unchanged`);
  }
  const css = readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(join(DIST, '_astro', f), 'utf8')).join('\n');
  // Every rule on the hook sits inside a media query below the 64rem cinema breakpoint (phones and tablets), so
  // desktop is untouched.
  const rules = [...css.matchAll(/([^{}]*\[data-narrow-focus="?drain"?\][^{}]*)\{([^}]*)\}/g)];
  assert.ok(rules.length > 0, 'a framing rule targets the hook');
  for (const rule of rules) {
    const before = css.slice(0, rule.index);
    const media = before.slice(before.lastIndexOf('@media')).match(/^@media\s*([^{]*)\{/)?.[1] ?? '';
    const max = media.match(/\((?:max-width:\s*|width\s*<=?\s*)([\d.]+)rem\)/)?.[1];
    assert.ok(max && Number(max) >= 48 && Number(max) < 64, `framing rule only below the 64rem desktop breakpoint: ${media}`);
    assert.doesNotMatch(media, /min-width|width\s*>/, `framing rule has no lower bound: ${media}`);
    assert.doesNotMatch(before.slice(before.lastIndexOf('@media')), /\}\s*\}/, 'rule is inside the media block');
    const decl = rule[2];
    assert.match(decl, /aspect-ratio:\s*16\s*\/\s*9/, 'art keeps its 16:9 box');
    assert.match(decl, /max-width:\s*none/, 'the box may overflow the stage');
    // Anchored right (drain at x 1290–1490 of 1600) and raised (drain above the giant year).
    assert.match(decl, /(?:inset:\s*-\d+%\s+0\s+auto\s+auto|right:\s*0)/, 'anchored to the right edge');
    assert.match(decl, /(?:inset|top):\s*-\d+%/, 'raised above the giant year');
  }
});

test('blood accents are decorative: title drip, hero year drips, giant year drips, lake seep and one wipe', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const h = hero(html);
    const title = h.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1];
    const drip = title.match(/<span\b[^>]*class="[^"]*\bt-drip\b[^"]*"[^>]*>/)?.[0];
    assert.ok(drip, `${lang}: title drip`);
    assert.match(drip, /aria-hidden="true"/, `${lang}: title drip hidden`);
    assert.equal(textOf(title), lang === 'es' ? 'Cada 27 años' : 'Every 27 Years', `${lang}: title text unchanged`);
    // The drip hangs from the last word ("años" / "Years").
    assert.match(title, new RegExp(`${lang === 'es' ? 'años' : 'Years'}<span\\b[^>]*t-drip`), `${lang}: drip on the last word`);
    const scene = h.match(/<svg\b[^>]*data-scene[^>]*>[\s\S]*?<\/svg>/)[0];
    assert.ok(openTag(scene, 'data-seep'), `${lang}: red seep in the hero lake`);
    for (const year of RELEASED) {
      const giant = section(html, year).match(/<p\b[^>]*data-giant[^>]*>[\s\S]*?<\/p>/)[0];
      assert.match(giant.match(/<p\b[^>]*>/)[0], /aria-hidden="true"/, `${lang} ${year}: giant hidden`);
      assert.equal((giant.match(/\bdata-drip\b/g) ?? []).length, 2, `${lang} ${year}: two dripping digits`);
    }
    const wipes = html.match(/<div\b[^>]*data-wipe[^>]*>/g) ?? [];
    assert.equal(wipes.length, 1, `${lang}: one wipe layer`);
    assert.match(wipes[0], /aria-hidden="true"/, `${lang}: wipe hidden`);
  }
});

test('balloons float at three depths in the hero and every chapter, with one drifter each', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const scenes = { hero: hero(html), ...Object.fromEntries(RELEASED.map((y) => [y, section(html, y)])) };
    for (const [name, sec] of Object.entries(scenes)) {
      const field = sec.match(/<div\b[^>]*data-field[^>]*>[\s\S]*?<\/div>/)?.[0];
      assert.ok(field, `${lang} ${name}: balloon field`);
      assert.match(field.match(/<div\b[^>]*>/)[0], /aria-hidden="true"/, `${lang} ${name}: field hidden`);
      for (const depth of ['fb-near', 'fb-mid', 'fb-far']) assert.match(field, new RegExp(`\\b${depth}\\b`), `${lang} ${name}: ${depth}`);
      assert.equal((field.match(/\bfb-drift\b/g) ?? []).length, 1, `${lang} ${name}: one drifter`);
    }
  }
});

test('the static HTML ships at rest: no running effect state, nothing hidden inline', () => {
  for (const [lang, html] of Object.entries(homes)) {
    assert.doesNotMatch(html, /class="[^"]*\b(?:is-wiping|is-lit|is-close|is-on)\b/, `${lang}: no runtime effect classes`);
    assert.doesNotMatch(html, /style="[^"]*(?:opacity:\s*0(?![.\d])|visibility:\s*hidden|display:\s*none)/, `${lang}: nothing hidden inline`);
  }
});

test('the motion script gates the effects on reduced motion and the eyes on a fine pointer', () => {
  const chunks = readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(DIST, '_astro', f), 'utf8'));
  const motion = chunks.find((js) => js.includes('kv-cinema'));
  assert.ok(motion, 'home motion script');
  assert.match(motion, /prefers-reduced-motion: no-preference/, 'effects gated on reduced motion');
  assert.match(motion, /\(pointer: fine\)/, 'pointer tracking gated on a fine pointer');
  assert.match(motion, /data-eyes/, 'eyes are driven by the motion script');
  assert.match(motion, /is-wiping/, 'the wipe is armed by the motion script');
});
