# Horror motion — more floating things, hinted It, blood accents

Push the cinematic home further: more animation, floating balloons, an implied It (never shown), blood accents. Design first as a new artboard in design/home-cinematic/, then implement the approved one.

## Specs

- S1 — "inspirate un poco mas en el diseño por favor, mas animaciones, cosas flotando, un globito, algo, penniwise, sangre, cosas asi".
- S2 — Pennywise: "Solo insinuado" — eyes in the drain, white glove holding the balloon string, a clown shadow; never a face. AGENTS.md rule unchanged (no film Pennywise likeness).
- S3 — Blood: "Acentos" — drips on titles, years that bleed when they light up, splatters in transitions.
- S4 — Process: "Nuevo artboard y después implemento" — add artboard 04 to design/home-cinematic/, implement only after the user approves it.
- S5 — Non-negotiables: original art only, reduced-motion respected, readable without JS, WCAG AA, disclaimer visible; short attributed quotes only.

## Tasks

- [x] T1 — S1–S5 — worker — artboard design/home-cinematic/04-…html (builds on 01)
- [ ] T2 — S1–S5 — after approval — implement in src/

## Log

- L1 (user, 2026-11-17): "inspirate un poco mas en el diseño por favor, mas animaciones, cosas flotando, un globito, algo, penniwise, sangre, cosas asi"
- L2 (user answers): Pennywise "Solo insinuado"; blood "Acentos"; process "Nuevo artboard y después implemento".
- L3 (worker, T1): artboard design/home-cinematic/04-something-floats.html ("Something floats") added and appended to design.json; builds on 01 (same text, notes, map, rail). Covers S1 (balloon fields, boat into the drain, particles, fog), S2 (eyes in the drain that follow the pointer, white-gloved hand with a balloon, cone-hat clown shadow, flickering lamps; no face), S3 (title drip, bleeding years, splatter wipe, red seep), S4 (new artboard, 01–03 untouched, src/ untouched), S5 (still with reduced motion, readable without JS, text only on panels, disclaimer kept, one attributed quote). Verified in headless Chrome at 1440×900, 390×844, reduced motion and no JS; no console errors. Awaiting user approval before T2.
- L4 (handoff, 2026-11-17): 04-something-floats approved and handed off for implementation (T2).
