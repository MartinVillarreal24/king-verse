// derry-map S1–S4: the interactive Derry map page in both locales, three eras, every place cited and linked to its people.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, allPages, page } from './helpers.mjs';

const ROUTES = { es: '/mapa/', en: '/en/map/' };
const CHARACTERS = { es: '/personajes/', en: '/en/characters/' };
const SOURCES = { es: '/fuentes/', en: '/en/sources/' };
const pages = { es: page('/mapa'), en: page('/en/map') };
const homes = { es: page('/'), en: page('/en') };
const characterPages = { es: page('/personajes'), en: page('/en/characters') };
const sourcePages = { es: page('/fuentes'), en: page('/en/sources') };
const ERAS = { 1962: 12, 1988: 13, 2016: 12 };
const NOTE = /<a[^>]*data-note[^>]*>\[\d+\]<\/a>/;
const CAPTION = {
  es: 'Mapa ilustrativo: no a escala, posiciones aproximadas.',
  en: 'Illustrative map: not to scale, approximate positions.',
};

const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const list = (html, era) => html.match(new RegExp(`<ol\\b[^>]*data-era="${era}"[^>]*>([\\s\\S]*?)</ol>\\s*(?=<ol\\b|</section>)`))?.[1] ?? '';
const items = (block) =>
  [...block.matchAll(/<li\b[^>]*\bid="(map-\d{4}-[\w-]+)"[^>]*>([\s\S]*?)<\/li>\s*(?=<li\b[^>]*\bid="map-|$)/g)].map((m) => ({ id: m[1], html: m[2] }));
const pointGroup = (html, era) => html.match(new RegExp(`<g\\b[^>]*data-points="${era}"[^>]*>([\\s\\S]*?)</g>\\s*(?=<g\\b[^>]*data-points|</svg>)`))?.[1] ?? '';
const points = (group) =>
  [...group.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: m[1].match(/href="([^"]*)"/)?.[1],
    label: m[1].match(/aria-label="([^"]*)"/)?.[1],
    recurring: /data-recurring/.test(m[1]),
    cx: m[2].match(/class="pin" cx="([\d.]+)"/)?.[1],
    cy: m[2].match(/class="pin" cx="[\d.]+" cy="([\d.]+)"/)?.[1],
  }));

test('the map page exists in both locales and links its alternate', () => {
  assert.match(pages.es, /<html lang="es"/);
  assert.match(pages.en, /<html lang="en"/);
  for (const html of Object.values(pages)) {
    assert.match(html, /<link rel="alternate" hreflang="es" href="[^"]*\/mapa\/"/);
    assert.match(html, /<link rel="alternate" hreflang="en" href="[^"]*\/en\/map\/"/);
  }
  assert.match(pages.es, /<a [^>]*href="\/en\/map\/"[^>]*hreflang="en"/);
  assert.match(pages.en, /<a [^>]*href="\/mapa\/"[^>]*hreflang="es"/);
});

