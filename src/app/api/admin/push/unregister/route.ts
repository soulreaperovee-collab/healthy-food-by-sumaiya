import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';

export async function DELETE(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { user } = await (await import('@/lib/supabase-server')).getServerSupabaseWithAuth();
    const adminUserId = user!.id;

    const { endpoint } = await request.json();

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint required' },
        { status: 400 }
      );
    }

    // Remove subscription
    const { error } = await (await import('@/lib/supabase-server')).supabaseAdmin!
      .from('admin_push_subscriptions')
      .delete()
      .eq('admin_user_id', adminUserId)
      .eq('endpoint', endpoint);

    if (error) {
      console.error('Subscription delete error:', error);
      return NextResponse.json(
        { error: 'Failed to remove subscription' },
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
    console.error('Push unregister error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}