# Tanush's portfolio: notes for coding agents

Read this file first. It is the project's memory: what the site is, how it is
built, and what has been done. Update the progress log at the bottom whenever
you ship something.

@AGENTS.md

## What this is

A personal portfolio for Tanush, an MTech AI student who works on edge AI,
computer vision and embedded systems. Its jobs, in order:

1. Get a recruiter or professor from the home page to a project in one click.
2. Show the hardware-to-software angle (sensors and firmware up to models).
3. Be a practice ground for building with coding agents.

Layout reference: https://www.sriramvaishnav.com/ (floating bottom dock, bento
"about" grid, tilt project cards, experience list, contact card). We follow its
structure, not its colours, text or images.

## Stack

- Next.js 16 (App Router, Turbopack, `cacheComponents` on), React 19, TypeScript
- Tailwind CSS v4 (theme tokens live in `src/app/globals.css`, there is no
  `tailwind.config`)
- `motion` for the dock and card tilt, `lucide-react` for icons
- Fonts are self-hosted through `@fontsource-variable/*` packages
- Deployed on Vercel: every push to `main` goes live, every pull request gets
  a preview URL

Next.js 16 differs from older versions. Before using an API you are not sure
about, check `node_modules/next/dist/docs/`.

## Commands

```
npm run dev     # local dev server
npm run build   # production build, must pass before pushing
npm run lint    # eslint, must be clean before pushing
```

## Where things live

| Path | What it holds |
|---|---|
| `src/data/site.ts` | Name, links, focus areas, stack, education, experience |
| `src/data/projects.ts` | Every project. Add one here and it appears on the site |
| `src/app/page.tsx` | Home: hero, about bento, selected projects, experience, contact |
| `src/app/projects/page.tsx` | Projects page with category filter |
| `src/components/Dock.tsx` | Floating bottom navigation |
| `src/components/SignalTrace.tsx` | Hero canvas: analog signal becoming digital steps |
| `src/components/ProjectCard.tsx` | Tilt card with the project's signal path |
| `src/components/Bento.tsx` | About grid |
| `src/components/ContactCard.tsx` | Contact call to action |

Content is data, not markup: change text in `src/data/`, not inside components.
A link left as `""` in `site.links` hides every button that points to it.

## Design system

Theme: a circuit board at night. Colours are Tailwind tokens (`bg-mask`,
`text-pad` and so on).

| Token | Hex | Use |
|---|---|---|
| `mask` | `#0c1424` | Page background (solder-mask navy) |
| `layer` | `#131e36` | Cards, dock |
| `trace` | `#25365c` | Borders and hairlines |
| `silk` | `#edf1f7` | Main text |
| `haze` | `#93a2bd` | Secondary text |
| `pad` | `#f0c56b` | The one accent: buttons, active states, digital signal |
| `signal` | `#7fd4e3` | Only for raw/analog input in the hero |

Type: Bricolage Grotesque (`font-display`) for headings, Geist (`font-sans`)
for everything else.

Rules to keep:

- Gold (`pad`) is the only accent. Do not add a second accent colour.
- Headings are sentence case, left aligned. No all-caps labels above headings.
- Motion answers the user (dock magnify, card tilt, hover). The hero trace is
  the only thing that moves on its own. No scroll-triggered fade-ins.
- Everything animated must respect `prefers-reduced-motion`.
- Keep keyboard focus visible and check the page at 390px wide.
- Project cards show a `pipeline` (input to output) instead of a screenshot.
  Keep each step to one to three words.

## Resources Tanush likes

His tools tracker lists component libraries to pull from instead of writing
effects from scratch: React Bits, Cult UI, Arc Library, UI Watermelon, Lenis.
Check a library's licence before copying a component in, restyle it with the
tokens above, and note where it came from in a comment at the top of the file.

## Not built yet

- Resume, email and LinkedIn links (waiting on Tanush; fill in `site.links`)
- Dates on the experience list (`period` in `site.ts`)
- Real pipeline for the drowsiness project (marked TODO in `projects.ts`)
- Project screenshots or photos, and a per-project detail page
- Live in-browser demo of the drowsiness model (TensorFlow.js + webcam)
- Research page (papers, thesis abstract) and a writing/blog section
- Custom domain, analytics, Open Graph image, favicon

## Progress log

- 2026-11-17: First version. Home page, projects page with filter, floating
  dock, design tokens, placeholder content from Tanush's known projects.