test('every page links the map from the main nav, marked current on it', () => {
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

test('the era switch is three native radio buttons, 1962 first and checked', () => {
  for (const [lang, html] of Object.entries(pages)) {
    const radios = [...html.matchAll(/<input\b[^>]*type="radio"[^>]*>/g)].map((m) => m[0]);
    assert.equal(radios.length, 3, lang);
    assert.deepEqual(radios.map((r) => r.match(/value="(\d+)"/)[1]), Object.keys(ERAS), lang);
    assert.ok(radios.every((r) => /name="era"/.test(r)), `${lang}: one group`);
    assert.match(radios[0], /checked/, `${lang}: 1962 checked`);
    for (const r of radios) assert.match(html, new RegExp(`<label for="${r.match(/id="([\w-]+)"/)[1]}"`), `${lang}: label`);
    assert.match(html, /<fieldset\b[\s\S]*?<legend\b/, `${lang}: grouped with a legend`);
  }
});

test('each era lists its places, one numbered point per entry, linked by anchor', () => {
  for (const [lang, html] of Object.entries(pages)) {
    for (const [era, count] of Object.entries(ERAS)) {
      const entries = items(list(html, era));
      const pts = points(pointGroup(html, era));
      assert.equal(entries.length, count, `${lang} ${era}: ${entries.length} places`);
      assert.equal(pts.length, count, `${lang} ${era}: ${pts.length} points`);
      pts.forEach((p, i) => {
        assert.equal(p.href, `#${entries[i].id}`, `${lang} ${era}: point ${i + 1}`);
        assert.ok(p.label?.startsWith(`${i + 1}. `), `${lang} ${era}: label "${p.label}"`);
        assert.ok(entries[i].id.startsWith(`map-${era}-`), `${lang} ${era}: ${entries[i].id}`);
      });
    }
  }
});

test('every sentence about a place and its people carries a note that resolves on the sources page', () => {
  for (const [lang, html] of Object.entries(pages)) {
    for (const era of Object.keys(ERAS)) {
      for (const entry of items(list(html, era))) {
        const sentences = [...entry.html.matchAll(/<span\b[^>]*data-sentence[^>]*>([\s\S]*?)<\/span>(?=\s*(?:<span\b[^>]*data-sentence|<\/p>))/g)];
        assert.ok(sentences.length >= 1, `${lang} ${entry.id}: sentences`);
        for (const [, s] of sentences) assert.match(s, NOTE, `${lang} ${entry.id}: "${textOf(s).slice(0, 50)}" has no note`);
      }
    }
    const order = [...sourcePages[lang].matchAll(/<li id="source-([\w-]+)"/g)].map((m) => m[1]);
    for (const [, href, id, n] of html.matchAll(/<a data-note href="([^"#]+)#source-([\w-]+)" aria-label="[^"]* (\d+)"/g)) {
      assert.equal(href, SOURCES[lang]);
      assert.equal(order.indexOf(id) + 1, Number(n), `${lang}: note ${n} is ${id} on the sources page`);
    }
    assert.ok(order.includes('screenrant-it2-questions'), `${lang}: new source listed`);
  }
});

test('the people who pass through a place link to their card on the characters page, with a note', () => {
  for (const [lang, html] of Object.entries(pages)) {
    const cards = new Set([...characterPages[lang].matchAll(/<li class="cp-card" id="([\w-]+)"/g)].map((m) => m[1]));
    let chips = 0;
    for (const era of Object.keys(ERAS)) {
      for (const entry of items(list(html, era))) {
        const who = entry.html.match(/<div\b[^>]*data-who[^>]*>([\s\S]*?)<\/ul>/)?.[1];
        if (!who) continue;
        assert.match(who, NOTE, `${lang} ${entry.id}: people cited`);
        for (const [, href, id] of who.matchAll(/<a href="([^"#]*)#([\w-]+)"[^>]*data-character/g)) {
          chips++;
          assert.equal(href, CHARACTERS[lang], `${lang} ${entry.id}: chip route`);
          assert.ok(cards.has(id), `${lang} ${entry.id}: ${id} has a card`);
        }
      }
    }
    assert.ok(chips >= 100, `${lang}: ${chips} chips`);
  }
});

test('a place that returns keeps its spot, is marked, and links the same place in its other eras', () => {
  for (const [lang, html] of Object.entries(pages)) {
    const byId = {};
    for (const era of Object.keys(ERAS)) {
      const entries = items(list(html, era));
      points(pointGroup(html, era)).forEach((p, i) => {
        const id = entries[i].id.replace(/^map-\d{4}-/, '');
        (byId[id] ??= []).push({ era, point: p, entry: entries[i] });
      });
    }
    assert.deepEqual(byId.neibolt?.map((x) => x.era), ['1962', '1988', '2016'], `${lang}: Neibolt in every era`);
    assert.equal(byId['well-house'], undefined, `${lang}: no Well House`);
    for (const [id, seen] of Object.entries(byId)) {
      for (const { era, point, entry } of seen) {
        assert.equal(point.recurring, seen.length > 1, `${lang} ${era} ${id}: recurring mark`);
        const also = [...entry.html.matchAll(/<a href="#(map-(\d{4})-[\w-]+)"[^>]*data-goto-era="(\d{4})"/g)];
        assert.deepEqual(also.map((m) => m[1]), seen.filter((x) => x.era !== era).map((x) => x.entry.id), `${lang} ${era} ${id}: also in`);
        for (const m of also) assert.equal(m[2], m[3], `${lang} ${id}: era of link`);
        assert.equal(`${point.cx},${point.cy}`, `${seen[0].point.cx},${seen[0].point.cy}`, `${lang} ${id}: same spot`);
      }
    }
  }
});

test('the map is decorative behind its links, captioned as illustrative and shows the disclaimer', () => {
  for (const [lang, html] of Object.entries(pages)) {
    assert.match(html, /<svg\b[^>]*role="group"[^>]*aria-label="[^"]+"/, `${lang}: labelled map`);
    const caption = html.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? '';
    assert.ok(textOf(caption).startsWith(CAPTION[lang]), `${lang}: caption "${textOf(caption)}"`);
    assert.match(html, /data-disclaimer/, `${lang}: disclaimer`);
    assert.doesNotMatch(html, /<img\b/, `${lang}: no raster image`);
  }
});

test('the home shows 29 Neibolt Street in 1962 instead of the Well House', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const sec = html.split('id="cycle-1962"')[1].split('</section>')[0];
    assert.match(sec, /id="place-1962-neibolt"/, `${lang}: Neibolt`);
    assert.doesNotMatch(sec, /place-1962-well-house/, `${lang}: no Well House`);
  }
});

test('the map motion only runs for people who have not asked for reduced motion', () => {
  const css = [
    ...readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(DIST, '_astro', f), 'utf8')),
    ...[...pages.es.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]),
  ].join('\n');
  const uses = [...css.matchAll(/animation:[^;}]*\bmp-[\w-]+/g)];
  assert.ok(uses.length > 0, 'map animations exist');
  for (const use of uses) {
    const before = css.slice(0, use.index);
    const open = before.lastIndexOf('@media');
    assert.ok(open !== -1 && /prefers-reduced-motion:\s*no-preference/.test(before.slice(open, open + 80)), `ungated: ${use[0]}`);
  }
});
