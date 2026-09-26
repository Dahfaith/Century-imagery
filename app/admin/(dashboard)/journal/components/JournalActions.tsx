'use client'

import { useState } from 'react'
import { deleteJournalPost, seedJournalPosts } from '../actions'
import { Trash2, FileText, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function SeedJournalButton({ postCount }: { postCount: number }) {
  const [loading, setLoading] = useState(false)

  if (postCount > 0) return null

  return (
    <div className="p-6 bg-brand-surface-card border border-brand-border rounded-lg mt-6 text-center">
      <AlertTriangle className="w-8 h-8 text-brand-gold mx-auto mb-4" />
      <h3 className="text-xl font-medium text-brand-cream mb-2">No Articles Found</h3>
      <p className="text-brand-muted mb-6">Your journal is currently empty. Initialize it with realistic, rich demo articles.</p>
      <button 
        onClick={async () => {
          setLoading(true)
          const res = await seedJournalPosts()
          if (res?.error) {
            toast.error(res.error)
          } else {
            toast.success('Journal seeded successfully!')
          }
          setLoading(false)
        }}
        disabled={loading}
        className="px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded hover:bg-white transition-colors"
      >
        {loading ? 'Generating Articles...' : 'Seed Demo Articles'}
      </button>
    </div>
  )
}

export function DeletePostButton({ id, title }: { id: string, title: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete the article "${title}"?`)) {
      setLoading(true)
      const res = await deleteJournalPost(id)
      if (res?.error) {
        toast.error(res.error)
        setLoading(false)
      } else {
        toast.success('Article deleted')
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-brand-muted hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
      title="Delete Article"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
