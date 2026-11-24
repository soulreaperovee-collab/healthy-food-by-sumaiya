-- Migration: Add admin_push_subscriptions table for Web Push Notifications
-- Run this on existing Supabase database
-- For fresh installations, this is included in supabase/init.sql

-- Admin push subscriptions table
create table if not exists admin_push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz default now(),
  last_used_at timestamptz,
  unique (admin_user_id, endpoint)
);

alter table admin_push_subscriptions enable row level security;

-- Only authenticated admins can manage their own subscriptions
create policy "admin manage own subscriptions" on admin_push_subscriptions
  for all using (auth.uid() = admin_user_id)
  with check (auth.uid() = admin_user_id);

-- Service role can read all for sending notifications (server-side only)
create policy "service role read all subscriptions" on admin_push_subscriptions
  for select using (auth.role() = 'service_role');

create index if not exists idx_admin_push_subscriptions_user on admin_push_subscriptions(admin_user_id);