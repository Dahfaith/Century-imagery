'use server'

import { createClient } from '@/lib/supabase/server'

interface BookingData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  project_name?: string;
  preferred_date: string;
  location: string;
  budget?: string;
  message: string;
}

export async function submitBooking(formData: BookingData) {
  // Validate input
  if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.preferred_date || !formData.location || !formData.message) {
    return { error: 'Validation failed: Missing required fields.' }
  }
  
  if (formData.message.length < 25) {
    return { error: 'Validation failed: Please provide more details regarding your project.' }
  }

  // Generate Reference Code (e.g. CI-2026-84732)
  const refCode = `CI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

  // Use the server client (which uses anon key, but we validate fields here)
  const supabase = await createClient()

  const { data, error } = await (supabase.from('bookings') as any)
    .insert({
      reference_code: refCode,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || null,
      service: formData.service,
      project_name: formData.project_name || null,
      preferred_date: formData.preferred_date, // stored as string for timeline compatibility
      location: formData.location,
      budget: formData.budget || null,
      message: formData.message,
      status: 'new'
      // admin_notes is explicitly omitted
    })
    .select('reference_code')
    .single()

  if (error) {
    console.error('Booking Insert Error:', error)
    return { error: 'Failed to submit booking. Please try again later.' }
  }

  return { success: true, referenceCode: refCode }
}
