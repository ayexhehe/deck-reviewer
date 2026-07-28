create table if not exists public.scores (
  id bigint generated always as identity primary key,
  nickname text not null check (char_length(trim(nickname)) between 1 and 24),
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  pct numeric(5, 2) not null check (pct >= 0 and pct <= 100),
  created_at timestamptz not null default now()
);

alter table public.scores enable row level security;

create policy "Anyone can view scores"
  on public.scores for select
  to anon
  using (true);

create policy "Anyone can submit a score"
  on public.scores for insert
  to anon
  with check (
    char_length(trim(nickname)) between 1 and 24
    and score >= 0
    and score <= total
    and total > 0
  );
