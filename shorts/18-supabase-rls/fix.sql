-- The fix lives in the database, not in React.

-- 1. Lock every row by default
alter table public.notes enable row level security;

-- 2. Let each logged-in user read only their own notes
create policy "Read own notes" on public.notes
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- The React query stays the same: supabase.from("notes").select("*")
-- Postgres now filters the rows for you.
-- The full project also has insert, update and delete policies:
-- see projects/08-fullstack-notes/supabase/schema.sql
