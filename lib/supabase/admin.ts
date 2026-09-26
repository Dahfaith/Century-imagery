import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

/**
 * Supabase Admin Client
 * 
 * IMPORTANT: This client uses the service role key and bypasses Row Level Security (RLS).
 * It must NEVER be used in Client Components or exposed to the browser.
 * Only use this in secure server-side contexts where admin privileges are required.
 */
export function createAdminClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables for admin client')
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
