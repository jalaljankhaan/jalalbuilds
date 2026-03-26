## jalalbuilds

Personal branding site for Jalal, built with Next.js 13 (App Router), TypeScript, Tailwind CSS, and Supabase.

### Tech stack

- **Framework**: Next.js 13 App Router + TypeScript
- **Styling**: Tailwind CSS with custom brand tokens
- **Backend-as-a-service**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Tooling**: ESLint, Prettier, Husky, lint-staged
- **Architecture**: SOLID, modular, feature-oriented folders under `app/*`

### Folder structure

- `src/app/` – App Router entrypoints and UI
  - `src/app/page.tsx` – home page
  - `src/app/layout.tsx` – root layout (`SiteShell` + `SiteFooter`)
- `src/components/` – shared UI (`Navbar`, `SiteFooter`, sections, contact form)
- `lib/services/` – Supabase clients and domain services
- `lib/utils/` – utilities (e.g. `env.ts`)
- `lib/types/` – shared types
- `public/` – static assets
- `scripts/` – automation scripts
- `tests/` – tests

> **Routing note:** Routes are defined by `src/app/**/page.tsx` files (Next.js App Router). The `app/pages` folder is used as a modular space for page-related logic, not for routing.

### Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

Required keys:

- `NEXT_PUBLIC_SUPABASE_URL` – full project URL from Supabase **Settings → API**, e.g. `https://abcdefgh.supabase.co` (must include `https://`). Placeholder text or a non-URL value will fail validation.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – **anon public** key from the same page.

Values are trimmed and optional surrounding `"` / `'` quotes are stripped so typical `.env` formatting still works.

Leads from the contact form are stored in Supabase (`contact_messages`). Review them in the Supabase dashboard.

**Contact form:** Run these once in the [Supabase SQL Editor](https://supabase.com/dashboard):

- `scripts/sql/contact_messages.sql` — `contact_messages` table + RLS so anonymous inserts from the API succeed (no public read of messages).
- `scripts/sql/contact_packages.sql` — `contact_packages` table, RLS for public read of active rows, and seed options for “Select Package”. Edit labels or `sort_order` anytime without redeploying.
- `scripts/sql/projects_portfolio.sql` — `projects` table (`slug`, `title`, `summary`, optional `description`, optional `url`, `tags` as `text[]`, `featured`, `sort_order`, `created_at`), index on `(featured desc, sort_order asc)`, RLS so **anon can read** rows for the home page grid.
- `scripts/sql/blog_posts.sql` — `blog_posts` table (same column layout as `projects`), index and RLS for **anon read**, used by the horizontal blog section on the home page.

**Security:** If `.env.local` or any file containing these keys was ever committed or pushed to a remote repository, rotate your Supabase anon key immediately in the [Supabase Dashboard](https://supabase.com/dashboard) (Settings → API).

**Footer social icons (optional):** Set any of these in `.env.local` as full `https://` URLs. They are **server-only** (no `NEXT_PUBLIC_` prefix), so they are not bundled into client JavaScript. Only icons with a valid URL are shown; each opens in a new tab.

- `SOCIAL_LINKEDIN_URL`
- `SOCIAL_GITHUB_URL`
- `SOCIAL_UPWORK_URL`
- `SOCIAL_FACEBOOK_URL`
- `SOCIAL_INSTAGRAM_URL`
- `SOCIAL_YOUTUBE_URL`

### Scripts

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

### Git hooks

- **pre-commit**: runs `lint-staged` to apply ESLint + Prettier to staged files.

### Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up env vars:

   ```bash
   cp .env.example .env.local
   # then edit .env.local with your actual keys
   ```

3. Run dev server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` to see the `jalalbuilds` homepage.
