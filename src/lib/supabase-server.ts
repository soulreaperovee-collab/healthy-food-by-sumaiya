import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Service-role client — bypasses RLS. Never import this into client code.
export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

// Anon-key client bound to request cookies — respects RLS.
export async function getServerSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase configuration missing');
  }
  const cookieStore = await cookies();
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  });
}

export async function getServerSupabaseWithAuth() {
  const client = await getServerSupabase();
  const {
    data: { user },
  } = await client.auth.getUser();
  return { client, user };
}

// Check if current user is admin
// Uses app_metadata which is server-controlled (cannot be modified by users)
export async function isAdmin(): Promise<boolean> {
  const { user } = await getServerSupabaseWithAuth();
  return user?.app_metadata?.role === 'admin';
}

// Require admin access - throws if not admin
export async function requireAdmin() {
  const { user } = await getServerSupabaseWithAuth();
  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}