# Accessibility audit and content note

Measure contrast and accessibility of the live design with an automated tool, fix what it finds, and add a content warning for horror and blood.

## Specs

- S1 — "Medir contraste y accesibilidad con una herramienta (axe), ahora que hay más efectos." Run axe (WCAG 2.1 A/AA) on every page in both locales, desktop and mobile, with and without reduced motion; fix every violation; keep a repeatable script (`npm run check:a11y`).
- S2 — "Un aviso de contenido (terror y sangre)". Short, visible, in both locales, not blocking the content.
- S3 — Non-negotiables: AGENTS.md (disclaimer, reduced motion, no-JS readability, WCAG 2.1 AA).

## Tasks

- [x] T1 — S1, S3 — worker — axe check script + fixes
- [x] T2 — S2, S3 — worker — content note in the hero (es/en) + test

## Log

- L1 (user, 2026-11-17): "haz el 1 y 3" — 1: "Medir contraste y accesibilidad con una herramienta (axe), ahora que hay más efectos."; 3: "Un aviso de contenido (terror y sangre) si te preocupa el tono."
- L2 (evidence): axe 40/40 clean (first run already clean; added rendered-contrast pass because axe leaves text over effects as incomplete); content note in hero es/en; npm test 41/41; independent verify: devDependencies only, no prod lock entries added, no axe/playwright in dist. Pre-existing: npm audit --omit=dev reports 10 high (same on main), not addressed here.
