# Visual polish — cinematic motion, era illustrations and stronger sources

Raise the site from a plain skeleton to a professional, cinematic experience: fine GSAP motion, original illustrations per era, and primary sources where possible. Design directions first (gentle-design), then implementation of the chosen one.

## Specs

- S1 — "las 3 primeras": (1) "Animación fina con GSAP: el globo, los años que se encienden al hacer scroll, transición entre mapas de cada época"; (2) "Fuentes oficiales de HBO/Warner cuando se puedan abrir, y resolver los datos en conflicto (año del epílogo, arma de Eddie)"; (3) "Ilustraciones originales por época (ambiente de cada ciclo dentro de su sección)".
- S2 — "de manera profesional y no que se vea tan simple como ahora".
- S3 — Non-negotiables (AGENTS.md): original art only (no stills, posters, logos, official typefaces, no film Pennywise likeness), disclaimer visible, `prefers-reduced-motion` respected, readable without JS, WCAG 2.1 AA.

## Tasks

- [x] T1 — S2, S3 — worker — design system sync + 3 design directions for the home (design/home-cinematic/)
- [x] T2 — S1(2) — explore — primary HBO/WBD sources and the two conflicting facts
- [x] T3 — S2 — user picked design/home-cinematic/01-cinematic-chapters.html (handoff) — see T4–T6
- [x] T4 — S1(2) — inline — apply official sources and the resolved facts (epilogue October 1988, Eddie's fence post) to src/data — c7986d5
- [x] T5 — S1(1), S1(3), S2, S3 — worker — implement 01 Cinematic chapters: pinned full-viewport chapters, letterbox, giant years lighting up, chapter rail, era illustrations (1962, 1988–89, 2016; upcoming 1908/1935 kept simple), balloon drifting between chapters, map at the end of each chapter with era transition; reduced-motion and no-JS fallbacks — 4731c91
- [x] T6 — S2, S3 — inline — visual check vs artboard (desktop, mobile, reduced motion, no JS), handoff "implemented"

## Log

- L1 (user, 2026-11-17): "las 3 primeras pero de manera profesional y no que se vea tan simple como ahora"
- L2 (T1 evidence, worker 2026-11-17): design system synced read-only from `src/styles/global.css`, `src/layouts/Base.astro` and `src/components/*.astro` into `design/system.md` and `design/system.html`. Three directions in `design/home-cinematic/` (manifest `design.json`, feature linked): `01-cinematic-chapters.html` (pinned full-viewport chapters, parallax, giant years, per-chapter map morph), `02-editorial-atlas.html` (magazine grid, framed plates, one persistent map that morphs per era; proposes a system serif stack), `03-lake-timeline.html` (one continuous lake panorama changing sky/season/town per era, HUD year, corner map, timeline scrubber). All use the real es body text and notes for 1962, 1988–89 and 2016, original SVG art only (no clown likeness), the visible disclaimer, reduced-motion and no-JS fallbacks; proposed tokens listed in each artboard's header comment. Checked with headless Chrome at 1440×900 and 390×844, reduced motion and JS off; no external URLs, no duplicate ids, no broken in-page links, no JS exceptions. No direction chosen yet.
- L3 (T2 evidence): official sources and both conflicts resolved in odd/research/visual-polish-sources.md (epilogue = October 1988; Eddie = Neibolt fence post). Applying them to src/data is part of T3.
- L4 (handoff, 2026-11-17): chosen artboard design/home-cinematic/01-cinematic-chapters.html; 02-editorial-atlas and 03-lake-timeline remain alternatives.
- L5 (evidence): npm test 33/33; parent visual check with headless Chrome over CDP at 1440×900 (scroll positions per chapter) and 390×844; worker verified crossfade, balloon path, years opacity and reduced motion. Not measured with a contrast tool; 1024–1280px reasoned, not screenshotted.
