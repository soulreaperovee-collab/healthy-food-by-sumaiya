import { NextResponse } from 'next/server';
import { getVapidPublicKey } from '@/lib/webpush';

export async function GET() {
  try {
    const publicKey = getVapidPublicKey();
    return NextResponse.json({ publicKey });
  } catch (error) {
    console.error('VAPID key error:', error);
    return NextResponse.json(
      { error: 'VAPID keys not configured' },
      { status: 500 }
    );
  }
}