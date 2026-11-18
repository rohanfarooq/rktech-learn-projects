-- Run this once in Supabase: SQL Editor > New query > Run

-- 1. The notes table
create table public.notes (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Only logged-in users can use the table
grant select, insert, update, delete on public.notes to authenticated;

-- 3. Row Level Security: everyone sees only their own notes
alter table public.notes enable row level security;

create policy "Read own notes" on public.notes
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Add own notes" on public.notes
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Edit own notes" on public.notes
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Delete own notes" on public.notes
  for delete to authenticated
  using ((select auth.uid()) = user_id);
