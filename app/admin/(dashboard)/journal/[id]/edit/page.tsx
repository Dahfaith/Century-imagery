import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { JournalForm } from '../../components/JournalForm'
import { notFound } from 'next/navigation'

export default async function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { id } = await params

  const { data: post, error: postError } = await (supabase.from('journal_posts') as any)
    .select('*')
    .eq('id', id)
    .single()

  if (postError || !post) {
    notFound()
  }

  // Fetch available ready media
  const { data: mediaOptions, error: mediaError } = await (supabase.from('media') as any)
    .select('id, filename, status')
    .order('created_at', { ascending: false })

  if (mediaError) {
    return <div className="p-8 text-red-500">Error loading media options: {mediaError.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-medium text-brand-cream">Edit Article</h1>
        <p className="text-brand-muted mt-2">Updating: <span className="text-brand-gold">{post.title}</span></p>
      </div>

      <JournalForm 
        initialData={post} 
        mediaOptions={mediaOptions || []} 
      />
    </div>
  )
}
