-- Denis Horgan website — Supabase schema
-- Run this in the Supabase SQL Editor after creating a new project.

create extension if not exists "pgcrypto";

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city text not null,
  state text not null default 'IL',
  zip text,
  price integer not null,
  beds integer,
  baths numeric(4,1),
  sqft integer,
  status text not null default 'For Sale'
    check (status in ('For Sale','Pending','Sold','Coming Soon','Off Market')),
  featured boolean not null default false,
  description text,
  photos jsonb not null default '[]'::jsonb,
  mls_number text,
  redfin_url text,
  listing_type text default 'Listing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_featured_idx on properties (featured) where featured = true;
create index if not exists properties_status_idx on properties (status);
create index if not exists properties_city_idx on properties (city);

-- updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_properties_updated_at on properties;
create trigger trg_properties_updated_at
  before update on properties
  for each row execute procedure set_updated_at();

-- Row Level Security: public read, no public writes.
-- All writes go through the service-role key on the server (admin API).
alter table properties enable row level security;

drop policy if exists "public read properties" on properties;
create policy "public read properties" on properties
  for select using (true);

-- Storage bucket for property photos.
-- Create this in Supabase Dashboard → Storage → New bucket → name 'property-photos' → Public.
-- (Programmatic creation via SQL is restricted on hosted Supabase.)
