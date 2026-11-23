import { NextRequest, NextResponse } from 'next/server';
import { submitOrder } from '@/lib/orders';

// Simple in-memory idempotency store (use Redis in production)
interface IdempotencyEntry {
  timestamp: number;
  result: { order_id: string; order_reference: string } | number;
}

const idempotencyStore = new Map<string, IdempotencyEntry>();
const IDEMPOTENCY_TTL = 5 * 60 * 1000; // 5 minutes

export async function POST(request: NextRequest) {
  try {
    // Get idempotency key from header
    const idempotencyKey = request.headers.get('idempotency-key');

    // Check for duplicate submission
    if (idempotencyKey) {
      const cached = idempotencyStore.get(idempotencyKey);
      if (cached && Date.now() - cached.timestamp < IDEMPOTENCY_TTL) {
        const result = cached.result as { order_id: string; order_reference: string };
        return NextResponse.json(
          { success: true, order_id: result.order_id, order_reference: result.order_reference, duplicate: true },
          { status: 200 }
        );
      }
    }

    // Parse and validate body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Basic rate limiting by IP (simple implementation)
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `rate-${clientIp}`;
    const rateLimit = idempotencyStore.get(rateLimitKey);
    if (rateLimit && rateLimit.timestamp > Date.now() - 60000) { // 1 minute window
      const count = rateLimit.result as number;
      if (count >= 10) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
      rateLimit.result = count + 1;
    } else {
      idempotencyStore.set(rateLimitKey, { timestamp: Date.now(), result: 1 });
    }

    const result = await submitOrder(body);

    // Store idempotency result
    if (idempotencyKey && result.success && result.order_id && result.order_reference) {
      idempotencyStore.set(idempotencyKey, { timestamp: Date.now(), result: { order_id: result.order_id, order_reference: result.order_reference } });
    }

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}