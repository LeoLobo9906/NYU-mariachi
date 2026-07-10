# ARC.md — NYU Mariachi Violetas Website Architecture

Framework documentation and working guide for the NYU Mariachi Violetas website (live at [nyumariachi.com](https://nyumariachi.com)). Read this before making changes. It is the single source of truth for how this project is structured and how to extend it.

---

## 1. What this is

The official website for **NYU Mariachi Violetas** (a.k.a. Mariachi Violetas de NYU), a student-led mariachi ensemble at New York University. The site has two audiences:

1. **People who might hire us** — event planners, NYU departments, community organizations. They need to quickly understand who we are, hear/see the group, browse our repertoire, and reach us with a booking inquiry.
2. **Students who might join** — a clear "join the club" path and a look at current members.

Success = looks professional, loads fast, ranks in search (so people can find us), and makes it trivial to send a booking request.

---

## 2. Tech stack & why

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SEO via server rendering + static generation, file-based routing, built-in API routes so we get a "backend" for forms without a separate server. |
| Language | **TypeScript** | Type-safe content models (roster, repertoire) catch mistakes before they ship. |
| UI | **React 19** | Component reuse (member cards, song cards) instead of copy-pasted HTML. |
| Motion | **Framer Motion + Lenis** | Cinematic feel: Lenis drives smooth scroll; Framer Motion powers scroll-triggered reveals and parallax. Respects `prefers-reduced-motion`. |
| Styling | **Tailwind CSS v4** | Light **white + NYU-violet** design system via `@theme` tokens in `src/app/globals.css`. (The `gold` token name is retained but maps to NYU violet, and `shadow` is a dark-violet used for photo scrims.) |
| Images | **next/image** | Automatic resizing/compression for the hundreds of member photos. Critical for load speed. |
| Forms/email | **Web3Forms (client-side)** | The contact/booking form submits directly from the browser to the Web3Forms API (their bot protection rejects server-side posts). Validation is via HTML `required` + the form's own logic. No backend/database. (`src/app/api/contact/route.ts` + `src/lib/email.ts` remain as an unused server-side path.) |
| Hosting | **Vercel** | Zero-config Next.js deploys, free tier, previews per branch, serverless functions for the form. |

**Decision: no separate Flask/Python backend.** This is a content site. The only server-side need is handling the contact form, which a single Next.js route handler covers. A standalone backend would add hosting cost and maintenance for no benefit. (If the club later needs auth, a real database, or an admin dashboard, revisit — but not now.)

**Decision: "editable roster" without a CMS.** Members change every semester. Rather than a database or CMS login, the roster lives in a typed data file (`src/content/roster.ts`) that anyone can edit via a pull request. A helper script can also generate it from the image folders. This keeps hosting free and edits reviewable in Git.

---

## 3. Project structure

```
mariachi-nyu/
├── public/
│   ├── images/
│   │   ├── logo/nyu_logo.png        # logo (also the favicon source + watermark)
│   │   ├── mariachi_photos/         # hero + gallery photos (photo_1..N)
│   │   ├── groups/                  # instrument-group photos: armonia/violins/brass.jpg + diego.jpg
│   │   ├── roster/                  # member headshots, by semester/section
│   │   │   ├── spring_2026/{armonia,violins,woodwind_brass,vocalists}/
│   │   │   └── ...
│   │   ├── repertoire/              # song / album cover art (run fetch-covers)
│   │   └── mono.png / mono.svg      # the group's moño emblem (vector-traced)
│   └── videos/                      # performance clips (video_1..N .mp4)
│
├── src/
│   ├── app/                        # routes (App Router — folder = URL)
│   │   ├── layout.tsx              # root: <Navbar>, <Footer>, fonts, JSON-LD, SmoothScroll
│   │   ├── icon.png                # favicon (Next auto-detects) — the logo
│   │   ├── page.tsx                # Home (/)
│   │   ├── about/page.tsx          # /about
│   │   ├── _performances_archived/ # archived (underscore = not routed)
│   │   ├── repertoire/page.tsx     # /repertoire  (song cover cards)
│   │   ├── members/page.tsx        # /members     (roster by semester + section)
│   │   ├── media/page.tsx          # /media       (Photos collage + Videos tab)
│   │   ├── contact/page.tsx        # /contact     (booking / join form)
│   │   ├── api/contact/route.ts    # legacy server-side email path (unused; form posts client-side)
│   │   ├── sitemap.ts / robots.ts  # SEO
│   │
│   ├── components/
│   │   ├── providers/              # SmoothScroll (Lenis)
│   │   ├── layout/                 # Navbar, Footer, Container
│   │   ├── ui/                     # Reveal, Parallax, Marquee, PageHeader, PapelPicado, Mono, LogoWatermark
│   │   ├── home/                   # Hero (full-screen cinematic hero)
│   │   ├── members/                # MemberCard, SemesterRoster
│   │   ├── repertoire/             # SongCard
│   │   ├── media/                  # Collage (photo lightbox), VideoGrid, MediaTabs
│   │   └── forms/                  # ContactForm (client — posts to Web3Forms)
│   │
│   ├── content/                    # ← EDIT HERE to change site content ("the CMS")
│   │   ├── club.ts                 # name, tagline, blurb (home) + story (About), email, socials, auditionUrl
│   │   ├── roster.ts               # members by semester → section (AUTO-GENERATED)
│   │   ├── repertoire.ts           # songs with interpreter + genre
│   │   ├── videos.ts               # Media video clip paths + order
│   │   ├── gallery.ts              # Media photos (AUTO-GENERATED)
│   │   └── performances.ts         # events (archived page)
│   │
│   ├── lib/                        # types.ts, email.ts, seo.ts, utils.ts (slugify)
│   └── app/globals.css             # Tailwind import + @theme tokens (light NYU palette, motion)
│
├── scripts/
│   ├── build-roster.mjs            # scans public/images/roster → roster.ts (+ SECTION_LABELS, NAME_FIX)
│   ├── build-gallery.mjs           # scans public/images/mariachi_photos → gallery.ts
│   └── fetch-repertoire-covers.mjs # downloads album art from iTunes → public/images/repertoire
│
├── ARC.md                          # this file       README.md   next.config.ts   tsconfig.json
└── .env                            # (gitignored) NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, NEXT_PUBLIC_SITE_URL
```

**Section labels** (Armonía, Violins & Flutes, Brass, Vocalists) and **name fixes** (e.g. Anahí) live in `scripts/build-roster.mjs`; re-run `npm run build-roster` after changing them or the photos.

---

## 4. Data models (the content contracts)

Defined in `src/lib/types.ts`. All editable content conforms to these.

```ts
// A person in the ensemble for a given semester.
export type Section = "armonia" | "violins" | "woodwind_brass" | "vocalists";

export interface Member {
  name: string;
  section: Section;
  instruments: string[];        // e.g. ["guitar", "vihuela"]
  isVocalist?: boolean;
  photo: string;                // path under /public, e.g. "/images/roster/spring_2026/armonia/leo_guitar.png"
}

export interface Semester {
  id: string;                   // "spring_2026"
  label: string;                // "Spring 2026"
  current?: boolean;            // marks the roster shown by default
  members: Member[];
}

// A piece in the group's repertoire — rendered as a cover card.
export interface Song {
  title: string;
  artist?: string;              // original artist or "arr. by ..."
  cover: string;                // "/images/repertoire/el_mariachi.jpg"
  genre?: string;               // "Ranchera", "Son", "Bolero"...
  year?: number;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

// A performance / booking-worthy event.
export interface PerformanceEvent {
  title: string;
  date: string;                 // ISO "2026-04-18"
  venue?: string;
  description?: string;
  photo?: string;
  upcoming: boolean;
}
```

`src/content/*.ts` files export typed arrays/objects using these types. Because they're typed, a missing field or typo is a compile error, not a broken page.

---

## 5. Common tasks (how to edit)

**Add / update the current semester's members**
1. Drop headshots in `public/images/roster/<semester>/<section>/<name>_<instrument>.png`.
2. Run `npm run build-roster` to regenerate the data, OR hand-edit `src/content/roster.ts`.
3. Set `current: true` on the newest semester so it shows by default on `/members`.

**Add a song to the repertoire**
1. Put the cover image in `public/images/repertoire/`.
2. Add an entry to `src/content/repertoire.ts` (`title`, `cover`, optional `spotifyUrl`/`youtubeUrl`).
It appears automatically as a card on `/repertoire`.

**Add a performance/event** → add to `src/content/performances.ts` (`upcoming: true/false`).

**Change club info, email, or social links** → edit `src/content/club.ts`. Referenced everywhere (footer, contact, JSON-LD), so update once.

**Change the theme (colors, fonts)** → `src/app/globals.css` theme tokens.

---

## 6. The contact / booking form (the only "backend")

- `src/components/forms/ContactForm.tsx` — client component. Fields: name, email, organization, inquiry type (`Booking` / `Join` / `General`), event date (optional), message.
- **Submission is client-side.** The browser posts directly to `https://api.web3forms.com/submit` with the public access key. Web3Forms' bot protection rejects server-side posts (403), so there is no server round-trip; validation is via HTML `required` + the form's own logic, and the club inbox tied to the access key receives the email.
- The access key is `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env` (gitignored) and in Vercel env vars. It is public by design (Web3Forms keys are safe to expose). Without it set, the form shows a "not configured" message and doesn't send.
- `src/app/api/contact/route.ts` + `src/lib/email.ts` remain as an unused legacy server-side path.
- No database — submissions arrive as email.

---

## 7. SEO & "hire us" discoverability

This is a business goal, not decoration. Implemented via:
- Per-page `metadata` (title, description, OpenGraph image) using helpers in `src/lib/seo.ts`.
- **JSON-LD `MusicGroup` structured data** in the root layout — tells Google we're a musical group available for events (name, logo, sameAs socials, area served). This is what surfaces rich results for "mariachi near NYU / NYC."
- `sitemap.ts` + `robots.ts` auto-generated.
- Fast Core Web Vitals via `next/image` and static rendering (all pages except the form are prerendered).

---

## 8. Commands

```bash
npm install            # install dependencies
npm run dev            # local dev server → http://localhost:3000
npm run build          # production build (also catches type errors)
npm run start          # run the production build locally
npm run lint           # ESLint
npm run build-roster   # regenerate src/content/roster.ts from image folders
npm run build-gallery  # regenerate src/content/gallery.ts (Media collage) from image folders
npm run fetch-covers   # download repertoire album covers from the iTunes API
```

**Media = Photos + Videos tabs.** `/media` renders `MediaTabs` (client) with two tabs:
- **Photos** — a masonry `Collage` (click to open a lightbox) of every photo, generated into `src/content/gallery.ts` by `build-gallery` (reads real image dimensions so nothing is cropped). Re-run after adding photos.
- **Videos** — a `VideoGrid` of the clips listed in `src/content/videos.ts` (drop `.mp4`s in `public/videos/`, add their paths; list order = display order).

**Performances archived.** The `/performances` route is parked in
`src/app/_performances_archived/` (underscore = private folder, not routed) and removed
from the nav. Content still lives in `src/content/performances.ts`. To bring it back:
rename the folder to `performances` and re-add the nav link in `components/layout/Navbar.tsx`.

Deploy: push to `main` → Vercel builds and ships. Feature branches get preview URLs automatically.

---

## 9. Conventions

- **Content vs. code stay separated.** Anything that changes each semester lives in `src/content/`. Never hardcode member names, song titles, or emails inside components.
- **Server Components by default.** Only add `"use client"` for interactive pieces (the form, semester tabs, mobile menu).
- **Reuse UI primitives** from `components/ui` — don't restyle buttons/cards per page.
- **Images**: always `next/image` with real `width`/`height` or `fill`; always meaningful `alt`.
- **No secrets in the repo.** Everything sensitive goes in `.env.local`.
- **URL-safe names**: folders/files use lowercase, underscores, no `&` or spaces.
- Keep it accessible: semantic HTML, alt text, keyboard-navigable menu, sufficient color contrast on the purple theme.

---

## 10. Roadmap / open items

- [x] Scaffold the Next.js project and migrate `/images` → `/public/images` (renamed `woodwind&brass` → `woodwind_brass`, `vocalist_only` → `vocalists`).
- [x] Build `scripts/build-roster.mjs` to parse `name_instrument.png` filenames (106 members across 5 semesters generated).
- [x] Immersive design system (Lenis smooth scroll, Framer Motion reveals/parallax, cinematic hero, bento gallery).
- [ ] Source repertoire cover art — add `el_rey.jpg` + `ya_no_me_interesas.jpg` (and others) to `public/images/repertoire/`. Cards fall back to a styled placeholder until then.
- [ ] Wire email: get a Web3Forms access key (register nyumariachi@gmail.com), add `WEB3FORMS_ACCESS_KEY` to `.env` (and Vercel).
- [ ] Replace/curate the hero + gallery photos and finalize About copy.
- [ ] Confirm official social links and booking contact in `src/content/club.ts`.

> Legacy static HTML/CSS/JS was moved to `_legacy/` (recoverable, not used by the app). The original `/images` folder is left in place; the app reads from `/public/images`.
```
