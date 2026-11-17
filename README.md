# King Verse

Unofficial, non-profit interactive fan site about Stephen King's universe, starting with IT's 27-year cycle in Derry. See `BRIEF.md` for the vision and rules, and `AGENTS.md` for contributor instructions.

## Stack

Astro (static output) + GSAP (ScrollTrigger). Spanish is the default locale at `/`; English lives under `/en/`. Deployed to Vercel (`vercel.json`).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (agents: `astro dev --background`) |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the build locally |
| `npm test` | Build, then run the checks in `test/` against `dist/` (Node test runner) |

## Structure

- `src/i18n/ui.ts`: locales, routes per locale and UI strings.
- `src/layouts/Base.astro`: page shell, hreflang, language switch and the visible disclaimer.
- `src/pages/`: Spanish pages; `src/pages/en/`: English pages.
- `odd/tasks/`: feature task documents.
