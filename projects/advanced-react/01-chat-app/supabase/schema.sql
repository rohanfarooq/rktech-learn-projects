-- Run this once in Supabase: SQL Editor > New query > Run

-- 1. The messages table
create table public.messages (
  id bigint generated always as identity primary key,
  room text not null check (room in ('general', 'react', 'help')),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  username text not null check (char_length(username) between 1 and 30),
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamptz not null default now()
);

create index messages_room_created_at on public.messages (room, created_at);

-- 2. Only logged-in users can use the table
grant select, insert on public.messages to authenticated;

-- 3. Row Level Security: everyone can read, but you can only send as yourself
alter table public.messages enable row level security;

create policy "Logged-in users read messages" on public.messages
  for select to authenticated
  using (true);

create policy "Send messages as yourself" on public.messages
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- 4. Turn on Realtime for this table
alter publication supabase_realtime add table public.messages;
