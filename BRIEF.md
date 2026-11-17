# King Verse — brief

Unofficial, non-profit interactive fan site about Stephen King's universe. It starts with **IT** and later expands to his other works. A personal project by Martín Herrera to show design, illustration and animation skills, and his love for King's stories.

Status: not started (brief only; first-session decisions recorded below). Portfolio card already live on martinherrera.dev as **"Cada 27 años" / "Every 27 Years"** (status "En construcción").

## Vision

- An interactive, animated web experience — not a wiki, not a static map.
- Spine: **Pennywise's 27-year cycle in Derry**, told the way **IT: Welcome to Derry (HBO) and the films** tell it (screen chronology, not the novel's dates).
- Expand later to connected works (The Dark Tower, Castle Rock, etc.).

## Screen chronology (source for the first version)

| Year | Source | Status |
|---|---|---|
| 1908 | Welcome to Derry season 3 | Planned by the creators, not ordered yet |
| 1935 | Welcome to Derry season 2 (Bradley Gang, Great Depression) | Renewed by HBO on 2026-08-17 |
| 1962 | Welcome to Derry season 1 | Premiered 2025-10-26, finale 2025-12-14 |
| 1988–89 | IT (2017) / IT: Chapter One | Released |
| 2016 | IT Chapter Two (2019) | Released; the cycle officially ends here |

The novel uses 1957–58 and 1984–85; do **not** use the book's years on the timeline (user decision). Do **not** add speculative future cycles such as 2043 (user decision: "el ciclo oficialmente termina en it 2").

## Differentiation (research, 2026-11-17)

- derryfiles.space: a very complete literary atlas of Derry from the novel (92 places, map, printables). A plain Derry map already exists — do not compete on that.
- Qwikiverse and Reddit: static maps/infographics of King's multiverse.
- stephenking.com "Discordia": official interactive Dark Tower experience (proves the audience exists).
- Gap: a **narrative, animated** journey through the 27-year cycles.

## Copyright and fan-page rules (mandatory)

- Visible disclaimer: unofficial, non-profit fan page; not affiliated with Stephen King, Warner Bros. or HBO. No ads, no sales.
- All art and text original: own illustrations/SVG/animation; short attributed quotes only.
- No film/series stills, posters, official logos, official typefaces or Pennywise likeness from the films.
- Stephen King publishes no general fan-site policy; a disclaimer helps but is not permission. Rights holders may request removal.

## Visual language (from the portfolio card the user approved)

- Night palette: ink background, red accent `#ff5c7a` (the balloon), muted greys.
- Original SVG scene: Derry skyline (rooftops, steeple, water tower) over a still lake with reflection, a slowly floating red balloon.
- Years "awaken" (flicker on) in sequence; "+27 años" labels between cycles; upcoming seasons drawn hollow with "próximamente".
- Respect `prefers-reduced-motion`: static, fully readable without JS.

## Decisions so far

- Folder: `/home/martin/Documentos/personal/king-verse` (sibling of martin.dev and screenlog).
- Stack: **Astro + GSAP (ScrollTrigger)**.
- Languages: **i18n from day one**: Spanish (neutral, "tú") as default locale, English as second locale (user decision, 2026-11-17).
- First experience: **both** — the 27-year cycle journey as a scroll narrative **and** a Derry exploration (user decision, 2026-11-17).
- Structure: the **cycle journey is the spine**; each cycle opens the Derry places of that era (user decision, 2026-11-17).
- Hosting: **Vercel** for now, at https://king-verse-pi.vercel.app. A subdomain of martinherrera.dev comes later; name not picked yet (user decision, 2026-11-17).
- Sources: **real, primary/original sources, cited professionally** (user decision, 2026-11-17). Every factual claim (dates, renewals, cast, plot facts) carries a numbered **inline note**, and a **sources page** lists the full bibliography; short quotes are attributed.

## Open questions

1. Final subdomain name on martinherrera.dev.
2. Accepted source tiers (proposal: HBO/Warner Bros. press releases and credits, King's published works, then trade press such as Variety or Deadline).

## Related

- Portfolio repo: `../martin.dev` (card in `src/components/ProjectTimeline.astro`, content in `src/content/es.ts` / `en.ts`). Reuse its SVG scene as a starting point.
- Another future idea (separate project): an interactive site to learn software architecture from zero to advanced, current and AI-focused.
