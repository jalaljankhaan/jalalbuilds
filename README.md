## jalalbuilds

Personal branding site for Jalal, built with Next.js (App Router), TypeScript, Tailwind CSS, and Cloudflare D1. Hosted on Cloudflare Workers via OpenNext.

### Tech stack

- **Framework**: Next.js App Router + TypeScript (React Compiler)
- **Styling**: Tailwind CSS with custom brand tokens
- **Database**: Cloudflare D1 (SQLite) via Worker binding `DB`
- **Hosting**: Cloudflare Workers (`@opennextjs/cloudflare`, Wrangler)
- **Tooling**: ESLint, Prettier, Husky, lint-staged
- **Architecture**: App Router UI in `src/app` + services in `lib/services` + D1 helper in `lib/db`

### Folder structure

- `src/app/` – App Router entrypoints, UI, and API route handlers
- `src/components/` – shared UI (`Navbar`, `SiteFooter`, sections, contact form)
- `lib/services/` – domain services (D1 queries)
- `lib/db/` – D1 access helper (`getCloudflareContext`)
- `migrations/` – D1 SQL migrations
- `public/` – static assets

### Database (D1)

Schema and seed data live in `migrations/`. Apply before preview/deploy:

```bash
npm run db:migrate:local    # local Miniflare D1 (for preview / next dev bindings)
npm run db:migrate:remote   # production D1 on Cloudflare
```

Tables:

- `contact_messages` — contact form leads (**INSERT-only** from public APIs; never exposed via SELECT routes)
- `contact_packages` — package options for the contact form (seeded)
- `projects` / `blog_posts` — portfolio and blog cards (`tags` stored as JSON text)
- `testimonials` / `newsletter_subscribers` — optional features

**Security:** Only the Worker can access D1. Do not add public API routes that list `contact_messages` or `newsletter_subscribers`.

### Environment variables

Optional social URLs (server-only):

```bash
cp .env.example .env.local
```

- `SOCIAL_LINKEDIN_URL`
- `SOCIAL_GITHUB_URL`
- `SOCIAL_UPWORK_URL`
- `SOCIAL_FACEBOOK_URL`
- `SOCIAL_INSTAGRAM_URL`
- `SOCIAL_YOUTUBE_URL`

Database credentials are **not** env vars — D1 is the `DB` binding in `wrangler.jsonc`.

### Scripts

- **Dev**: `npm run dev` (Next.js Node server; D1 via OpenNext local bindings)
- **Preview**: `npm run preview` (Workers runtime via Wrangler)
- **Deploy**: `npm run deploy`
- **Upload**: `npm run upload`
- **DB migrate local/remote**: `npm run db:migrate:local` / `npm run db:migrate:remote`
- **CF types**: `npm run cf-typegen`
- **Lint / Format**: `npm run lint` / `npm run format`

### Cloudflare Workers

Config:

- `wrangler.jsonc` — Worker, D1 `DB`, assets, Images, observability
- `open-next.config.ts` — Static Assets incremental cache
- `public/_headers` — immutable `/_next/static/*`
- `.dev.vars` — `cp .dev.vars.example .dev.vars`

**Live domains**

- Canonical: https://jnovasystems.com (`jalalbuilds` Worker)
- https://www.jnovasystems.com → **301** to apex (`jalalbuilds-www-redirect` Worker)

Cloudflare manages DNS + SSL for both Custom Domains.

Deploy:

```bash
npm run db:migrate:remote
npm run deploy
```

### Getting started

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run preview
# open http://localhost:8787
```
