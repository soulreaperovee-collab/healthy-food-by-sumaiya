export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  name_bn?: string;
  slug: string;
  description?: string;
  category_id: string;
  price: number;
  compare_at_price?: number;
  unit: string;
  unit_grams?: number;
  image?: string;
  images?: string[];
  stock: number;
  sku: string;
  is_organic: boolean;
  is_active: boolean;
  is_featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string;
  price?: number;
  stock: number;
}

export interface CartItem {
  product_id: string;
  variant_id?: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
  unit?: string;
}

export interface OrderItem {
  product_id: string;
  variant_id?: string;
  product_name: string;
  product_slug: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  delivery_instructions?: string;
  payment_method: "cod" | "bkash" | "nagad";
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  items: OrderItem[];
  status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export type PaymentMethod = "cod" | "bkash" | "nagad";

export interface CheckoutInput {
  customer_name: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  delivery_instructions?: string;
  payment_method: PaymentMethod;
  items: Array<{
    product_id: string;
    variant_id?: string;
    product_name: string;
    product_slug: string;
    sku: string;
    price: number;
    quantity: number;
  }>;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: "customer" | "admin";
}
