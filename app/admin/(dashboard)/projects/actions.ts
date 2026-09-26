'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  let slug = formData.get('slug') as string
  if (!slug) {
    const title = formData.get('title') as string
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const status = formData.get('status') as string || 'draft'
  const publishedAt = status === 'published' ? new Date().toISOString() : null

  const projectData = {
    title: formData.get('title') as string,
    slug: slug,
    client_name: formData.get('client_name') as string || null,
    category: formData.get('category') as string || null,
    year: formData.get('year') ? parseInt(formData.get('year') as string) : null,
    location: formData.get('location') as string || null,
    short_description: formData.get('short_description') as string || null,
    description: formData.get('description') as string || null,
    featured: formData.get('featured') === 'on',
    status: status,
    cover_media_id: formData.get('cover_media_id') as string || null,
    hero_media_id: formData.get('hero_media_id') as string || null,
    seo_title: formData.get('seo_title') as string || null,
    seo_description: formData.get('seo_description') as string || null,
    sort_order: formData.get('sort_order') ? parseInt(formData.get('sort_order') as string) : 0,
    published_at: publishedAt,
  }

  // Check slug uniqueness
  const { data: existing } = await supabase.from('projects').select('id').eq('slug', slug).single() as any
  if (existing) {
    return { error: 'A project with this slug already exists. Please choose a unique slug.' }
  }

  const { error } = await (supabase.from('projects') as any).insert(projectData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
  revalidatePath('/work')
  return { success: true }
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  let slug = formData.get('slug') as string
  
  // Check slug uniqueness excluding current project
  const { data: existing } = await supabase.from('projects').select('id').eq('slug', slug).neq('id', id).single() as any
  if (existing) {
    return { error: 'A project with this slug already exists. Please choose a unique slug.' }
  }

  const status = formData.get('status') as string || 'draft'

  // Fetch existing project to determine if we need to update published_at
  const { data: currentProject } = await supabase.from('projects').select('status, published_at').eq('id', id).single() as any
  
  let publishedAt = currentProject?.published_at
  if (status === 'published' && currentProject?.status !== 'published') {
    publishedAt = new Date().toISOString()
  } else if (status === 'draft') {
    publishedAt = null
  }

  const projectData = {
    title: formData.get('title') as string,
    slug: slug,
    client_name: formData.get('client_name') as string || null,
    category: formData.get('category') as string || null,
    year: formData.get('year') ? parseInt(formData.get('year') as string) : null,
    location: formData.get('location') as string || null,
    short_description: formData.get('short_description') as string || null,
    description: formData.get('description') as string || null,
    featured: formData.get('featured') === 'on',
    status: status,
    cover_media_id: formData.get('cover_media_id') as string || null,
    hero_media_id: formData.get('hero_media_id') as string || null,
    seo_title: formData.get('seo_title') as string || null,
    seo_description: formData.get('seo_description') as string || null,
    sort_order: formData.get('sort_order') ? parseInt(formData.get('sort_order') as string) : 0,
    published_at: publishedAt,
    updated_at: new Date().toISOString(),
  }

  const { error } = await (supabase.from('projects') as any).update(projectData).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
  revalidatePath('/work')
  return { success: true }
}

export async function deleteProject(id: string) {
  await requireAuth(['super_admin', 'admin']) // Maybe restrict deletion to higher roles
  const supabase = await createClient()

  const { error } = await (supabase.from('projects') as any).delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
  revalidatePath('/work')
}

export async function toggleProjectStatus(id: string, newStatus: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  let publishedAt = null
  if (newStatus === 'published') {
    publishedAt = new Date().toISOString()
  }

  const { error } = await (supabase.from('projects') as any)
    .update({ 
      status: newStatus,
      published_at: publishedAt,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/projects')
  revalidatePath('/', 'layout')
  revalidatePath('/work')
}


