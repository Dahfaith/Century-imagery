'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateBookingStatus, updateBookingNotes, deleteBooking } from '../actions'
import { Save, Trash2, CheckCircle2 } from 'lucide-react'

export function BookingManager({ booking }: { booking: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(booking.status || 'new')
  const [notes, setNotes] = useState(booking.admin_notes || '')
  
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    setLoadingStatus(true)
    
    const res = await updateBookingStatus(booking.id, newStatus)
    if (res.error) {
      alert(res.error)
      setStatus(booking.status) // revert on error
    }
    
    setLoadingStatus(false)
  }

  const handleSaveNotes = async () => {
    setLoadingNotes(true)
    const res = await updateBookingNotes(booking.id, notes)
    if (res.error) {
      alert(res.error)
    }
    setLoadingNotes(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to permanently delete this booking? This action cannot be undone.')) {
      setIsDeleting(true)
      const res = await deleteBooking(booking.id)
      if (res.error) {
        alert(res.error)
        setIsDeleting(false)
      } else {
        router.push('/admin/bookings')
      }
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Status Controller */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 shadow-xl relative overflow-hidden">
        {loadingStatus && (
          <div className="absolute inset-0 bg-brand-surface-card/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold mb-4 border-b border-brand-border/60 pb-3">Status</h2>
        
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full bg-brand-surface border border-brand-border rounded-lg p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
        >
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <p className="text-xs text-brand-muted mt-3 leading-relaxed">
          Changing status will immediately update the database. Client is not automatically notified.
        </p>
      </div>

      {/* Internal Notes */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 shadow-xl">
        <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold mb-4 border-b border-brand-border/60 pb-3">Internal Notes</h2>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Private production notes, scheduling constraints, budget evaluations..."
          rows={6}
          className="w-full bg-brand-surface border border-brand-border rounded-lg p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors resize-y text-sm mb-4"
        />
        
        <button
          onClick={handleSaveNotes}
          disabled={loadingNotes}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-surface hover:bg-brand-border border border-brand-border text-brand-cream font-medium rounded transition-colors disabled:opacity-50"
        >
          {loadingNotes ? (
            <div className="w-4 h-4 border-2 border-brand-cream border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Notes</span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
        <h2 className="text-sm font-mono uppercase tracking-wider text-red-400 mb-2">Danger Zone</h2>
        <p className="text-xs text-brand-muted mb-4 leading-relaxed">
          Delete this commission brief entirely. This action is irreversible.
        </p>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-medium rounded transition-colors border border-red-500/20 w-full"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Booking</span>
        </button>
      </div>

    </div>
  )
}
