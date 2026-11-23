'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function getOrderReferenceFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

export default function OrderConfirmation() {
  const initialRef = getOrderReferenceFromUrl();
  const hasOrderRef = initialRef !== null;

  // Initialize loading state based on whether we have the ref
  // If we have the ref, we don't need loading; if not, we show error immediately
  const [loading, setLoading] = useState(false);
  const [orderReference] = useState<string>(initialRef || '');
  const [hasRef] = useState<boolean>(hasOrderRef);

  if (!hasRef) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-red-600">Error</h1>
          <p className="mt-2 text-muted-foreground">No order reference provided</p>
          <Link href="/" className="mt-4 text-primary hover:underline inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-heading text-primary">Order Confirmed!</h1>
          <p className="mt-2 text-lg text-muted-foreground">Thank you for your order</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Order Reference</span>
            <span className="font-mono text-lg font-bold text-primary">{orderReference}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Save this reference for tracking and support inquiries.
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <h2 className="text-lg font-heading text-primary mb-4">What happens next?</h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Our team will review your order and confirm via phone within 24 hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Delivery will be scheduled based on your location.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Pay via Cash on Delivery, bKash, or Nagad as selected.</span>
            </li>
          </ol>
        </div>

        <div className="flex gap-4">
          <Link href="/products" className="flex-1 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-center transition-colors">
            Continue Shopping
          </Link>
          <Link href="/" className="flex-1 py-3 rounded-md border border-border text-primary hover:bg-muted text-center transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}