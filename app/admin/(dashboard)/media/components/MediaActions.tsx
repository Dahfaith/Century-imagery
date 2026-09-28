'use client'

import { useActionState } from 'react'
import { removeMedia, syncVideoStatus, renameMedia } from '../actions'
import { Loader2, Trash2, RefreshCw, Edit2 } from 'lucide-react'

export function DeleteMediaButton({ id, uid, provider, filename }: { id: string, uid: string, provider: string, filename: string }) {
  const [state, formAction, isPending] = useActionState(
    async () => {
      if (confirm(`Are you sure you want to delete "${filename}"? This cannot be undone.`)) {
        const res = await removeMedia(id, uid, provider)
        if (res.error) {
          alert(res.error)
        }
      }
      return null
    },
    null
  )

  return (
    <form action={formAction}>
      <button 
        type="submit" 
        disabled={isPending}
        className="text-brand-muted hover:text-red-400 p-2 rounded-lg bg-brand-surface-elevated border border-brand-border hover:border-red-400/50 transition-colors disabled:opacity-50"
        title="Delete media"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </form>
  )
}

export function SyncMediaButton({ id, uid }: { id: string, uid: string }) {
  const [state, formAction, isPending] = useActionState(
    async () => {
      await syncVideoStatus(id, uid)
      return null
    },
    null
  )

  return (
    <form action={formAction}>
      <button 
        type="submit" 
        disabled={isPending}
        className="text-brand-muted hover:text-brand-gold p-2 rounded-lg bg-brand-surface-elevated border border-brand-border transition-colors disabled:opacity-50"
        title="Check processing status"
      >
        <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
      </button>
    </form>
  )
}

export function RenameMediaButton({ id, currentFilename }: { id: string, currentFilename: string }) {
  const [state, formAction, isPending] = useActionState(
    async () => {
      const newName = window.prompt('Enter new filename:', currentFilename)
      if (newName && newName.trim() !== '' && newName.trim() !== currentFilename) {
        const res = await renameMedia(id, newName.trim())
        if (res.error) {
          alert(res.error)
        }
      }
      return null
    },
    null
  )

  return (
    <form action={formAction}>
      <button 
        type="submit" 
        disabled={isPending}
        onClick={(e) => e.stopPropagation()}
        className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-brand-border text-brand-cream hover:text-brand-gold hover:border-brand-gold/50 transition-colors shadow-lg disabled:opacity-50"
        title="Rename media"
      >
        {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Edit2 className="w-3.5 h-3.5" />}
      </button>
    </form>
  )
}

