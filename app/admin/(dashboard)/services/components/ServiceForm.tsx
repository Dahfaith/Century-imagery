'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveService } from '../actions'
import { Plus, Trash2, GripVertical, CheckCircle2 } from 'lucide-react'
import { DeleteServiceButton } from './ServiceActions'

export function ServiceForm({ 
  initialData, 
  initialItems = [], 
  mediaOptions 
}: { 
  initialData?: any, 
  initialItems?: any[],
  mediaOptions: any[] 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form State
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [shortDesc, setShortDesc] = useState(initialData?.short_description || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [icon, setIcon] = useState(initialData?.icon || '')
  const [coverMediaId, setCoverMediaId] = useState(initialData?.cover_media_id || '')
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order || 0)
  const [status, setStatus] = useState(initialData?.status || 'published')

  // Service Items State
  const [items, setItems] = useState<{title: string, description: string}[]>(
    initialItems.length > 0 ? initialItems : []
  )

  const generateSlug = (text: string) => {
    setSlug(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  }

  const handleAddItem = () => {
    setItems([...items, { title: '', description: '' }])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const handleItemChange = (index: number, field: 'title' | 'description', value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return
    
    const newItems = [...items]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newItems[index]
    newItems[index] = newItems[swapIndex]
    newItems[swapIndex] = temp
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const serviceData = {
      title,
      slug,
      short_description: shortDesc,
      description,
      icon,
      cover_media_id: coverMediaId || null,
      featured,
      sort_order: sortOrder,
      status
    }

    const res = await saveService(initialData?.id || null, serviceData, items)

    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setSuccess('Service saved successfully!')
      if (!initialData?.id) {
        // Redirect if new
        setTimeout(() => router.push(`/admin/services`), 1000)
      } else {
        setLoading(false)
        setTimeout(() => setSuccess(''), 3000)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-24">
      {error && <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded">{error}</div>}
      {success && <div className="p-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded flex items-center"><CheckCircle2 className="w-5 h-5 mr-2"/> {success}</div>}
      
      <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
        <h2 className="text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-4">Division Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => {
                setTitle(e.target.value)
                if (!initialData?.id) generateSlug(e.target.value)
              }}
              required
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Slug</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-muted mb-2">Short Description</label>
          <textarea 
            value={shortDesc} 
            onChange={(e) => setShortDesc(e.target.value)}
            rows={2}
            className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-muted mb-2">Full Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Cover Media (from Media Library)</label>
            <select 
              value={coverMediaId} 
              onChange={(e) => setCoverMediaId(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors appearance-none"
            >
              <option value="">No Cover Media</option>
              {mediaOptions.map(media => (
                <option key={media.id} value={media.id} disabled={media.status !== 'ready'}>
                  {media.filename} {media.status !== 'ready' ? '(Processing)' : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Icon (Lucide name or SVG path)</label>
            <input 
              type="text" 
              value={icon} 
              onChange={(e) => setIcon(e.target.value)}
              placeholder="e.g. Video, Camera, Scissors"
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-brand-border">
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Sort Order</label>
            <input 
              type="number" 
              value={sortOrder} 
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
            />
          </div>
          <div className="flex items-center pt-8">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 bg-brand-surface border border-brand-border rounded text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-black"
              />
              <span className="text-brand-cream font-medium">Featured Division</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-brand-border pb-4">
          <h2 className="text-xl font-display font-medium text-brand-cream">Service Items</h2>
          <button 
            type="button" 
            onClick={handleAddItem}
            className="flex items-center space-x-2 text-sm px-3 py-1.5 bg-brand-gold/10 text-brand-gold rounded hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-brand-muted text-center py-8">No specific service items added yet.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-brand-surface border border-brand-border rounded-lg group">
                <div className="flex flex-col items-center justify-center space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => moveItem(index, 'up')} disabled={index === 0} className="hover:text-brand-gold disabled:opacity-30">▲</button>
                  <GripVertical className="w-5 h-5 text-brand-muted cursor-move" />
                  <button type="button" onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1} className="hover:text-brand-gold disabled:opacity-30">▼</button>
                </div>
                <div className="flex-1 space-y-4">
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    placeholder="Item Title (e.g. Drone Piloting)"
                    required
                    className="w-full bg-brand-surface border border-brand-border rounded p-2 text-brand-cream focus:border-brand-gold outline-none transition-colors"
                  />
                  <textarea 
                    value={item.description} 
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Brief description of this specific service..."
                    rows={2}
                    className="w-full bg-brand-surface border border-brand-border rounded p-2 text-brand-cream focus:border-brand-gold outline-none transition-colors text-sm"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => handleRemoveItem(index)}
                  className="text-brand-muted hover:text-red-500 self-start p-2"
                  title="Remove Item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-brand-surface/80 backdrop-blur-md border-t border-brand-border flex justify-end z-40">
        <div className="max-w-7xl mx-auto w-full flex justify-end space-x-4">
          <button 
            type="button"
            onClick={() => router.push('/admin/services')}
            className="px-6 py-2 border border-brand-border text-brand-cream rounded hover:bg-brand-border transition-colors font-medium"
          >
            Cancel
          </button>
          {initialData?.id && (
             <DeleteServiceButton id={initialData.id} title={initialData.title} />
          )}
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-brand-gold text-brand-black rounded hover:bg-white transition-colors font-medium min-w-[120px]"
          >
            {loading ? 'Saving...' : 'Save Division'}
          </button>
        </div>
      </div>
    </form>
  )
}
