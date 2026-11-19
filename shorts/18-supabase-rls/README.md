# Every User Can See Everyone's Notes? Turn On Row Level Security (Supabase) #Shorts

**Video:** [Every User Can See Everyone's Notes? Turn On Row Level Security (Supabase) #Shorts](https://youtu.be/9A2dPBd2Frk)  
**Goes live:** Sat Nov 21, 2026, 5:00 PM PKT  
**Status:** Scheduled  
**From the full project:** [Build a Full-Stack Notes App with React + Supabase](../../projects/08-fullstack-notes/)

## The bug

The app loads notes with `supabase.from("notes").select("*")` and no user filter. The publishable key ships to the browser, so a filter in React can't protect anything. With Row Level Security (RLS) off, Bob's app loads Alice's notes too.

See [`bug.sql`](bug.sql).

## The fix

Fix it in the database. `alter table public.notes enable row level security;` locks every row by default. Then one policy, `using ((select auth.uid()) = user_id)`, lets each logged-in user read only rows where `user_id` is their own id. The React query doesn't change; Postgres filters the rows.

See [`fix.sql`](fix.sql). The full schema, with insert, update and delete policies too, is in the finished project above.

## Tested

We tested it with two real users on a local Supabase: with RLS off, Bob sees Alice's note; with RLS on, each user sees only their own, and with no matching policy nothing is readable (7 of 7 checks passed).

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
