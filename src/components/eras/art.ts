// Shared helpers for the original era illustrations (viewBox 0 0 1600 900). Deterministic: the same seed always draws
// the same stars, snow or trees, so builds are stable and the art never shifts between deploys.

/** Small seeded PRNG (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Dot { cx: number; cy: number; r: number; d: number }

/** Scatter `n` dots in a box; `d` is an animation offset in seconds (used as a negative delay). */
export function scatter(seed: number, n: number, box: { x: [number, number]; y: [number, number]; r: [number, number]; d?: number }): Dot[] {
  const next = rng(seed);
  const span = (lo: number, hi: number) => lo + (hi - lo) * next();
  return Array.from({ length: n }, () => ({
    cx: Math.round(span(...box.x)),
    cy: Math.round(span(...box.y)),
    r: Number(span(...box.r).toFixed(1)),
    d: Number(span(0, box.d ?? 12).toFixed(1)),
  }));
}

/** A row of conifer spikes along a baseline, as one path: the treelines behind each era. */
export function treeline(seed: number, from: number, to: number, base: number, height: [number, number]): string {
  const next = rng(seed);
  let x = from;
  let d = '';
  while (x < to) {
    const w = 18 + next() * 26;
    const h = height[0] + next() * (height[1] - height[0]);
    d += `M${Math.round(x)} ${base}L${Math.round(x + w / 2)} ${Math.round(base - h)}L${Math.round(x + w)} ${base}Z`;
    x += w * (0.55 + next() * 0.3);
  }
  return d;
}

/** Derry skyline (rooftops, steeple, water tower) in a 400-wide unit; scale it to the 1600 viewBox. */
export const skyline =
  'M0 96V78H18V70L28 62L38 70V78H52V66H70V74H84V60L92 52L100 60V74H112V80H124V72H176V72L188 64L200 72V82H216V68H232V76H246V84H262V70L272 60L282 70V80H300V60H305L311 44L317 60H322V78H340V68L352 60L364 68V82H380V74H400V96Z';
export const waterTower = 'M132 48H168V64H132ZM128 48L150 36L172 48Z';
export const towerLegs = 'M137 64L134 96M146 64V96M154 64V96M163 64L166 96M135 76H165M134 88H166';
