-- Run once in Supabase SQL Editor (public contact form → server uses anon key).
-- Inserts only: no SELECT policy for anon, so messages stay private.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Allow unauthenticated form submissions (Next.js API uses NEXT_PUBLIC_SUPABASE_ANON_KEY).
drop policy if exists "Allow public insert contact messages" on public.contact_messages;
create policy "Allow public insert contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Intentionally no SELECT/UPDATE/DELETE for anon — leads are read from the dashboard with a privileged role.
