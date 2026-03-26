-- blog_posts: articles / posts linked from the home page (same shape as projects for consistency)
-- Run in Supabase SQL Editor. RLS allows the Next.js API (anon key) to read all rows.

create table if not exists public.blog_posts (
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

create index if not exists blog_posts_featured_idx
  on public.blog_posts (featured desc, sort_order asc);

alter table public.blog_posts enable row level security;

drop policy if exists "Public read blog posts" on public.blog_posts;

create policy "Public read blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (true);

-- Optional seed (uncomment once)
-- insert into public.blog_posts (slug, title, summary, description, url, tags, featured, sort_order) values
--   (
--     'compose-state',
--     'State in Jetpack Compose',
--     'Patterns I use for predictable UI state in production Compose apps.',
--     null,
--     'https://example.com/blog/compose-state',
--     array['Android', 'Compose'],
--     true,
--     0
--   );
