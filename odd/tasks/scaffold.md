# Scaffold — King Verse base project

First runnable skeleton of the site: Astro + GSAP, es/en from day one, visible disclaimer, home with the Derry scene, five cycle sections, sources page, Vercel-ready. No real content, no fine animation.

## Specs

- S1 — Initial commit with the existing docs: "commit inicial con `AGENTS.md`, `BRIEF.md` y `.gitignore`", then work on a new branch.
- S2 — "scaffold de Astro + GSAP con i18n es/en desde el día uno": Spanish at `/` (default locale), English at `/en/`, as in martin.dev.
- S3 — "layout base con el disclaimer visible en todas las páginas" (unofficial, non-profit, not affiliated with Stephen King, Warner Bros. or HBO).
- S4 — "home con la escena de la card adaptada" (Derry skyline, lake, red balloon from `../martin.dev/src/components/ProjectTimeline.astro`).
- S5 — "las 5 secciones de ciclo": 1908, 1935, 1962, 1988–89, 2016 (screen chronology only; no novel years, nothing after 2016). Each cycle opens the Derry places of its era (BRIEF structure decision).
- S6 — "página de fuentes": numbered inline notes + a sources page (BRIEF decision). No invented citations.
- S7 — "config de Vercel".
- S8 — "Sin contenido real ni animación fina todavía". Animations respect `prefers-reduced-motion`; content readable without JS (AGENTS non-negotiables).

## Tasks

- [x] T1 — S1 — inline — initial docs commit on `main`, branch `feat/scaffold` — 6ea3679
- [x] T2 — S2, S3, S7, S8 — inline — Astro project, i18n, base layout + disclaimer, Vercel config, build checks — 976c1b0
- [x] T3 — S4, S5, S6, S8 — inline — home scene, cycle sections, sources page (es/en), GSAP reveal — 7bf5c05

## Log

- L1 (user, 2026-11-17): "si" — accepting: "Primer paso: rama nueva + commit inicial con `AGENTS.md`, `BRIEF.md` y `.gitignore`. Ahí armo el scaffold de Astro + GSAP con i18n es/en desde el día uno, layout base con el disclaimer visible en todas las páginas, y un esqueleto: home con la escena de la card adaptada, las 5 secciones de ciclo, página de fuentes y config de Vercel. Sin contenido real ni animación fina todavía."
- L2 (user decisions, same day): first experience "las dos cosas"; subdomain later, "por ahora usaremos vercel para subirlo"; i18n "desde el dia 1"; sources "fuentes reales y originales y citadas profesionalmente"; structure "Ciclos como columna, Derry dentro"; citations "Notas inline + página de fuentes".
- L3 (evidence): `npm test` builds and runs 9 checks in `test/` (layout, i18n, disclaimer, scene, cycles, upcoming labels, no novel years, notes→sources, no-JS/reduced-motion) — all pass. Not run: visual/browser check, `astro check` (needs `@astrojs/check`, not installed). `src/data/sources.ts` is intentionally empty: no source added until verified.
