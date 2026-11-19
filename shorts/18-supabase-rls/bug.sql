-- The bug: the notes table has no Row Level Security.
-- The app loads notes with no user filter:
--   supabase.from("notes").select("*")
-- and the publishable key ships to the browser, so with RLS off
-- any logged-in user (Bob) can read every user's notes (Alice's too).

alter table public.notes disable row level security;  -- don't do this
