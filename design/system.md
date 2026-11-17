# King Verse — design system (synced)

Read-only capture of the values that exist in the project today. Every entry names its source. Nothing here is invented; values proposed by a design direction live in that artboard's header comment as "proposed tokens", not here.

Sources read:

- `src/styles/global.css` (tokens, base elements, focus, reduced motion)
- `src/layouts/Base.astro` (header, nav, footer, disclaimer)
- `src/components/HomePage.astro` (hero, title, lead)
- `src/components/CycleSection.astro` (cycle spine, year, upcoming state, places card)
- `src/components/DerryMap.astro` (mini-map palette, pins, place list)
- `src/components/DerryScene.astro` (skyline scene, balloon, gradients)
- `src/components/Note.astro`, `src/components/SourcesPage.astro` (notes, sources list)

## Colors

Custom properties (`src/styles/global.css`, `:root`):

| Token | Value | Usage |
| --- | --- | --- |
| `--color-ink` | `#070b10` | Page background, pin stroke, number text on red, `theme-color` (`src/layouts/Base.astro`) |
| `--color-night` | `#0f1724` | Places card background (`CycleSection.astro`) |
| `--color-surface` | `#141e2c` | Active place row (`DerryMap.astro`) |
| `--color-overlay` | `#22303f` | Borders: header, footer, cards, map frame |
| `--color-text` | `#e6edf3` | Primary text, hover link color, focus ring on map points |
| `--color-subtext` | `#b3c0cf` | Lead, body, nav links, disclaimer |
| `--color-comment` | `#8b9bb0` | Status lines, captions, credits, map labels |
| `--color-err` | `#ff5c7a` | The accent (red balloon): links, focus outline, cycle line, dots, pins, "+27 años", "próximamente" |

Literal colors in components (no token yet):

| Value | Usage | Source |
| --- | --- | --- |
| `#ff5c7a99`, `#ff5c7a40` | Glow of the cycle dot | `src/components/CycleSection.astro` |
| `color-mix(in srgb, var(--color-err) 55%, transparent)` | Cycle spine line | `src/components/CycleSection.astro` |
| `color-mix(in srgb, var(--color-err) 45%, transparent)` | "Próximamente" badge border | `src/components/CycleSection.astro` |
| `#0b121b` | Map land; lake gradient middle stop | `DerryMap.astro`, `DerryScene.astro` |
| `#16263a` | Map Penobscot fill | `src/components/DerryMap.astro` |
| `#2b4562` | Map Kenduskeag and canal stroke | `src/components/DerryMap.astro` |
| `#15241f` / `#1f3329` | Map woods fill / stroke | `src/components/DerryMap.astro` |
| `#33404f` | Map quarry and runway stroke | `src/components/DerryMap.astro` |
| `#3a1b2a` | Sky gradient bottom (horizon glow) | `src/components/DerryScene.astro` |
| `#04070b` | Skyline silhouette | `src/components/DerryScene.astro` |
| `#0a1018` | Skyline reflection | `src/components/DerryScene.astro` |
| `#d94a66` | Balloon knot | `src/components/DerryScene.astro` |
| `#c9d3df` (55 % opacity) | Balloon string | `src/components/DerryScene.astro` |
| `#fff` (35 % opacity) | Balloon highlight | `src/components/DerryScene.astro` |

Gradients (`src/components/DerryScene.astro`): sky `#070b10 → #0f1724 (45 %) → #3a1b2a`; lake `#141e2c → #0b121b (60 %) → #070b10`. Hero scrim (`HomePage.astro`): `transparent → var(--color-ink) 75 %` over the bottom 55 %.

## Typography

Only system stacks; no official typefaces (`src/styles/global.css`).

