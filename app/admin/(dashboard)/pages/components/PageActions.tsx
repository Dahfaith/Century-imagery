'use client'

import { useState } from 'react'
import { checkSeedPages } from '../actions'
import { AlertTriangle } from 'lucide-react'

export function PageListActions({ pagesCount }: { pagesCount: number }) {
  const [loading, setLoading] = useState(false)

  if (pagesCount > 0) return null

  return (
    <div className="p-6 bg-brand-surface-card border border-brand-border rounded-lg mt-6 text-center">
      <AlertTriangle className="w-8 h-8 text-brand-gold mx-auto mb-4" />
      <h3 className="text-xl font-medium text-brand-cream mb-2">No Pages Found</h3>
      <p className="text-brand-muted mb-6">The database is currently empty. You can initialize it with the default core pages.</p>
      <button 
        onClick={async () => {
          setLoading(true)
          await checkSeedPages()
          setLoading(false)
        }}
        disabled={loading}
        className="px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded hover:bg-white transition-colors"
      >
        {loading ? 'Initializing...' : 'Initialize Core Pages'}
      </button>
    </div>
  )
}
