import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { ProjectForm } from '../../components/ProjectForm'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Project | CMS',
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const { id } = await params
  const supabase = await createClient()

  // Fetch project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) {
    notFound()
  }

  // Fetch available media for the selectors
  const { data: mediaList } = await (supabase
    .from('media')
    .select('id, filename, alt_text, status')
    .order('created_at', { ascending: false }) as any)

  return (
    <ProjectForm project={project} mediaList={mediaList || []} />
  )
}
