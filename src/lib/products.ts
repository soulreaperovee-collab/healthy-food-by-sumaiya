import { getServerSupabase } from './supabase-server';
import { formatPrice } from './utils';

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
  sku: string;
  is_organic: boolean;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export async function getProducts(): Promise<Product[]> {
  // Return empty array during build if Supabase not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const supabase = await getServerSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Return null during build if Supabase not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  try {
    const supabase = await getServerSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const supabase = await getServerSupabase();

    // First get category ID
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (!category) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const supabase = await getServerSupabase();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
}

export async function validateProductForOrder(
  productId: string,
  quantity: number
): Promise<{ valid: boolean; product?: Product; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return { valid: false, error: 'Service not configured' };
  }

  try {
    const supabase = await getServerSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, price, stock, is_active, sku, category_id, unit, is_organic, is_featured, description, compare_at_price, unit_grams, created_at, updated_at')
      .eq('id', productId)
      .single();

    if (error || !data) {
      return { valid: false, error: 'Product not found' };
    }

    if (!data.is_active) {
      return { valid: false, error: 'Product is not available' };
    }

    if (data.stock < quantity) {
      return { valid: false, error: `Only ${data.stock} items available` };
    }

    return { valid: true, product: data as Product };
  } catch {
    return { valid: false, error: 'Service not configured' };
  }
}

export function formatProductPrice(price: number): string {
  return formatPrice(price);
}