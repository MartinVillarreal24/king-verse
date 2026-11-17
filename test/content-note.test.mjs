// a11y-audit S2, S3: a short, visible content note in each locale's home hero (horror and blood), in the static HTML,
// not hidden from assistive technology and not blocking the content.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const homes = { es: page('/'), en: page('/en') };
const NOTE = {
  es: 'Contiene escenas de terror e imágenes de sangre ilustradas.',
  en: 'Contains horror scenes and illustrated blood.',
};

const hero = (html) => html.match(/<section\b[^>]*data-hero[^>]*>[\s\S]*?<\/section>/)[0];
const textOf = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

test('each home hero shows the content note in its locale, visible and readable without JS', () => {
  for (const [lang, html] of Object.entries(homes)) {
    const note = hero(html).match(/<p\b[^>]*data-content-note[^>]*>[\s\S]*?<\/p>/)?.[0];
    assert.ok(note, `${lang}: content note in the hero`);
    assert.equal(textOf(note), NOTE[lang], `${lang}: note text`);
    const open = note.match(/^<p\b[^>]*>/)[0];
    assert.doesNotMatch(open, /aria-hidden|hidden|role="dialog"|style=/, `${lang}: note is plain, visible text`);
    const other = lang === 'es' ? 'en' : 'es';
    assert.ok(!hero(html).includes(NOTE[other]), `${lang}: no note from the other locale`);
  }
});
