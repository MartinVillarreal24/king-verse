# King Verse — agent instructions

Read `BRIEF.md` first: vision, screen chronology, copyright rules and decisions.

## Conversation and copy

- Talk to the user in Spanish (Rioplatense with voseo).
- Site copy: neutral Spanish with "tú". Code, comments, commits and docs in English.
- No `Co-Authored-By` in commits. Delete merged branches and fast-forward local `main` after merges.

## Non-negotiables

- Unofficial, non-profit fan page: keep the disclaimer visible on every page.
- Only original art and text. Never add film/series stills, posters, logos, official typefaces or the films' Pennywise likeness.
- Timeline follows Welcome to Derry and the films (1908 planned, 1935 renewed, 1962, 1988–89, 2016). No novel years, no speculative cycles after 2016.
- Animations respect `prefers-reduced-motion`; content stays readable without JS. WCAG 2.1 AA contrast.

## Stack

Astro + GSAP (ScrollTrigger). Not scaffolded yet.

When starting the dev server, use background mode:

```
astro dev --background
```
