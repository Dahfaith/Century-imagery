import { requireAuth } from '@/lib/supabase/auth'
import { DashboardShell } from './components/DashboardShell'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Century Imagery',
  robots: 'noindex, nofollow',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, role, profile } = await requireAuth(['super_admin', 'admin', 'editor'])

  return (
    <DashboardShell 
      userEmail={user.email || ''} 
      userName={profile?.full_name} 
      role={role}
    >
      {children}
    </DashboardShell>
  )
}
