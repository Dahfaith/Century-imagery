'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'

export async function updateBookingStatus(id: string, status: string) {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  try {
    const { error } = await (supabase.from('bookings') as any)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      
    if (error) throw error

    revalidatePath('/', 'layout')
  revalidatePath('/admin/bookings')
    revalidatePath(`/admin/bookings/${id}`)
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateBookingNotes(id: string, admin_notes: string) {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  try {
    const { error } = await (supabase.from('bookings') as any)
      .update({ admin_notes, updated_at: new Date().toISOString() })
      .eq('id', id)
      
    if (error) throw error

    revalidatePath('/', 'layout')
  revalidatePath('/admin/bookings')
    revalidatePath(`/admin/bookings/${id}`)
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteBooking(id: string) {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  try {
    const { error } = await (supabase.from('bookings') as any)
      .delete()
      .eq('id', id)
      
    if (error) throw error

    revalidatePath('/', 'layout')
  revalidatePath('/admin/bookings')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

