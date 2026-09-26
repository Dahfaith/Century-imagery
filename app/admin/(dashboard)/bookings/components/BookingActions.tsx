'use client'

import { deleteBooking } from '../actions'
import { Trash2 } from 'lucide-react'

export function DeleteBookingButton({ id, name }: { id: string, name: string }) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete the booking for "${name}"? This cannot be undone.`)) {
      const res = await deleteBooking(id)
      if (res?.error) {
        alert(res.error)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex p-2 text-brand-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
      title="Delete Booking"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
