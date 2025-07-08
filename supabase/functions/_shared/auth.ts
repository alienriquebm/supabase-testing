
import type { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import { createClient }      from '@shared/supabaseClient.ts';
import { createAdminClient } from '@shared/supabaseAdmin.ts';

export interface AuthResult {
  data: any;
  error: any;
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase: SupabaseClient = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signUp(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabaseAdmin: SupabaseClient = createAdminClient();
  const { data, error } = await supabaseAdmin.auth.admin.createUser({ email, password });
  return { data, error };
}
