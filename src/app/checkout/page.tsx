'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { formatPrice } from '@/lib/utils';

type CheckoutItem = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image?: string;
};

type CheckoutInput = {
  customer_name: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  delivery_instructions?: string;
  payment_method: 'cod' | 'bkash' | 'nagad';
  items: CheckoutItem[];
};

function loadCartFromStorage(): CheckoutItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const savedCart = localStorage.getItem('hfs_cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch {
    // Ignore localStorage errors
  }
  return [];
}

export default function Checkout() {
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutInput>({
    customer_name: '',
    phone: '',
    district: '',
    upazila: '',
    address: '',
    delivery_instructions: '',
    payment_method: 'cod',
    items: loadCartFromStorage(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.customer_name.trim()) {
      setError('Full name is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.district.trim()) {
      setError('District is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.upazila.trim()) {
      setError('Upazila/Thana is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.address.trim()) {
      setError('Detailed address is required');
      setIsSubmitting(false);
      return;
    }
    if (formData.items.length === 0) {
      setError('Your cart is empty');
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate idempotency key for this submission
      const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Order submission failed');
        setIsSubmitting(false);
        return;
      }

      // Clear cart on successful order
      localStorage.removeItem('hfs_cart');

      // Redirect to confirmation page
      router.push(`/order-confirmation?ref=${data.order_reference}`);
      router.refresh();
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const subtotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-heading text-primary mb-4">Review Your Order</h2>
          <p className="text-lg text-muted-foreground">
            Please confirm your details and payment method before submitting your order.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-xl font-heading">Shipping Information</h3>
            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">Phone Number</label>
              <input
                type="tel"
                required
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">District</label>
              <select
                required
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={formData.district}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                disabled={isSubmitting}
              >
                <option value="">Select District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Pabna">Pabna</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Barguna">Barguna</option>
                <option value="Bhola">Bhola</option>
                <option value="Chirangani">Chirangani</option>
                <option value="Joypurhat">Joypurhat</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Natore">Natore</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Sunamganj">Sunamganj</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">Upazila / Thana</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={formData.upazila}
                onChange={(e) => setFormData(prev => ({ ...prev, upazila: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">Detailed Address</label>
              <textarea
                rows={3}
                required
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">Delivery Instructions</label>
              <textarea
                rows={2}
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={formData.delivery_instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, delivery_instructions: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary">Payment Method</label>
              <div className="flex flex-col space-y-2">
                {(['cod', 'bkash', 'nagad'] as const).map(method => (
                  <label key={method} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="payment_method"
                      value={method}
                      checked={formData.payment_method === method}
                      onChange={(e) => setFormData(prev => ({ ...prev, payment_method: e.target.value as 'cod' | 'bkash' | 'nagad' }))}
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-primary">{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading">Order Summary</h3>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Items in your cart:</p>
              <ul className="mt-2 space-y-2">
                {formData.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.quantity} × {item.unit}</p>
                    </div>
                    <span className="text-sm text-primary">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-primary">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="text-primary">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Place Order'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}