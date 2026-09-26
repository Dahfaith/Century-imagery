import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { PageEditor } from '../../components/PageEditor'
import { notFound } from 'next/navigation'

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { slug } = await params

  const { data: page, error } = await (supabase.from('pages') as any)
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !page) {
    notFound()
  }

  // Fetch available ready media for optional media pickers in page sections
  const { data: mediaOptions } = await (supabase.from('media') as any)
    .select('id, filename, status')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-medium text-brand-cream">Edit Page: <span className="text-brand-gold">{page.title}</span></h1>
        <p className="text-brand-muted mt-2">Manage structured content blocks for this specific page.</p>
      </div>

      <PageEditor initialData={page} mediaOptions={mediaOptions || []} />
    </div>
  )
}
