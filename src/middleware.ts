import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function middleware(request: NextRequest) {
  // Only protect /admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.pathname.startsWith('/admin/login')) {

    // Create a server-side Supabase client with the request cookies
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
      global: {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Not authenticated - redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role using app_metadata (trusted, server-controlled)
    const isAdmin = user.app_metadata?.role === 'admin';

    if (!isAdmin) {
      // Authenticated but not admin - redirect to home or show 403
      return NextResponse.redirect(new URL('/', request.url));
    }

    // User is admin - allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};