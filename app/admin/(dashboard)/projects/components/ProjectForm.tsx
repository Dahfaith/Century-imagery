'use client'

import { useActionState, useState } from 'react'
import { createProject, updateProject } from '../actions'
import Link from 'next/link'
import { Loader2, ArrowLeft, Save } from 'lucide-react'
import { DeleteProjectButton } from './ProjectActions'

type MediaItem = {
  id: string
  filename: string | null
  alt_text: string | null
  status: string | null
}

const CATEGORIES = [
  'Commercial',
  'Cinema',
  'Luxury Event',
  'Music Visualizers',
  'Fashion',
  'Photography'
]

type Project = any // Will be properly typed from DB

export function ProjectForm({ 
  project, 
  mediaList 
}: { 
  project?: Project,
  mediaList: MediaItem[] 
}) {
  const isEditing = !!project

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      if (isEditing) {
        const result = await updateProject(project.id, formData)
        return { error: result?.error || null }
      } else {
        const result = await createProject(formData)
        return { error: result?.error || null }
      }
    },
    { error: null }
  )

  const [title, setTitle] = useState(project?.title || '')
  const [slug, setSlug] = useState(project?.slug || '')

  // Generate slug dynamically if not editing and slug is untouched, but allow manual edits
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!isEditing) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  return (
    <form action={formAction} className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects" className="p-2 bg-brand-surface-elevated border border-brand-border rounded-lg text-brand-muted hover:text-brand-cream transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-display font-medium text-brand-cream">
            {isEditing ? 'Edit Project' : 'New Project'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {isEditing && (
            <DeleteProjectButton id={project.id} title={project.title} />
          )}
          <button
            type="submit"
            disabled={isPending}
            className="bg-brand-cream text-brand-black px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isEditing ? 'Save Changes' : 'Create Project'}</span>
          </button>
        </div>
      </div>

      {state?.error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-brand-cream mb-4 border-b border-brand-border pb-2">Basic Details</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Project Title *</label>
              <input
                name="title"
                required
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">URL Slug *</label>
              <input
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Short Description</label>
              <textarea
                name="short_description"
                defaultValue={project?.short_description || ''}
                rows={2}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Full Description</label>
              <textarea
                name="description"
                defaultValue={project?.description || ''}
                rows={6}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Media Selectors */}
          <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-brand-cream mb-4 border-b border-brand-border pb-2">Media</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Cover Media</label>
              <select
                name="cover_media_id"
                defaultValue={project?.cover_media_id || ''}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              >
                <option value="">None selected</option>
                {mediaList.map((m) => {
                  const label = m.filename || m.alt_text || 'Unnamed Media'
                  const isReady = m.status === 'ready'
                  return (
                    <option key={m.id} value={m.id} disabled={!isReady}>
                      {label} {!isReady ? `(${m.status})` : ''}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Hero Media</label>
              <select
                name="hero_media_id"
                defaultValue={project?.hero_media_id || ''}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              >
                <option value="">None selected</option>
                {mediaList.map((m) => {
                  const label = m.filename || m.alt_text || 'Unnamed Media'
                  const isReady = m.status === 'ready'
                  return (
                    <option key={m.id} value={m.id} disabled={!isReady}>
                      {label} {!isReady ? `(${m.status})` : ''}
                    </option>
                  )
                })}
              </select>
            </div>
            <p className="text-xs text-brand-muted">Note: Only "ready" media can be selected.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Metadata */}
          <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-brand-cream mb-4 border-b border-brand-border pb-2">Metadata</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Status</label>
              <select
                name="status"
                defaultValue={project?.status || 'draft'}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Category</label>
              <select
                name="category"
                defaultValue={project?.category || ''}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Client Name</label>
              <input
                name="client_name"
                defaultValue={project?.client_name || ''}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Year</label>
                <input
                  name="year"
                  type="number"
                  defaultValue={project?.year || new Date().getFullYear()}
                  className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Sort Order</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={project?.sort_order || 0}
                  className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Location</label>
              <input
                name="location"
                defaultValue={project?.location || ''}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>

            <label className="flex items-center space-x-3 pt-2">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={project?.featured}
                className="w-4 h-4 rounded border-brand-border text-brand-gold focus:ring-brand-gold/50 bg-brand-surface-elevated"
              />
              <span className="text-sm font-medium text-brand-cream">Featured Project</span>
            </label>
          </div>

          {/* SEO */}
          <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-brand-cream mb-4 border-b border-brand-border pb-2">SEO</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">SEO Title</label>
              <input
                name="seo_title"
                defaultValue={project?.seo_title || ''}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">SEO Description</label>
              <textarea
                name="seo_description"
                defaultValue={project?.seo_description || ''}
                rows={3}
                className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
