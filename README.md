# King Verse

Unofficial, non-profit interactive fan site about Stephen King's universe, starting with IT's 27-year cycle in Derry. See `BRIEF.md` for the vision and rules, and `AGENTS.md` for contributor instructions.

## Stack

Astro (static output) + GSAP (ScrollTrigger). Spanish is the default locale at `/`; English lives under `/en/`. Deployed to Vercel (`vercel.json`): https://king-verse-pi.vercel.app

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (agents: `astro dev --background`) |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the build locally |
| `npm test` | Build, then run the checks in `test/` against `dist/` (Node test runner) |
| `npm run check:a11y` | Accessibility check of `dist/` (run `npm run build` or `npm test` first): axe WCAG 2.1 A/AA on every page in both locales, desktop 1440×900 and mobile 390×844, with reduced motion on and off, and the home after scrolling to each chapter. Text that axe cannot judge (over gradients and art) is measured from rendered pixels. Uses the installed Chrome; exits 1 on any violation |

## Structure

- `src/i18n/ui.ts`: locales, routes per locale and UI strings.
- `src/data/cycles.ts`: the five screen-chronology cycles (no novel years, nothing after 2016).
- `src/data/sources.ts`: verified bibliography; `src/components/Note.astro` renders numbered inline notes that link to it.
- `src/components/`: Derry scene, cycle sections, home and sources pages shared by both locales.
- `src/layouts/Base.astro`: page shell, hreflang, language switch and the visible disclaimer.
- `src/pages/`: Spanish pages; `src/pages/en/`: English pages.
- `odd/tasks/`: feature task documents.
