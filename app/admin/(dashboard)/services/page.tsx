import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { ServiceListActions, DeleteServiceButton } from './components/ServiceActions'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { data: services, error } = await (supabase.from('services') as any)
    .select(`
      id, title, slug, status, featured, sort_order,
      service_items (count)
    `)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error loading services: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-medium text-brand-cream">Service Divisions</h1>
          <p className="text-brand-muted mt-2">Manage the official Century Imagery service offerings.</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="flex items-center space-x-2 px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Division</span>
        </Link>
      </div>

      <ServiceListActions servicesCount={services?.length || 0} />

      {services && services.length > 0 && (
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden shadow-2xl mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface-card border-b border-brand-border">
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Division Title</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Slug</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Items</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {services.map((service: any) => (
                <tr key={service.id} className="hover:bg-brand-surface-card/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-brand-cream flex items-center space-x-2">
                      <span>{service.title}</span>
                      {service.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-gold">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-brand-muted font-mono text-sm">{service.slug}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-brand-border text-brand-muted'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="p-4 text-brand-muted">
                    {service.service_items[0]?.count || 0}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/services/${service.id}/edit`}
                        className="p-2 text-brand-muted hover:text-brand-gold hover:bg-brand-gold/10 rounded transition-colors"
                        title="Edit Division"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteServiceButton id={service.id} title={service.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
