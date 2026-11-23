import { supabaseAdmin } from './supabase-server';
import { formatPrice } from './utils';

export interface CheckoutItem {
  product_id: string;
  variant_id?: string;
  quantity: number;
}

export interface CheckoutInput {
  customer_name: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  delivery_instructions?: string;
  payment_method: 'cod' | 'bkash' | 'nagad';
  items: CheckoutItem[];
}

export interface OrderResult {
  success: boolean;
  order_id?: string;
  order_reference?: string;
  error?: string;
}

const DELIVERY_FEE = 50; // BDT
const FREE_DELIVERY_THRESHOLD = 500; // BDT

export async function submitOrder(input: CheckoutInput): Promise<OrderResult> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Service not configured' };
  }

  // Validate input
  const validation = validateCheckoutInput(input);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Validate and fetch product data with prices
  const productValidation = await validateProducts(input.items);
  if (!productValidation.valid) {
    return { success: false, error: productValidation.error };
  }

  const validatedItems = productValidation.items!;

  // Calculate totals server-side
  const subtotal = validatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // Generate order reference
  const orderReference = generateOrderReference();

  // Use service-role client to bypass RLS for order creation
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      customer_name: input.customer_name.trim(),
      phone: input.phone.trim(),
      district: input.district.trim(),
      upazila: input.upazila.trim(),
      address: input.address.trim(),
      delivery_instructions: input.delivery_instructions?.trim() || null,
      payment_method: input.payment_method,
      subtotal,
      delivery_fee: deliveryFee,
      discount: 0,
      total,
      status: 'pending',
    })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('Order creation error:', orderError);
    return { success: false, error: 'Failed to create order' };
  }

  // Create order items with historical price snapshots
  const orderItems = validatedItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    variant_id: item.variant_id || null,
    product_name: item.product_name,
    product_slug: item.product_slug,
    sku: item.sku,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Order items creation error:', itemsError);
    // Try to clean up the order
    await supabaseAdmin.from('orders').delete().eq('id', order.id);
    return { success: false, error: 'Failed to create order items' };
  }

  return {
    success: true,
    order_id: order.id,
    order_reference: orderReference,
  };
}

function validateCheckoutInput(input: CheckoutInput): { valid: boolean; error?: string } {
  if (!input.customer_name?.trim()) {
    return { valid: false, error: 'Customer name is required' };
  }

  if (!input.phone?.trim()) {
    return { valid: false, error: 'Phone number is required' };
  }

  // Bangladeshi phone number validation
  const phoneRegex = /^(?:\+880|880|0)?1[3-9]\d{8}$/;
  if (!phoneRegex.test(input.phone.replace(/\s+/g, ''))) {
    return { valid: false, error: 'Invalid Bangladeshi phone number' };
  }

  if (!input.district?.trim()) {
    return { valid: false, error: 'District is required' };
  }

  if (!input.upazila?.trim()) {
    return { valid: false, error: 'Upazila/Thana is required' };
  }

  if (!input.address?.trim()) {
    return { valid: false, error: 'Detailed address is required' };
  }

  if (!['cod', 'bkash', 'nagad'].includes(input.payment_method)) {
    return { valid: false, error: 'Invalid payment method' };
  }

  if (!input.items || input.items.length === 0) {
    return { valid: false, error: 'No items in order' };
  }

  // Check for duplicate product_ids
  const productIds = input.items.map(i => i.product_id);
  if (new Set(productIds).size !== productIds.length) {
    return { valid: false, error: 'Duplicate products in order' };
  }

  for (const item of input.items) {
    if (!item.product_id || typeof item.product_id !== 'string') {
      return { valid: false, error: 'Invalid product ID' };
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return { valid: false, error: 'Invalid quantity' };
    }
    if (item.quantity > 99) {
      return { valid: false, error: 'Quantity too high (max 99)' };
    }
  }

  return { valid: true };
}

interface ValidatedItem {
  product_id: string;
  variant_id: string | null;
  product_name: string;
  product_slug: string;
  sku: string;
  price: number;
  quantity: number;
}

async function validateProducts(items: CheckoutItem[]): Promise<{
  valid: boolean;
  items?: ValidatedItem[];
  error?: string;
}> {
  if (!supabaseAdmin) {
    return { valid: false, error: 'Service not configured' };
  }

  const productIds = items.map(i => i.product_id);
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('id, name, slug, price, stock, is_active, sku')
    .in('id', productIds);

  if (error) {
    console.error('Product fetch error:', error);
    return { valid: false, error: 'Failed to validate products' };
  }

  if (!products || products.length !== productIds.length) {
    return { valid: false, error: 'One or more products not found' };
  }

  const productMap = new Map(products.map(p => [p.id, p]));
  const validatedItems: ValidatedItem[] = [];

  for (const item of items) {
    const product = productMap.get(item.product_id);

    if (!product) {
      return { valid: false, error: `Product ${item.product_id} not found` };
    }

    if (!product.is_active) {
      return { valid: false, error: `${product.name} is not available` };
    }

    if (product.stock < item.quantity) {
      return { valid: false, error: `Only ${product.stock} units of ${product.name} available` };
    }

    validatedItems.push({
      product_id: product.id,
      variant_id: item.variant_id || null,
      product_name: product.name,
      product_slug: product.slug,
      sku: product.sku,
      price: product.price,
      quantity: item.quantity,
    });
  }

  return { valid: true, items: validatedItems };
}

function generateOrderReference(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `HFS-${dateStr}-${random}`;
}

export function formatOrderPrice(price: number): string {
  return formatPrice(price);
}