import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, MapPin, Calendar, CreditCard, FileText } from 'lucide-react'
import { BookingManager } from '../components/BookingManager'

export const dynamic = 'force-dynamic'

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth(['super_admin', 'admin'])
  const { id } = await params
  const supabase = await createClient()

  const { data: booking, error } = await (supabase.from('bookings') as any)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !booking) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <Link 
          href="/admin/bookings" 
          className="p-2 bg-brand-surface border border-brand-border rounded-full text-brand-muted hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-medium text-brand-cream">
            Booking Request <span className="text-brand-gold font-mono">{booking.reference_code}</span>
          </h1>
          <p className="text-brand-muted mt-1 text-sm">
            Submitted on {new Date(booking.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Client & Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 shadow-xl">
            <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold mb-6 border-b border-brand-border/60 pb-3">Client Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-brand-muted mt-0.5" />
                <div>
                  <div className="text-xs text-brand-muted font-mono uppercase mb-1">Name</div>
                  <div className="text-brand-cream font-medium">{booking.name}</div>
                  {booking.company && <div className="text-sm text-brand-muted mt-0.5">{booking.company}</div>}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-brand-muted mt-0.5">@</div>
                <div>
                  <div className="text-xs text-brand-muted font-mono uppercase mb-1">Contact</div>
                  <div className="text-brand-cream font-medium">
                    <a href={`mailto:${booking.email}`} className="hover:text-brand-gold underline decoration-brand-border underline-offset-4">{booking.email}</a>
                  </div>
                  <div className="text-sm text-brand-cream mt-1">
                    <a href={`tel:${booking.phone}`} className="hover:text-brand-gold">{booking.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 shadow-xl">
            <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold mb-6 border-b border-brand-border/60 pb-3">Project Scope</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-xs text-brand-muted font-mono uppercase mb-1 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> Service Division
                </div>
                <div className="text-brand-cream font-medium">{booking.service}</div>
              </div>
              
              <div>
                <div className="text-xs text-brand-muted font-mono uppercase mb-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Location
                </div>
                <div className="text-brand-cream font-medium">{booking.location}</div>
              </div>

              <div>
                <div className="text-xs text-brand-muted font-mono uppercase mb-1 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Preferred Timeline
                </div>
                <div className="text-brand-cream font-medium">{booking.preferred_date}</div>
              </div>

              <div>
                <div className="text-xs text-brand-muted font-mono uppercase mb-1 flex items-center gap-2">
                  <CreditCard className="w-3 h-3" /> Budget Range
                </div>
                <div className="text-brand-cream font-medium">{booking.budget || 'Not specified'}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-brand-muted font-mono uppercase mb-2">Project Brief / Narrative</div>
              <div className="p-4 bg-brand-surface border border-brand-border rounded-lg text-brand-cream text-sm leading-relaxed whitespace-pre-wrap">
                {booking.message}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Admin Management */}
        <div className="lg:col-span-1">
          <BookingManager booking={booking} />
        </div>

      </div>
    </div>
  )
}
