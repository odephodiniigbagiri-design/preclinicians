-- OWNER ACCESS for Preclinicians
-- Run once in the Supabase SQL editor (runs as the postgres role).

-- 1) A flag on each profile. Everyone defaults to false.
alter table public.profiles
  add column if not exists is_owner boolean not null default false;

-- 2) Lock the flag: students cannot set it on their own row, whether by insert or update,
--    even if your row-level-security policies let them edit their own profile.
--    Only the SQL editor (postgres) and the service role can change it.
create or replace function public.protect_owner_flag()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.is_owner := false;
  else
    new.is_owner := old.is_owner;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_owner_flag on public.profiles;
create trigger protect_owner_flag
  before insert or update on public.profiles
  for each row execute function public.protect_owner_flag();

-- 3) Give yourself owner access. Sign up / log in to the app once first so your profile row exists,
--    then replace the email below with the one you use in the app and run this line.
-- update public.profiles set is_owner = true where email = 'YOUR-EMAIL-HERE';

-- To remove owner access later:
-- update public.profiles set is_owner = false where email = 'YOUR-EMAIL-HERE';
