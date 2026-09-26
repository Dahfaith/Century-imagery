'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'

export async function saveService(id: string | null, data: any, items: any[]) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    let serviceId = id

    if (id) {
      const { error } = await (supabase.from('services') as any).update({
        slug: data.slug,
        title: data.title,
        short_description: data.short_description,
        description: data.description,
        icon: data.icon,
        cover_media_id: data.cover_media_id || null,
        featured: data.featured,
        sort_order: data.sort_order,
        status: data.status,
        updated_at: new Date().toISOString()
      }).eq('id', id)
      if (error) throw error
    } else {
      const { data: newService, error } = await (supabase.from('services') as any).insert({
        slug: data.slug,
        title: data.title,
        short_description: data.short_description,
        description: data.description,
        icon: data.icon,
        cover_media_id: data.cover_media_id || null,
        featured: data.featured,
        sort_order: data.sort_order,
        status: data.status
      }).select().single()
      if (error) throw error
      serviceId = newService.id
    }

    // Handle service items
    // First, delete all existing items for this service
    if (id) {
      await (supabase.from('service_items') as any).delete().eq('service_id', id)
    }

    // Insert new items
    if (items && items.length > 0) {
      const itemsToInsert = items.map((item, index) => ({
        service_id: serviceId,
        title: item.title,
        description: item.description,
        sort_order: index
      }))
      const { error: itemsError } = await (supabase.from('service_items') as any).insert(itemsToInsert)
      if (itemsError) throw itemsError
    }

    revalidatePath('/', 'layout')
  revalidatePath('/admin/services')
    revalidatePath('/', 'layout')
  revalidatePath('/services')
    return { success: true, id: serviceId }
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      return { error: 'A service with this slug already exists.' }
    }
    return { error: error.message }
  }
}

export async function deleteService(id: string) {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  try {
    const { error } = await (supabase.from('services') as any).delete().eq('id', id)
    if (error) throw error

    revalidatePath('/', 'layout')
  revalidatePath('/admin/services')
    revalidatePath('/', 'layout')
  revalidatePath('/services')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function checkSeedServices() {
    await requireAuth(['super_admin', 'admin'])
    const supabase = await createClient()
    
    // Check if services are empty
    const { count } = await (supabase.from('services') as any).select('*', { count: 'exact', head: true })
    
    if (count === 0) {
        // Seed
        const seedData = [
            { slug: 'film-cinema-production', title: 'Film & Cinema Production', status: 'published', sort_order: 1 },
            { slug: 'commercial-brand-production', title: 'Commercial & Brand Production', status: 'published', sort_order: 2 },
            { slug: 'luxury-event-cinema', title: 'Luxury Event Cinema', status: 'published', sort_order: 3 },
            { slug: 'photography-division', title: 'Photography Division', status: 'published', sort_order: 4 },
            { slug: 'aerial-specialized', title: 'Aerial & Specialized', status: 'published', sort_order: 5 },
            { slug: 'the-century-post-lab', title: 'The Century Post Lab', status: 'published', sort_order: 6 },
            { slug: 'production-support', title: 'Production Support', status: 'published', sort_order: 7 }
        ]
        await (supabase.from('services') as any).insert(seedData)
        revalidatePath('/', 'layout')
  revalidatePath('/admin/services')
    }
}

