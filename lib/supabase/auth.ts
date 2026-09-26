import { createClient } from './server'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export type AdminRole = 'super_admin' | 'admin' | 'editor'

export interface AuthorizedSession {
  user: User
  role: AdminRole
  profile: any
}

/**
 * Validates the current user session and checks their role against allowed roles.
 * Must be used in Server Components, Server Actions, or Route Handlers.
 * If unauthorized, it redirects to the login page (or optionally throws if used in an API).
 */
export async function requireAuth(allowedRoles: AdminRole[] = ['super_admin', 'admin', 'editor']): Promise<AuthorizedSession> {
  const supabase = await createClient()

  // 1. Verify Authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/admin/login')
  }

  // 2. Verify Authorization (Role Check)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single() as { data: { role: string } | null, error: any }

  if (profileError || !profile) {
    // Authenticated but no profile means they are not an admin
    redirect('/admin/login?error=unauthorized')
  }

  if (!allowedRoles.includes(profile.role as AdminRole)) {
    redirect('/admin/login?error=unauthorized')
  }

  return {
    user,
    role: profile.role as AdminRole,
    profile,
  }
}
