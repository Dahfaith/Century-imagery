import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import Link from 'next/link'
import { Eye, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { DeleteBookingButton } from './components/BookingActions'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  const { data: bookings, error } = await (supabase.from('bookings') as any)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error loading bookings: {error.message}</div>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">New</span>
      case 'reviewing': return <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Reviewing</span>
      case 'contacted': return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Contacted</span>
      case 'confirmed': return <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Confirmed</span>
      case 'completed': return <span className="px-2 py-1 text-xs rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">Completed</span>
      case 'cancelled': return <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Cancelled</span>
      default: return <span className="px-2 py-1 text-xs rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-brand-cream capitalize">Bookings Management</h1>
          <p className="text-brand-muted mt-1 text-sm">Review and manage client production requests.</p>
        </div>
      </div>

      <div className="bg-brand-surface-card border border-brand-border rounded-xl overflow-hidden shadow-xl">
        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-surface border-b border-brand-border text-brand-muted font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Date / Timeline</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/50 text-brand-cream">
                {bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-brand-surface/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-brand-gold">{booking.reference_code}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-brand-cream">{booking.name}</div>
                      <div className="text-xs text-brand-muted">{booking.company || booking.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="truncate max-w-[200px]">{booking.service}</div>
                    </td>
                    <td className="px-6 py-4 text-brand-muted">{booking.preferred_date}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/bookings/${booking.reference_code}`}
                        className="inline-flex p-2 text-brand-muted hover:text-brand-gold hover:bg-brand-gold/10 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <DeleteBookingButton id={booking.id} name={booking.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-brand-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-brand-cream mb-2">No Bookings Found</h3>
            <p className="text-brand-muted">When clients submit the public booking form, requests will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
