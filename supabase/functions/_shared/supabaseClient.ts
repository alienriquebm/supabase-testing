import { createClient as _createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2';

export function createClient(): SupabaseClient {
  const url     = Deno.env.get('SUPABASE_URL')!;
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  return _createClient(url, anonKey);
}
