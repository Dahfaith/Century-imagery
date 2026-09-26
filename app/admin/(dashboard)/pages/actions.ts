'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'

export async function savePage(slug: string, data: any) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    const updateData = {
      title: data.title,
      status: data.status,
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      seo_image_url: data.seo_image_url,
      content: data.content,
      updated_at: new Date().toISOString(),
      ...(data.status === 'published' ? { published_at: new Date().toISOString() } : {})
    }

    const { error } = await (supabase.from('pages') as any)
      .update(updateData)
      .eq('slug', slug)

    if (error) throw error

    revalidatePath('/', 'layout')
  revalidatePath('/admin/pages')
    revalidatePath(`/${slug === 'home' ? '' : slug}`)
    
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function checkSeedPages() {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()
  
  const { count } = await (supabase.from('pages') as any).select('*', { count: 'exact', head: true })
  
  if (count === 0) {
    const seedData = [
      { slug: 'home', title: 'Homepage', status: 'published', content: {hero: {eyebrow: "VISUAL STORYTELLING", heading: "CENTURY IMAGERY", description: "Crafting cinematic experiences that transcend the ordinary.", cta_text: "View Our Work", cta_link: "/work"}} },
      { slug: 'about', title: 'About Us', status: 'published', content: {hero: {heading: "ABOUT CENTURY", description: "A legacy of visual excellence."}} },
      { slug: 'services', title: 'Services Overview', status: 'published', content: {hero: {heading: "OUR SERVICES", description: "Comprehensive visual production services from concept to post-production."}} },
      { slug: 'booking', title: 'Booking Information', status: 'published', content: {hero: {heading: "BOOKING", description: "Start your journey with Century Imagery."}} }
    ]
    await (supabase.from('pages') as any).insert(seedData)
    revalidatePath('/', 'layout')
  revalidatePath('/admin/pages')
  }
}

