'use client'

import { useActionState } from 'react'
import { removeMedia, syncVideoStatus } from '../actions'
import { Loader2, Trash2, RefreshCw } from 'lucide-react'

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
