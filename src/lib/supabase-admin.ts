import { supabaseAdmin } from './supabase-server';

export function getAdminClient() {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not configured');
  }
  return supabaseAdmin;
}