'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'

export async function saveSiteSettings(data: any) {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  try {
    // Check if settings row exists
    const { data: existing } = await (supabase.from('site_settings') as any).select('id').single()

    if (existing?.id) {
      const { error } = await (supabase.from('site_settings') as any)
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (error) throw error
    } else {
      const { error } = await (supabase.from('site_settings') as any).insert(data)
      if (error) throw error
    }

    revalidatePath('/', 'layout')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to save settings.' }
  }
}
