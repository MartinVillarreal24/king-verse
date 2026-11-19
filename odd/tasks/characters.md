# Characters — the Losers' Club and the Welcome to Derry cast

New bilingual characters page (es `/personajes/`, en `/en/characters/`). Branch `feat/characters`; delivery `ask-on-risk`; runner `npm test` (astro build + node --test) and `npm run check:a11y`.

## Specs

- S1 — Page of characters: "si, arranquemos por personajes", accepting the proposal: the Losers' Club with original illustrated portraits, their profile and the cycles each one appears in.
- S2 — Scope: "Perdedores + Welcome to Derry" — the 7 Losers in 1988–89 (It, 2017) and 2016 (It Chapter Two, 2019), plus the main characters of 1962 (IT: Welcome to Derry, season 1). Roster: "7 Perdedores + 9 de 1962" (16 cards: Will, Leroy, Charlotte, Lilly, Ronnie, Rich, Marge, Dick Hallorann, Pauly Russo).
- S3 — Portraits: "Objeto emblemático" — each character is drawn as an original illustration of an object that identifies them on screen; no faces, no actor likeness.
- S4 — Facts: every factual sentence cites a verified real source in src/data/sources.ts (same rule as the cycles); screen chronology only (no novel years, nothing after 2016); text in our own words.
- S5 — Non-negotiables (AGENTS.md): disclaimer visible, original art only, reduced motion respected, readable without JS, WCAG 2.1 AA.
- S6 — Process (assumption, same as earlier features): research first, then a new artboard in design/, implement in src/ only after the user approves it.

## Tasks

- [x] T1 — S2, S4 — delegated (broad web research, context compression) — odd/research/characters.md — 3f5cd4a
- [x] T2 — S1–S3, S5, S6 — inline — artboard design/characters/01-what-they-left.html — 3f5cd4a
- [x] T3 — S1–S5 — inline (no writer trigger: one unit) — /personajes/ and /en/characters/

## Log

- L1 (user, 2026-11-19): "eso dejalo para despues, enfoquemonos en el contenido y diseño" → "si, arranquemos por personajes"
- L2 (user answers, 2026-11-19): scope "Perdedores + Welcome to Derry"; portraits "Objeto emblemático".
- L3 (2026-11-19): `npm audit` (prod and full) reports 0 vulnerabilities on main; nothing to fix.
- L4 (worker, T1): odd/research/characters.md — 26 characters (7 Losers, 9 main 1962, 10 optional incl. Pennywise as the red balloon), 12 reused + 10 new sources, Losers' fears verified. Weak objects: Charlotte, Leroy, Pauly, Taniel, Ingrid. Conflicts parked in "Do NOT state" (Rich hides Marge in fridge vs footlocker, name spellings, Bill's adult job). Gaps: no official kid-actor pairing, no on-screen "2016" caption source, Ben architect single-source. Parent spot check: file present, no "1986".
- L5 (user answer, 2026-11-19): roster "7 Perdedores + 9 de 1962" — 16 cards; optional characters and Pennywise card left out.
- L6 (parent, T2, inline): artboard design/characters/01-what-they-left.html ("What they left behind") + design/characters/design.json. 16 cards (7 Losers, 9 of 1962), original SVG objects that float and wake on hover/focus, full arcs in <details> with spoilers, Stan content note, provisional objects marked (Leroy gate, Charlotte packed car, Pauly transport plane), ties strip (Hanlon, Tozier), 20 numbered sources by first appearance. Evidence: headless Chrome 1440×900, 390×844 (no horizontal overflow), reduced motion and no JS, no console errors; axe wcag2a/aa/21aa 0 violations (color-contrast incomplete over gradients, as on the home). Awaiting user approval before T3.
- L7 (user, 2026-11-19): "si, implementalo" (artboard approved).
- L8 (T3): RED observed (test/characters.test.mjs failed: missing /personajes). Implemented src/data/characters.ts (16 cards, es/en, cited), 9 new sources in src/data/sources.ts, src/components/{CharactersPage,Sentences}.astro, src/components/characters/objects.ts, routes + nav link on every page, notes numbered after the home's (citations.ts). Ties: Leroy and Charlotte share one link of the Hanlon line. GREEN: npm test 50/50. Headless Chrome es/en at 1440×900, 390×844, reduced motion, no JS: no console errors, no horizontal overflow; axe 0 violations.
- L9 (T3, differential vs 3f5cd4a): homes identical except the new nav link (and the Note style moving into the shared CSS bundle); sources pages keep the 25 home-cited sources in the same order, the 9 new character sources follow, the 2 uncited ones stay last. npm run check:a11y 48/48 clean (6 pages). Risk: item 3 (shared note numbering in citations.ts and the nav in Base.astro used by every page).
