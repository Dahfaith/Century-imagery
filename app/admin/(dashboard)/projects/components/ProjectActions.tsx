'use client'

import { useActionState } from 'react'
import { deleteProject, toggleProjectStatus } from '../actions'
import { Loader2, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function DeleteProjectButton({ id, title }: { id: string, title: string }) {
  const [state, formAction, isPending] = useActionState(
    async () => {
      if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
        const res = await deleteProject(id)
        if (res?.error) {
          toast.error(res.error)
        } else {
          toast.success('Project deleted')
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
        className="text-brand-muted hover:text-red-400 p-2 transition-colors disabled:opacity-50"
        title="Delete project"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </form>
  )
}

export function ToggleStatusButton({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [state, formAction, isPending] = useActionState(
    async () => {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published'
      const res = await toggleProjectStatus(id, newStatus)
      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success(`Project ${newStatus === 'published' ? 'published' : 'moved to draft'}`)
      }
      return null
    },
    null
  )

  const isPublished = currentStatus === 'published'

  return (
    <form action={formAction}>
      <button 
        type="submit" 
        disabled={isPending}
        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors disabled:opacity-50 ${
          isPublished 
            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
            : 'bg-brand-surface-elevated text-brand-muted border-brand-border hover:text-brand-cream'
        }`}
        title={isPublished ? 'Unpublish project' : 'Publish project'}
      >
        {isPending ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : isPublished ? (
          <CheckCircle2 className="w-3 h-3" />
        ) : (
          <XCircle className="w-3 h-3" />
        )}
        <span>{isPublished ? 'Published' : 'Draft'}</span>
      </button>
    </form>
  )
}
