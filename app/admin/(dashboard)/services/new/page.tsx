import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { ServiceForm } from '../components/ServiceForm'

export default async function NewServicePage() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  // Fetch available ready media for the cover media picker
  const { data: mediaOptions, error } = await (supabase.from('media') as any)
    .select('id, filename, status')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error loading media options: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-medium text-brand-cream">New Service Division</h1>
        <p className="text-brand-muted mt-2">Create a new official service offering for Century Imagery.</p>
      </div>

      <ServiceForm mediaOptions={mediaOptions || []} />
    </div>
  )
}
