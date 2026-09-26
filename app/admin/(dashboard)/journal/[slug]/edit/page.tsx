import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { JournalForm } from '../../components/JournalForm'
import { notFound } from 'next/navigation'

export default async function EditJournalPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { slug } = await params

  const { data: post, error: postError } = await (supabase.from('journal_posts') as any)
    .select('*')
    .eq('slug', slug)
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
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-medium text-brand-cream">Edit Article</h1>
        <p className="text-xs sm:text-sm text-brand-muted mt-1">Updating: <span className="text-brand-gold">{post.title}</span></p>
      </div>

      <JournalForm 
        initialData={post} 
        mediaOptions={mediaOptions || []} 
      />
    </div>
  )
}