| Token | Value |
| --- | --- |
| `--font-sans` | `ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |
| `--font-mono` | `ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace` |

| Role | Font | Size / line-height / weight | Source |
| --- | --- | --- | --- |
| Base | sans | 1rem / 1.6 | `global.css` (`html`) |
| Home title (h1) | mono | `clamp(2.5rem, 9vw, 5.5rem)` / 1 / 800, letter-spacing -0.03em | `HomePage.astro` |
| Lead | sans | 1.125rem, max-width 36rem | `HomePage.astro` |
| Cycle year (h2) | mono | `clamp(2.5rem, 8vw, 4.5rem)` / 1 / 700, letter-spacing -0.02em | `CycleSection.astro` |
| Cycle source | mono | 1rem | `CycleSection.astro` |
| Body | sans | 1rem / 1.65, max-width 40rem | `CycleSection.astro` |
| Places title (h3) | mono | 0.875rem / 1.4 / 600 | `CycleSection.astro` |
| "+27 años" gap label | mono | 0.75rem / 1 | `CycleSection.astro` |
| Badge "Próximamente" | inherits mono | 0.75rem | `CycleSection.astro` |
| Brand | mono | 1rem / 1 / 700, letter-spacing 0.04em | `Base.astro` |
| Nav | mono | 0.875rem / 1 | `Base.astro` |
| Footer | sans | 0.875rem | `Base.astro` |
| Place name | sans | 0.9375rem / 1.4 / 600 | `DerryMap.astro` |
| Place description | sans | 0.9375rem | `DerryMap.astro` |
| Map caption | mono | 0.8125rem / 1.4 | `DerryMap.astro` |
| Map labels (SVG) | mono italic | 7px, letter-spacing 0.08em | `DerryMap.astro` |
| Note `[n]` | mono | 0.7em / 1, superscript | `Note.astro` |
| Sources h1 / h2 | mono | `clamp(2rem, 6vw, 3rem)` 800 / 1.125rem 600 | `SourcesPage.astro` |

## Spacing and layout

| Value | Usage | Source |
| --- | --- | --- |
| `.wrap`: `min(100% - 2rem, 64rem)` centered | Page container | `global.css` |
| 0.875rem block | Header row padding | `Base.astro` |
| 1.25rem | Nav gap | `Base.astro` |
| 1.5rem block | Footer padding | `Base.astro` |
| `min(80vh, 40rem)` min-height, 3rem block | Hero, hero text | `HomePage.astro` |
| 4rem block, 2rem left | Cycle section padding | `CycleSection.astro` |
| 1rem 1.25rem | Places card padding | `CycleSection.astro` |
| 1.25rem | Map / list grid gap (two columns from 48rem) | `DerryMap.astro` |
| 0.5rem 0.625rem, gap 0.5rem | Place row padding / list gap | `DerryMap.astro` |

## Radius

| Value | Usage | Source |
| --- | --- | --- |
| 0.25rem | Badge | `CycleSection.astro` |
| 0.375rem | Map frame, place rows | `DerryMap.astro` |
| 0.5rem | Places card | `CycleSection.astro` |
| 9999px | Cycle dot, place number | `CycleSection.astro`, `DerryMap.astro` |
| `rx="6"` | Map land rect | `DerryMap.astro` |

## Shadows and borders

| Value | Usage | Source |
| --- | --- | --- |
| `0 0 10px #ff5c7a99, 0 0 22px #ff5c7a40` | Cycle dot glow (the only shadow) | `CycleSection.astro` |
| `1px solid var(--color-overlay)` | Header, footer, cards, map | `Base.astro`, `CycleSection.astro`, `DerryMap.astro` |
| dashed border | Upcoming cycle line and hollow dot | `CycleSection.astro` |

## Motion

| Rule | Source |
| --- | --- |
| Balloon float 6s ease-in-out infinite alternate (`translateY(3px) rotate(-3deg)` → `translateY(-6px) rotate(3deg)`), reflection and ripple in sync | `DerryScene.astro` |
| Cycle head reveal: GSAP `autoAlpha 0, y 24`, 0.8s `power2.out`, ScrollTrigger `top 80%`, once | `HomePage.astro` |
| Map ring / list row transitions 0.2s ease | `DerryMap.astro` |
| `prefers-reduced-motion: reduce` collapses all animation and transition durations; animations arm only under `no-preference` | `global.css`, `HomePage.astro`, `DerryScene.astro` |

## Component rules

- **Focus**: `:focus-visible { outline: 2px solid var(--color-err); outline-offset: 3px }`; map points show a 2.5px `--color-text` ring (`global.css`, `DerryMap.astro`).
- **Links**: accent red, underline offset 0.2em, hover to `--color-text` (`global.css`). Nav links subtext, current page underlined (`Base.astro`).
- **Skip link**: red background, ink text, appears on focus (`global.css`).
- **Header / footer**: 1px overlay borders; footer holds the disclaimer (subtext) and credits (comment) on every page (`Base.astro`).
- **Cycle**: red spine line, glowing red dot, mono year; upcoming cycles use dashed line, hollow dot, italic source and a red outlined "Próximamente" badge; "+27 años" label between cycles (`CycleSection.astro`).
- **Mini-map**: original schematic Derry (viewBox 320×220): Kenduskeag, canal, Penobscot, block grid, western woods, quarry, Juniper Hill contours, runway; numbered red pins linked to a numbered place list; works without JS via `:target` (`DerryMap.astro`).
- **Note**: superscript mono `[n]` link to the sources page (`Note.astro`).
- **Scene**: decorative SVG (`aria-hidden`), skyline + water tower over a mirrored lake, floating red balloon; still without JS or with reduced motion (`DerryScene.astro`).
- **Disclaimer copy** (es): "Sitio de fans no oficial y sin fines de lucro. No está afiliado a Stephen King, Warner Bros. ni HBO." (`src/i18n/ui.ts`).
