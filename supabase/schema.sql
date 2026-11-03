-- Run once in Supabase → SQL Editor
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now()
);

-- Blocks duplicates regardless of letter case
create unique index if not exists registrations_email_unique
  on public.registrations (lower(email));

-- Lock the table: no public (anon) access. The site uses the service role on the server only.
alter table public.registrations enable row level security;
