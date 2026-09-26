import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { ProjectForm } from '../components/ProjectForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Project | CMS',
}

export default async function NewProjectPage() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  // Fetch available media for the selectors
  const { data: mediaList } = await (supabase
    .from('media')
    .select('id, filename, alt_text, status, media_type, thumbnail_url, provider_url, playback_url, file_size')
    .order('created_at', { ascending: false }) as any)

  return (
    <ProjectForm mediaList={mediaList || []} />
  )
}
