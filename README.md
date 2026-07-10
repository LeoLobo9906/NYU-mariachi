# NYU Mariachi Violetas — Website

The official website for **NYU Mariachi Violetas**, a student-led mariachi ensemble at New York University. Built to look professional, load fast, rank in search, and make it effortless for people to book the group.

**Live:** [nyumariachi.com](https://nyumariachi.com)

---

## What it is

A cinematic, culturally-rooted marketing site with two audiences in mind: people who might **hire** the group, and students who might **join**. Highlights:

- **Immersive, motion-driven UI** — smooth scroll (Lenis), scroll-triggered reveals and parallax (Framer Motion), a full-screen cinematic hero.
- **Hand-built SVG artwork** — a detailed **papel picado** garland (cut-paper banners with mariachi instruments — violins, trumpets, guitars, sombreros, maracas) that hangs in a real catenary swag, plus the group's **moño (mono)** emblem and a faint logo watermark. Generated in code, themed to NYU violet.
- **Auto-generated roster** — member cards are built directly from the photo folders (`npm run build-roster`), grouped by semester and section (Armonía, Violins & Flutes, Brass, Vocalists).
- **Repertoire with real album art** — 70+ songs, cover images fetched from Apple's iTunes API.
- **Photo + video gallery** — a Media page with a Pinterest-style photo collage (click to open a lightbox) and a **Videos tab** of performance clips.
- **Booking / contact form** — validates required event details and emails the club inbox via Web3Forms (no backend server needed).
- **SEO-ready** — per-page metadata, `MusicGroup` structured data, sitemap, robots, and a logo favicon.
- **Fully responsive** and accessible, on a clean white + NYU-violet design system.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion + Lenis · Web3Forms · Vercel.

> Deep-dive on architecture, conventions, and file layout: **[ARC.md](./ARC.md)**.

---

## Run it locally

```bash
npm install
cp -n .env.example .env 2>/dev/null || true   # then paste your key (see below)
npm run dev                                    # http://localhost:3000
```

Create a `.env` (gitignored) with:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-key   # makes the contact form send
NEXT_PUBLIC_SITE_URL=https://nyumariachi.com
```

The site runs fine without the key — the contact form just won't send until it's set.

---

## Editing content (no coding needed)

Everything that changes each semester lives in `src/content/`:

| File | What it controls |
|---|---|
| `roster.ts` | Members (auto-generated — see below) |
| `repertoire.ts` | Songs and their interpreters |
| `videos.ts` | Media page video clips + their order |
| `gallery.ts` | Media page photos (auto-generated) |
| `performances.ts` | Events (currently unused; Performances tab is archived) |
| `club.ts` | Name, email, socials, short `blurb` (home) + full `story` (About), audition-form link |

**Add / update members**
1. Drop headshots in `public/images/roster/<semester>/<section>/<name>_<instrument>.png` (e.g. `spring_2026/violins/clarissa_violin.png`).
2. Run `npm run build-roster`. The newest semester is shown by default.

**Add photos to the Media gallery**
1. Drop images in `public/images/mariachi_photos/`.
2. Run `npm run build-gallery`.

**Add performance videos**
1. Drop `.mp4` files in `public/videos/`.
2. Add their paths to `src/content/videos.ts` (the list order = the on-page order).
They appear under the Media page's **Videos** tab. Note: video files are large — for many/long clips, consider hosting on YouTube and embedding instead (lighter repo + no bandwidth cost).

**Instrument-group / section photos** live in `public/images/groups/` (`armonia.jpg`, `violins.jpg`, `brass.jpg`) and `diego.jpg` (About lead). Section labels are set in `scripts/build-roster.mjs` (`SECTION_LABELS`).

**Add repertoire cover art**
Covers auto-match by song title. To fetch them from Apple's iTunes API:
```bash
npm run fetch-covers            # download missing covers
npm run fetch-covers -- --force # re-download all
```
Songs without a match show a styled placeholder — safe to leave.

**Change the name, email, socials, or audition link** → edit `src/content/club.ts` (it flows everywhere automatically).

---

## Deploying

Hosted free on **Vercel**. Every push to the `main` branch auto-rebuilds and redeploys:

```bash
git add -A
git commit -m "describe your change"
git push
```

Secrets live in Vercel → Project → **Environment Variables** (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, `NEXT_PUBLIC_SITE_URL`), never in the repo.

---

## Handover / maintainers

This site is meant to outlast any one member. To keep the club in control:

**Accounts that must be transferred to the next maintainer** (ideally all owned by the club's shared email, `nyumariachi@gmail.com`):

1. **GitHub** — this repository (add the incoming maintainer as a collaborator, or transfer ownership).
2. **Vercel** — hosting + the `nyumariachi.com` domain (the site auto-deploys from GitHub `main`).
3. **Web3Forms** — the contact-form account; submissions are emailed to whatever address owns the access key.
4. **The club Gmail** — receives booking inquiries and ties the above together.

**To take over the site, a new maintainer only needs to:** clone the repo, run it locally (above), edit content in `src/content/` + `public/images/`, and `git push` — Vercel handles the rest. Read **[ARC.md](./ARC.md)** for the full picture.
