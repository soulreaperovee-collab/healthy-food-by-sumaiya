-- Supabase schema for Healthy Food by Sumaiya
-- E-commerce platform for Bangladesh market
-- Idempotent: safe to rerun after partial execution

-- ============================================
-- TABLES
-- ============================================

-- Categories table
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_bn text,
  slug text unique not null,
  description text,
  category_id uuid references categories(id) on delete set null,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  unit text not null,
  unit_grams int,
  sku text unique not null,
  is_organic boolean default false,
  is_active boolean default true,
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Product variants table
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  name text not null,
  sku text unique not null,
  price numeric(10,2),
  stock int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  district text not null,
  upazila text not null,
  address text not null,
  delivery_instructions text,
  payment_method text not null check (payment_method in ('cod', 'bkash', 'nagad')),
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) default 0,
  discount numeric(10,2) default 0,
  total numeric(10,2) not null,
  status text not null check (status in ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')) default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Order items table
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  variant_id uuid references product_variants(id) on delete set null,
  product_name text not null,
  product_slug text not null,
  sku text not null,
  price numeric(10,2) not null,
  quantity int not null check (quantity > 0),
  created_at timestamp with time zone default now()
);

-- Admin push subscriptions table (Web Push Notifications)
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

-- ============================================
-- ENABLE RLS (idempotent)
-- ============================================

alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table admin_push_subscriptions enable row level security;

-- ============================================
-- ADMIN ROLE HELPER FUNCTION (created BEFORE policies)
-- Uses auth.jwt() -> app_metadata (trusted, server-controlled JWT claim)
-- ============================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, auth
as $$
  select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin';
$$;

grant execute on function public.is_admin() to authenticated;

-- ============================================
-- RLS POLICIES (created AFTER is_admin() function)
-- ============================================

-- Drop existing policies to make idempotent
drop policy if exists "public read categories" on categories;
drop policy if exists "admin manage categories" on categories;
drop policy if exists "public read products" on products;
drop policy if exists "admin manage products" on products;
drop policy if exists "public read variants" on product_variants;
drop policy if exists "admin manage variants" on product_variants;
drop policy if exists "admin read all orders" on orders;
drop policy if exists "admin manage orders" on orders;
drop policy if exists "admin read all order_items" on order_items;
drop policy if exists "admin manage order_items" on order_items;

-- CATEGORIES
create policy "public read categories" on categories
  for select using (true);

create policy "admin manage categories" on categories
  for all using (public.is_admin());

-- PRODUCTS
create policy "public read products" on products
  for select using (is_active = true);

create policy "admin manage products" on products
  for all using (public.is_admin());

-- PRODUCT VARIANTS
create policy "public read variants" on product_variants
  for select using (
    exists (
      select 1 from products
      where products.id = product_variants.product_id
      and products.is_active = true
    )
  );

create policy "admin manage variants" on product_variants
  for all using (public.is_admin());

-- ORDERS
create policy "admin read all orders" on orders
  for select using (public.is_admin());

create policy "admin manage orders" on orders
  for all using (public.is_admin());

-- ORDER ITEMS
create policy "admin read all order_items" on order_items
  for select using (public.is_admin());

create policy "admin manage order_items" on order_items
  for all using (public.is_admin());

-- ADMIN PUSH SUBSCRIPTIONS
create policy "admin manage own subscriptions" on admin_push_subscriptions
  for all using (auth.uid() = admin_user_id)
  with check (auth.uid() = admin_user_id);

create policy "service role read all subscriptions" on admin_push_subscriptions
  for select using (auth.role() = 'service_role');

-- ============================================
-- ADMIN ROLE HELPER FUNCTION (created BEFORE policies)
-- Uses auth.jwt() -> app_metadata (trusted, server-controlled JWT claim)
-- ============================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, auth
as $$
  select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin';
$$;

grant execute on function public.is_admin() to authenticated;

-- ============================================
-- RLS POLICIES (created AFTER is_admin() function)
-- ============================================

-- Drop existing policies to make idempotent
drop policy if exists "public read categories" on categories;
drop policy if exists "admin manage categories" on categories;
drop policy if exists "public read products" on products;
drop policy if exists "admin manage products" on products;
drop policy if exists "public read variants" on product_variants;
drop policy if exists "admin manage variants" on product_variants;
drop policy if exists "admin read all orders" on orders;
drop policy if exists "admin manage orders" on orders;
drop policy if exists "admin read all order_items" on order_items;
drop policy if exists "admin manage order_items" on order_items;

-- CATEGORIES
create policy "public read categories" on categories
  for select using (true);

create policy "admin manage categories" on categories
  for all using (public.is_admin());

-- PRODUCTS
create policy "public read products" on products
  for select using (is_active = true);

create policy "admin manage products" on products
  for all using (public.is_admin());

-- PRODUCT VARIANTS
create policy "public read variants" on product_variants
  for select using (
    exists (
      select 1 from products
      where products.id = product_variants.product_id
      and products.is_active = true
    )
  );

create policy "admin manage variants" on product_variants
  for all using (public.is_admin());

-- ORDERS
create policy "admin read all orders" on orders
  for select using (public.is_admin());

create policy "admin manage orders" on orders
  for all using (public.is_admin());

-- ORDER ITEMS
create policy "admin read all order_items" on order_items
  for select using (public.is_admin());

create policy "admin manage order_items" on order_items
  for all using (public.is_admin());

-- ADMIN PUSH SUBSCRIPTIONS
create policy "admin manage own subscriptions" on admin_push_subscriptions
  for all using (auth.uid() = admin_user_id)
  with check (auth.uid() = admin_user_id);

create policy "service role read all subscriptions" on admin_push_subscriptions
  for select using (auth.role() = 'service_role');

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists categories_updated_at on categories;
drop trigger if exists products_updated_at on products;
drop trigger if exists product_variants_updated_at on product_variants;
drop trigger if exists orders_updated_at on orders;

create trigger categories_updated_at
  before update on categories
  for each row execute function public.handle_updated_at();

create trigger products_updated_at
  before update on products
  for each row execute function public.handle_updated_at();

create trigger product_variants_updated_at
  before update on product_variants
  for each row execute function public.handle_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute function public.handle_updated_at();

-- Note: order_items doesn't need updated_at as it's immutable after creation

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_is_active on products(is_active);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_product_variants_product_id on product_variants(product_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_order_items_product_id on order_items(product_id);
create index if not exists idx_admin_push_subscriptions_user on admin_push_subscriptions(admin_user_id);