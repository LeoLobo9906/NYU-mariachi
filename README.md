# NYU Mariachi — Website

Official site for **NYU Mariachi**, a student-led mariachi ensemble at New York University.
Built to look professional, load fast, rank in search, and make booking us effortless.

> Full architecture, conventions, and "how to edit" guide live in **[CLAUDE.md](./CLAUDE.md)**.

## Stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion + Lenis (motion) · Web3Forms (email) · Vercel (hosting).

## Run it locally
```bash
npm install
# edit .env and paste your WEB3FORMS_ACCESS_KEY (form is optional for local dev)
npm run dev                  # http://localhost:3000
```

## Edit content (no code needed)
Everything that changes each semester lives in `src/content/`:
- `roster.ts` — members (auto-generated; run `npm run build-roster` after adding photos)
- `repertoire.ts` — songs / album covers
- `performances.ts` — shows
- `club.ts` — name, email, socials, blurb

## Add members
1. Drop headshots in `public/images/roster/<semester>/<section>/<name>_<instrument>.png`
2. `npm run build-roster`
The newest semester (first alphabetically-by-date) is marked `current` and shown by default.

## Add repertoire cover art
All 49 songs live in `src/content/repertoire.ts`. Covers are auto-matched by title
(`public/images/repertoire/<slug>.jpg`). To fetch the most famous album cover for each
from Apple's iTunes API:
```bash
npm run fetch-covers              # downloads missing covers
npm run fetch-covers -- --force   # re-download all
```
Any song without a match shows a styled placeholder card — safe to leave, or drop art in manually.
To add a song: add it to `src/content/repertoire.ts` **and** the `SONGS` list in
`scripts/fetch-repertoire-covers.mjs`, then re-run the script.

## Deploy
Push to `main` → Vercel builds and ships. Add the env vars from `.env.example` in the Vercel dashboard.
