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
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-medium text-brand-cream">New Journal Article</h1>
        <p className="text-xs sm:text-sm text-brand-muted mt-1">Create a new editorial piece or studio update.</p>
      </div>

      <JournalForm mediaOptions={mediaOptions || []} />
    </div>
  )
}
