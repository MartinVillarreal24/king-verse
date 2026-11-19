// characters S1–S5: the characters page in both locales, drawn as objects, every fact cited.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, allPages, page } from './helpers.mjs';

const ROUTES = { es: '/personajes/', en: '/en/characters/' };
const SOURCES = { es: '/fuentes/', en: '/en/sources/' };
const pages = { es: page('/personajes'), en: page('/en/characters') };
const sourcePages = { es: page('/fuentes'), en: page('/en/sources') };
const LOSERS = ['bill', 'ben', 'beverly', 'richie', 'eddie', 'mike', 'stan'];
const DERRY = ['will', 'leroy', 'charlotte', 'lilly', 'ronnie', 'rich', 'marge', 'hallorann', 'pauly'];
const NOTE = /<a[^>]*data-note[^>]*>\[\d+\]<\/a>/;

const cards = (html) =>
  [...html.matchAll(/<li\b[^>]*data-character="([\w-]+)"[^>]*>([\s\S]*?)<\/li>\s*(?=<li\b[^>]*data-character|<\/ul>)/g)].map(
    (m) => ({ id: m[1], html: m[2] }),
  );
const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

test('the characters page exists in both locales and links its alternate', () => {
  assert.match(pages.es, /<html lang="es"/);
  assert.match(pages.en, /<html lang="en"/);
  for (const html of Object.values(pages)) {
    assert.match(html, /<link rel="alternate" hreflang="es" href="[^"]*\/personajes\/"/);
    assert.match(html, /<link rel="alternate" hreflang="en" href="[^"]*\/en\/characters\/"/);
  }
  assert.match(pages.es, /<a [^>]*href="\/en\/characters\/"[^>]*hreflang="en"/);
  assert.match(pages.en, /<a [^>]*href="\/personajes\/"[^>]*hreflang="es"/);
});

test('every page links the characters page from the main nav, marked current on it', () => {
  for (const rel of allPages()) {
    const html = readFileSync(join(DIST, rel), 'utf8');
    const lang = html.match(/<html lang="(\w+)"/)[1];
    const nav = html.match(/<nav\b[\s\S]*?<\/nav>/)[0];
    assert.match(nav, new RegExp(`href="${ROUTES[lang]}"`), `${rel}: nav link`);
  }
  for (const [lang, html] of Object.entries(pages)) {
    assert.match(html, new RegExp(`<a href="${ROUTES[lang]}" aria-current="page"`), `${lang}: current`);
  }
});

test('the seven Losers come first, then the nine people of Derry in 1962', () => {
  for (const [lang, html] of Object.entries(pages)) {
    assert.deepEqual(cards(html).map((c) => c.id), [...LOSERS, ...DERRY], lang);
    const losers = html.split('id="losers"')[1].split('</section>')[0];
    const derry = html.split('id="derry-1962"')[1].split('</section>')[0];
    assert.deepEqual(cards(losers).map((c) => c.id), LOSERS, `${lang}: losers section`);
    assert.deepEqual(cards(derry).map((c) => c.id), DERRY, `${lang}: 1962 section`);
  }
});

test('each character is drawn as a named object, never a face: decorative art plus a visible caption', () => {
  for (const [lang, html] of Object.entries(pages)) {
    for (const card of cards(html)) {
      const svg = card.html.match(/<svg\b[^>]*data-object="[\w-]+"[^>]*>/)?.[0];
      assert.ok(svg, `${lang} ${card.id}: object art`);
      assert.match(svg, /aria-hidden="true"/);
      assert.ok(textOf(card.html.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''), `${lang} ${card.id}: caption`);
      assert.doesNotMatch(card.html, /<img\b/, `${lang} ${card.id}: no raster image`);
    }
  }
});

test('every sentence on a card carries a numbered note that resolves on the sources page', () => {
  for (const [lang, html] of Object.entries(pages)) {
    for (const card of cards(html)) {
      const sentences = [...card.html.matchAll(/<span\b[^>]*data-sentence[^>]*>([\s\S]*?)<\/span>(?=\s*(?:<span\b[^>]*data-sentence|<\/p>))/g)];
      assert.ok(sentences.length >= 3, `${lang} ${card.id}: ${sentences.length} sentences`);
      for (const [, s] of sentences) assert.match(s, NOTE, `${lang} ${card.id}: "${textOf(s).slice(0, 50)}" has no note`);
    }
    for (const [, href, id, n] of html.matchAll(/<a data-note href="([^"#]+)#source-([\w-]+)" aria-label="[^"]* (\d+)"/g)) {
      assert.equal(href, SOURCES[lang]);
      const list = [...sourcePages[lang].matchAll(/<li id="source-([\w-]+)"/g)].map((m) => m[1]);
      assert.equal(list.indexOf(id) + 1, Number(n), `${lang}: note ${n} is ${id} on the sources page`);
    }
  }
});

test('Losers show their fear, the full story sits behind a spoiler toggle, and Stan carries a content note', () => {
  for (const [lang, html] of Object.entries(pages)) {
    for (const card of cards(html)) {
      assert.match(card.html, /<details\b[\s\S]*?<summary\b[\s\S]*?<\/summary>[\s\S]*?data-sentence[\s\S]*?<\/details>/, `${lang} ${card.id}: story`);
      assert.equal(/data-fear/.test(card.html), LOSERS.includes(card.id), `${lang} ${card.id}: fear only for Losers`);
    }
    const stan = cards(html).find((c) => c.id === 'stan').html;
    assert.match(stan, /data-content-note/, `${lang}: Stan content note`);
  }
});

test('the provisional objects of Leroy, Charlotte and Pauly are marked as such', () => {
  for (const [lang, html] of Object.entries(pages)) {
    const marked = cards(html).filter((c) => /data-provisional/.test(c.html)).map((c) => c.id);
    assert.deepEqual(marked, ['leroy', 'charlotte', 'pauly'], lang);
  }
});

test('ties across eras link the Hanlon and Tozier lines to their cards', () => {
  for (const [lang, html] of Object.entries(pages)) {
    const ties = html.split('id="ties"')[1].split('</section>')[0];
    for (const id of ['leroy', 'charlotte', 'will', 'mike', 'marge', 'richie']) assert.match(ties, new RegExp(`href="#${id}"`), `${lang}: ${id}`);
    assert.match(ties, NOTE, `${lang}: ties cited`);
  }
});

test('the object motion only runs for people who have not asked for reduced motion', () => {
  const css = [
    ...readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(DIST, '_astro', f), 'utf8')),
    ...[...pages.es.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]),
  ].join('\n');
  const uses = [...css.matchAll(/animation:[^;}]*\bobj-[\w-]+/g)];
  assert.ok(uses.length > 0, 'object animations exist');
  for (const use of uses) {
    const before = css.slice(0, use.index);
    const open = before.lastIndexOf('@media');
    assert.ok(open !== -1 && /prefers-reduced-motion:\s*no-preference/.test(before.slice(open, open + 80)), `ungated: ${use[0]}`);
  }
});
