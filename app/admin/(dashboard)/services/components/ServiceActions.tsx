'use client'

import { useState } from 'react'
import { checkSeedServices, deleteService } from '../actions'
import { Trash2, Edit, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export function ServiceListActions({ servicesCount }: { servicesCount: number }) {
  const [loading, setLoading] = useState(false)

  if (servicesCount > 0) return null

  return (
    <div className="p-6 bg-brand-surface-card border border-brand-border rounded-lg mt-6 text-center">
      <AlertTriangle className="w-8 h-8 text-brand-gold mx-auto mb-4" />
      <h3 className="text-xl font-medium text-brand-cream mb-2">No Service Divisions Found</h3>
      <p className="text-brand-muted mb-6">The database is currently empty. You can initialize it with the 7 official Century Imagery divisions.</p>
      <button 
        onClick={async () => {
          setLoading(true)
          await checkSeedServices()
          setLoading(false)
        }}
        disabled={loading}
        className="px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded hover:bg-white transition-colors"
      >
        {loading ? 'Initializing...' : 'Initialize Official Divisions'}
      </button>
    </div>
  )
}

export function DeleteServiceButton({ id, title }: { id: string, title: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete the division "${title}"? This will also delete all associated service items.`)) {
      setLoading(true)
      const res = await deleteService(id)
      if (res.error) {
        alert(res.error)
        setLoading(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-brand-muted hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
      title="Delete Division"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
