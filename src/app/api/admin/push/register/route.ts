import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { user } = await (await import('@/lib/supabase-server')).getServerSupabaseWithAuth();
    const adminUserId = user!.id;

    const { endpoint, keys, userAgent } = await request.json();

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json(
        { error: 'Invalid subscription data' },
        { status: 400 }
      );
    }

    // Store subscription
    const { error } = await (await import('@/lib/supabase-server')).supabaseAdmin!
      .from('admin_push_subscriptions')
      .upsert(
        {
          admin_user_id: (await (await import('@/lib/supabase-server')).getServerSupabaseWithAuth()).user!.id,
          endpoint,
          p256dh: keys.p256dh,
          auth: keys.auth,
          user_agent: userAgent || null,
          last_used_at: new Date().toISOString(),
        },
        {
          onConflict: 'admin_user_id,endpoint',
        }
      );

    if (error) {
      console.error('Subscription upsert error:', error);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    console.error('Push register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}