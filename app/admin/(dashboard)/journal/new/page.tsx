import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { JournalForm } from '../components/JournalForm'

export default async function NewJournalPage() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  // Fetch available ready media for the cover media & content picker
  const { data: mediaOptions, error } = await (supabase.from('media') as any)
    .select('id, filename, status')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error loading media options: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-medium text-brand-cream">New Journal Article</h1>
        <p className="text-brand-muted mt-2">Create a new editorial piece or studio update.</p>
      </div>

      <JournalForm mediaOptions={mediaOptions || []} />
    </div>
  )
}
