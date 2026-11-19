# Derry map — an interactive map page across eras

New bilingual page (es `/mapa/`, en `/en/map/`): one large original map of Derry, switch between 1962, 1988–89 and 2016, places linked to the characters who pass through them. Branch `feat/derry-map`; delivery `ask-on-risk`; runner `npm test` (astro build + node --test) and `npm run check:a11y`.

## Specs

- S1 — Interactive map of Derry: "sigamos con el mapa interactivo de Derry". Own page with a large map and an era switch.
- S2 — Content: "Los 20 actuales + nuevos" — reuse the 20 cited places of src/data/places.ts and add newly researched places, each linked to the characters who pass through them. Selection: "Selección de ~36" — 37 places: 1962 (12), 1988–89 (13), 2016 (12); left out: diner, 1989 standpipe, graveyard, butcher shop, police station, Secondhand Rose, 1962 library and statue, 2016 school.
- S3 — Facts (same rule as the site): every factual sentence cites a verified source; screen chronology only (1962, 1988–89, 2016); positions illustrative, never a claimed real map position; own words.
- S4 — Non-negotiables (AGENTS.md): disclaimer visible, original art only, reduced motion respected, readable and usable without JS, WCAG 2.1 AA.
- S5 — Process (assumption, as in earlier features): research → artboard in design/ → implement after the user approves it.

## Tasks

- [x] T1 — S2, S3 — delegated (broad web research) — odd/research/derry-map.md
- [x] T2 — S1, S2, S4, S5 — inline — artboard design/derry-map/01-three-derrys.html (ca6bd66), approved
- [x] T3 — S1–S4 — inline (no writer trigger: one unit, parent context) — 7f914b0 (data), d6e0e87 (page)

## Log

- L1 (user, 2026-11-19): "sigamos con el mapa interactivo de Derry"
- L2 (user answer): content "Los 20 actuales + nuevos".
- L3 (worker, T1): odd/research/derry-map.md — 28 new places (1962: 12, 1988–89: 9, 2016: 7), character links for all 20 existing + new places (~150), recurring places (Neibolt, library, school, Paul Bunyan statue in all three eras). One new source (screenrant-it2-questions, lower tier). Found 2 errors in live data: 2016 library (Eddie is stabbed at the inn, not the library) and 1962 "Well House" (Sky places the raid under the Neibolt House).
- L4 (parent): library error confirmed on the fetched Collider timeline ("Back at the Inn… stabs Eddie"; "Henry attacks Mike in the library"); fixed in src/data/places.ts and src/data/cycles.ts. npm test 50/50. Well House → Neibolt left for T3.
- L5 (user answer, 2026-11-19): "Selección de ~36" → 37 places.
- L6 (parent, T2): artboard design/derry-map/01-three-derrys.html ("Three Derrys") + design.json. Era switch = native radios (CSS :has), points link to cited entries (:target), recurring places keep their spot with a dashed halo and "También en" links, character chips per place, era overlays (ice and pillars / dusk and fireflies / carnival bulbs), drifting balloon. 1962 Well House shown as 29 Neibolt Street (sky-derry-e5). Evidence: headless Chrome 1440×900, 390×844, no JS; no console errors, no overflow; "También en" switches era and selects the place; axe 0 violations.
- L7 (user, 2026-11-19): "dale, avisame cuando termine" — artboard approved, implement T3.
- L8 (parent, T3): RED first (test/map.test.mjs, 10 tests, failed on the missing page). Data: Place gains body/people/home:false; placesOf keeps the home's 20 (Well House → 29 Neibolt), mapPlacesOf draws 37; mapCitations numbered after the characters page; screenrant-it2-questions added. Page: src/components/MapPage.astro, /mapa/ and /en/map/, nav link, check:a11y PAGES. Deviation from the artboard: the 1962 school is its own place ("high-school", own spot, not recurring) because the research says sources never tie it to the 1988–89 school; map labels got a land-colored halo for AA; "Granjas" label moved off the farm pin. Evidence: npm test 60/60; check:a11y 56/56 clean; headless Chrome desktop/mobile/no-JS: no console errors, no overflow, radios swap points and lists, "También en" switches era and selects the place (also without JS via :target), deep link #map-1988-farm opens 1988. Differential vs base build: home changes only in the nav link, the requested Neibolt entry (1988 Neibolt now "keep" in the era transition) and the note renumbering it causes; characters page only nav + renumbering; sources page gains screenrant. Next: push/PR are the user's decision.
- L9 (user, 2026-11-19): "si y por hoy eso seria todo y continuariamos mañana o la proxima semana" — pushed, PR #9 opened (size:exception). Waiting for merge.

