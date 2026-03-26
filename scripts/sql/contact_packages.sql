-- Run once in Supabase SQL Editor.

create table if not exists public.contact_packages (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists contact_packages_active_sort_idx
  on public.contact_packages (is_active, sort_order);

alter table public.contact_packages enable row level security;

drop policy if exists "Public read active contact packages" on public.contact_packages;
create policy "Public read active contact packages"
  on public.contact_packages
  for select
  to anon, authenticated
  using (is_active = true);

-- Seed (run once; skip if rows already exist)
insert into public.contact_packages (label, sort_order, is_active) values
  ('Under $2,500', 0, true),
  ('$2,500 – $10,000', 1, true),
  ('$10,000+', 2, true);
