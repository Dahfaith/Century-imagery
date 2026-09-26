import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { SiteSettingsForm } from './SiteSettingsForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  const { data: settings } = await (supabase.from('site_settings') as any).select('*').single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium text-brand-cream">Site Settings</h1>
        <p className="text-brand-muted mt-1 text-sm">Manage global site identity, SEO defaults, and contact details.</p>
      </div>
      <SiteSettingsForm initialData={settings || {}} />
    </div>
  )
}
