-- projects: portfolio projects shown on the site
-- Run in Supabase SQL Editor. RLS below allows the Next.js API (anon key) to read all rows.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  description text,
  url text,
  tags text[] default '{}',
  featured boolean not null default false,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create index if not exists projects_featured_idx
  on public.projects (featured desc, sort_order asc);

alter table public.projects enable row level security;

-- Replace legacy policy name if you ran an older version of this script
drop policy if exists "Public read published projects" on public.projects;
drop policy if exists "Public read projects" on public.projects;

create policy "Public read projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Optional seed (uncomment once; adjust slugs / URLs)
-- insert into public.projects (slug, title, summary, description, url, tags, featured, sort_order) values
--   (
--     'finance-tracker',
--     'Finance Tracker App',
--     'A native Android app for personal budget management built with Jetpack Compose and Room DB.',
--     'Longer case-study body if you use description elsewhere.',
--     'https://example.com/case-studies/finance-tracker',
--     array['Kotlin', 'Compose', 'Room', 'Material3'],
--     true,
--     0
--   ),
--   (
--     'fitness-wellness',
--     'Fitness & Wellness Platform',
--     'Cross-platform wellness app with workouts, nutrition tracking, and progress insights.',
--     null,
--     'https://example.com/case-studies/fitness',
--     array['Flutter', 'Firebase', 'Riverpod'],
--     false,
--     1
--   );
