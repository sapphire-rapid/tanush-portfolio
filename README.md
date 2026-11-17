# tanush-portfolio

Personal portfolio for Tanush: edge AI, computer vision and embedded systems.
Built with Next.js, Tailwind CSS and Motion, deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

All text lives in two files, so no component needs touching:

- `src/data/site.ts`: name, contact links, education, experience
- `src/data/projects.ts`: projects (copy a block, change the text)

## Deploy

Import the repo once at vercel.com (Add New, Project, pick this repo, Deploy).
After that every push to `main` updates the live site and every pull request
gets its own preview link.

## Working with coding agents

`CLAUDE.md` holds the design system, conventions and a progress log. Point your
agent at it before asking for changes.
