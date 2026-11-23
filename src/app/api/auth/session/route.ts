import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const isAdmin = user.user_metadata?.role === 'admin';

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: isAdmin ? 'admin' : 'customer',
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}