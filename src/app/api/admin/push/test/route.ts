import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { user } = await (await import('@/lib/supabase-server')).getServerSupabaseWithAuth();
    const adminUserId = user!.id;

    // Send test notification to this admin's devices
    const { sendNotificationToAllAdmins } = await import('@/lib/webpush');

    const result = await sendNotificationToAllAdmins({
      title: 'Test Notification',
      body: 'Web Push is working correctly!',
      url: '/admin',
      orderRef: 'TEST-' + Date.now(),
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    console.error('Push test error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}