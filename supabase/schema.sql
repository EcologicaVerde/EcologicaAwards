create table if not exists public.community_votes (
  voter_token text not null,
  category_id text not null,
  nominee_id text not null,
  updated_at timestamptz not null default now(),
  primary key (voter_token, category_id),
  constraint voter_token_len check (char_length(voter_token) between 16 and 128),
  constraint category_id_len check (char_length(category_id) between 1 and 80),
  constraint nominee_id_len check (char_length(nominee_id) between 1 and 120)
);

create index if not exists idx_community_votes_cat_nom
  on public.community_votes (category_id, nominee_id);

alter table public.community_votes enable row level security;

create or replace function public.cast_vote(
  p_voter_token text,
  p_category_id text,
  p_nominee_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(trim(p_voter_token)) < 16 or char_length(trim(p_voter_token)) > 128 then
    raise exception 'invalid_voter_token';
  end if;

  insert into public.community_votes (voter_token, category_id, nominee_id, updated_at)
  values (trim(p_voter_token), trim(p_category_id), trim(p_nominee_id), now())
  on conflict (voter_token, category_id)
  do update set
    nominee_id = excluded.nominee_id,
    updated_at = now();
end;
$$;

create or replace function public.clear_voter_votes(
  p_voter_token text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(trim(p_voter_token)) < 16 or char_length(trim(p_voter_token)) > 128 then
    raise exception 'invalid_voter_token';
  end if;

  delete from public.community_votes
  where voter_token = trim(p_voter_token);
end;
$$;

create or replace function public.get_vote_tallies()
returns table (
  category_id text,
  nominee_id text,
  vote_count bigint
)
language sql
security definer
stable
set search_path = public
as $$
  select
    cv.category_id,
    cv.nominee_id,
    count(*)::bigint as vote_count
  from public.community_votes cv
  group by cv.category_id, cv.nominee_id;
$$;

create or replace function public.get_total_voters()
returns bigint
language sql
security definer
stable
set search_path = public
as $$
  select count(distinct voter_token)::bigint
  from public.community_votes;
$$;

revoke all on table public.community_votes from anon, authenticated;
grant execute on function public.cast_vote(text, text, text) to anon, authenticated;
grant execute on function public.clear_voter_votes(text) to anon, authenticated;
grant execute on function public.get_vote_tallies() to anon, authenticated;
grant execute on function public.get_total_voters() to anon, authenticated;
