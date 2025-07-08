import { createClient as _createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2';

export function createAdminClient(): SupabaseClient {
  const url            = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return _createClient(url, serviceRoleKey);
}
