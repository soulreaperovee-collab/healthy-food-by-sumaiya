-- Supabase schema for Healthy Food by Sumaiya
-- E-commerce platform for Bangladesh market

-- Enable RLS for all tables
-- RLS policies will be applied automatically

-- Categories table
create table categories (
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
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_bn text,
  slug text unique not null,
  description text,
  category_id uuid references categories(id) on delete,
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
create table product_variants (
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
create table orders (
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
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete,
  variant_id uuid references product_variants(id),
  product_name text not null,
  product_slug text not null,
  sku text not null,
  price numeric(10,2) not null,
  quantity int not null check (quantity > 0),
  created_at timestamp with time zone default now()
);

-- Enable RLS policies
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Create policies
create policy "users can view all categories" on categories for select using true;
create policy "users can view products in categories" on products for select using true;

-- Enable real-time subscriptions (optional)
-- create publication for all tables;