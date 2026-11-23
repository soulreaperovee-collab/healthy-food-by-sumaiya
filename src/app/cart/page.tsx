'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { formatPrice } from '@/lib/utils';

type CartItem = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image?: string;
};

// Helper to load cart from localStorage
function loadCartFromStorage(): CartItem[] {
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

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('hfs_cart', JSON.stringify(cart));
    } catch {
      // Ignore localStorage errors
    }
  }, [cart]);

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product_id !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product_id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return prev;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product_id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev;
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading">Shopping Cart</h1>
            <span className="text-sm text-muted-foreground">{cart.length} items</span>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <p className="mt-4 text-sm text-primary">
              Browse products and add them to your cart
            </p>
            <Link href="/products" className="mt-4 text-primary hover:underline inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-heading mb-3">Your Cart</h2>
            </div>

            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-border mb-4">
                  <div className="flex items-start gap-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-md mb-2"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.price)} • {item.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.product_id)}
                          className="px-2 py-1 text-xs text-primary-foreground border border-primary rounded"
                        >
                          -
                        </button>
                        <span className="ml-1 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.product_id)}
                          className="px-2 py-1 text-xs text-primary-foreground border border-primary rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="mt-1 text-sm text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-primary text-primary">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="/checkout"
                  className="flex-1 py-3 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors text-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}