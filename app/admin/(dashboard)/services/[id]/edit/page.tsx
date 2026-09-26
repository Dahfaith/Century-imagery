import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { ServiceForm } from '../../components/ServiceForm'
import { notFound } from 'next/navigation'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { id } = await params

  const { data: service, error: serviceError } = await (supabase.from('services') as any)
    .select('*')
    .eq('id', id)
    .single()

  if (serviceError || !service) {
    notFound()
  }

  const { data: items, error: itemsError } = await (supabase.from('service_items') as any)
    .select('*')
    .eq('service_id', id)
    .order('sort_order', { ascending: true })

  // Fetch available ready media for the cover media picker
  const { data: mediaOptions, error: mediaError } = await (supabase.from('media') as any)
    .select('id, filename, status')
    .order('created_at', { ascending: false })

  if (mediaError) {
    return <div className="p-8 text-red-500">Error loading media options: {mediaError.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-medium text-brand-cream">Edit Division</h1>
        <p className="text-brand-muted mt-2">Updating: <span className="text-brand-gold">{service.title}</span></p>
      </div>

      <ServiceForm 
        initialData={service} 
        initialItems={items || []} 
        mediaOptions={mediaOptions || []} 
      />
    </div>
  )
}
