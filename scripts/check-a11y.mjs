// Accessibility check (a11y-audit S1): axe-core WCAG 2.1 A/AA scan of the built site in dist/.
// Every page in both locales, desktop (1440×900) and mobile (390×844), with prefers-reduced-motion reduce and
// no-preference. The home is also scanned after scrolling to each released chapter, once its animations settle.
// axe cannot decide the contrast of text over gradients, pseudo-elements or overlapping art (it reports those nodes as
// "incomplete"), which is exactly the text over the effects. For each of those nodes in the viewport, this script
// screenshots the element with its text made transparent and measures the text color against the rendered pixels
// behind it: the 5th-percentile contrast must reach 4.5:1 (3:1 for large text).
// Does not build: run `npm run build` first. Uses the installed Chrome (channel 'chrome'), no browser download.
// Usage: npm run check:a11y   (exits 1 on any violation)
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const DIST = join(process.cwd(), 'dist');
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ not found: run `npm run build` first.');
  process.exit(1);
}

const PAGES = ['/', '/en/', '/personajes/', '/en/characters/', '/fuentes/', '/en/sources/'];
const HOMES = new Set(['/', '/en/']);
const CHAPTERS = ['cycle-1962', 'cycle-1988', 'cycle-2016'];
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const MOTIONS = ['reduce', 'no-preference'];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
// Hero intro (~2 s), chapter year flicker, era map transition and the splatter wipe all end well within this.
const SETTLE_MS = 3000;

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webp': 'image/webp' };
const server = createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://local').pathname));
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(DIST, path));
    res.setHeader('Content-Type', TYPES[extname(path)] ?? 'application/octet-stream');
    res.end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

// Hit-test grid (px) for the rendered-contrast probe.
const CELL = 4;
const frames = (page) => page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));

// Rendered contrast of one element's text against the pixels behind it (null when off screen or not text).
const renderedContrast = async (page, selector) => {
  const handle = await page.$(selector);
  if (!handle) return null;
  const info = await handle.evaluate((el, CELL) => {
    const r = el.getBoundingClientRect();
    const box = { x: Math.max(0, r.left), y: Math.max(0, r.top), right: Math.min(innerWidth, r.right), bottom: Math.min(innerHeight, r.bottom) };
    if (box.right - box.x < 2 || box.bottom - box.y < 2) return null;
    const s = getComputedStyle(el);
    const svg = el instanceof SVGElement;
    const size = parseFloat(s.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(s.fontWeight) >= 700);
    // Effective opacity of the text: its color alpha times every ancestor's opacity.
    let opacity = 1;
    for (let n = el; n instanceof Element; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
    const color = svg ? s.fill : s.color;
    // Only pixels where this element is on top count: text covered by a panel is not visible text.
    const clip = { x: Math.floor(box.x), y: Math.floor(box.y), width: Math.floor(box.right - box.x), height: Math.floor(box.bottom - box.y) };
    const cols = Math.ceil(clip.width / CELL);
    const mask = [];
    for (let y = 0; y < clip.height; y += CELL) {
      for (let x = 0; x < clip.width; x += CELL) {
        const top = document.elementFromPoint(clip.x + Math.min(x + CELL / 2, clip.width - 1), clip.y + Math.min(y + CELL / 2, clip.height - 1));
        mask.push(Boolean(top && (top === el || el.contains(top) || top.contains(el))));
      }
    }
    if (!mask.some(Boolean)) return null;
    el.dataset.a11yProbe = '';
    return { clip, large, opacity, color, mask, cols };
  }, CELL);
  if (!info) return null;
  const style = await page.addStyleTag({ content: '[data-a11y-probe], [data-a11y-probe] * { color: transparent !important; fill: transparent !important; -webkit-text-fill-color: transparent !important; text-decoration-color: transparent !important; caret-color: transparent !important; transition: none !important; }' });
  await frames(page);
  const png = await page.screenshot({ clip: info.clip, animations: 'disabled' });
  await style.evaluate((node) => node.remove());
  await handle.evaluate((el) => delete el.dataset.a11yProbe);
  // Under reduced motion every property still transitions for 0.01ms: let the colors settle back before the next probe.
  await frames(page);
  return page.evaluate(async ({ b64, color, opacity, large, mask, cols, CELL }) => {
    const bitmap = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    const data = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;
    const [r, g, b, a = 1] = color.match(/[\d.]+/g).map(Number);
    const alpha = a * opacity;
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const lum = (R, G, B) => 0.2126 * lin(R) + 0.7152 * lin(G) + 0.0722 * lin(B);
    const ratios = [];
    for (let i = 0; i < data.length; i += 4) {
      const px = (i / 4) % bitmap.width;
      const py = Math.floor(i / 4 / bitmap.width);
      if (!mask[Math.floor(py / CELL) * cols + Math.floor(px / CELL)]) continue;
      const [R, G, B] = [data[i], data[i + 1], data[i + 2]];
      const t = lum(r * alpha + R * (1 - alpha), g * alpha + G * (1 - alpha), b * alpha + B * (1 - alpha));
      const [hi, lo] = [t, lum(R, G, B)].sort((x, y) => y - x);
      ratios.push((hi + 0.05) / (lo + 0.05));
    }
    ratios.sort((x, y) => x - y);
    return { ratio: ratios[Math.floor(ratios.length * 0.05)], min: large ? 3 : 4.5 };
  }, { b64: png.toString('base64'), color: info.color, opacity: info.opacity, large: info.large, mask: info.mask, cols: info.cols, CELL });
};

let failed = 0;
let scans = 0;
const scan = async (page, label) => {
  scans++;
  const { violations, incomplete } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const low = [];
  let probed = 0;
  for (const node of incomplete.find((v) => v.id === 'color-contrast')?.nodes ?? []) {
    const result = await renderedContrast(page, node.target.join(' '));
    if (result) probed++;
    if (result && result.ratio < result.min) low.push(`${node.target.join(' ')} ${result.ratio.toFixed(2)}:1`);
  }
  if (low.length) violations.push({ id: 'rendered-contrast', nodes: low.map((target) => ({ target: [target] })) });
  if (!violations.length) return console.log(`PASS ${label} (${probed} rendered-contrast probes)`);
  failed++;
  console.log(`FAIL ${label}`);
  for (const v of violations) {
    console.log(`  ${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 6).map((n) => n.target.join(' ')).join(', ')}`);
  }
};

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', timeout: 20000, args: ['--disable-dev-shm-usage'] });
  for (const path of PAGES) {
    for (const [size, viewport] of Object.entries(VIEWPORTS)) {
      for (const reducedMotion of MOTIONS) {
        const context = await browser.newContext({ viewport, reducedMotion });
        const page = await context.newPage();
        page.setDefaultTimeout(15000);
        const label = `${path} ${size} ${reducedMotion}`;
        try {
          await page.goto(base + path, { waitUntil: 'load' });
          await page.waitForTimeout(reducedMotion === 'reduce' ? 300 : SETTLE_MS);
          await scan(page, `${label} top`);
          if (HOMES.has(path)) {
            for (const id of CHAPTERS) {
              await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ block: 'start' }), id);
              await page.waitForTimeout(reducedMotion === 'reduce' ? 300 : SETTLE_MS);
              await scan(page, `${label} #${id}`);
            }
          }
        } catch (error) {
          failed++;
          console.log(`FAIL ${label}: ${error.message}`);
        } finally {
          await context.close();
        }
      }
    }
  }
} finally {
  await browser?.close();
  server.close();
}

console.log(`\n${scans - failed}/${scans} scans clean (axe ${TAGS.join(', ')})`);
if (failed) process.exit(1);
