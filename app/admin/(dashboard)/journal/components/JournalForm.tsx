'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveJournalPost } from '../actions'
import { CheckCircle2, Eye, Plus, GripVertical, Trash2, Image as ImageIcon, Type, Heading } from 'lucide-react'
import { DeletePostButton } from './JournalActions'

type BlockType = 'paragraph' | 'heading' | 'image'
interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  media_id?: string;
}

export function JournalForm({ 
  initialData, 
  mediaOptions 
}: { 
  initialData?: any, 
  mediaOptions: any[] 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form State
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [coverMediaId, setCoverMediaId] = useState(initialData?.cover_media_id || '')
  const [authorName, setAuthorName] = useState(initialData?.author_name || '')
  const [status, setStatus] = useState(initialData?.status || 'draft')
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || '')
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || '')

  // Content Blocks State
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initialData?.content?.blocks || [{ id: crypto.randomUUID(), type: 'paragraph', content: '' }]
  )

  const generateSlug = (text: string) => {
    setSlug(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  }

  const addBlock = (type: BlockType) => {
    setBlocks([...blocks, { id: crypto.randomUUID(), type, content: '' }])
  }

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index))
  }

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...blocks]
    newBlocks[index] = { ...newBlocks[index], ...updates }
    setBlocks(newBlocks)
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === blocks.length - 1) return
    
    const newBlocks = [...blocks]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[swapIndex]
    newBlocks[swapIndex] = temp
    setBlocks(newBlocks)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const postData = {
      title,
      slug,
      excerpt,
      cover_media_id: coverMediaId || null,
      author_name: authorName,
      status,
      featured,
      seo_title: seoTitle,
      seo_description: seoDescription,
      content: { blocks },
      published_at: initialData?.published_at // Pass along existing if any
    }

    const res = await saveJournalPost(initialData?.id || null, postData)

    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setSuccess('Article saved successfully!')
      if (!initialData?.id) {
        setTimeout(() => router.push(`/admin/journal`), 1000)
      } else {
        setLoading(false)
        setTimeout(() => setSuccess(''), 3000)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-32">
      {error && <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded">{error}</div>}
      {success && <div className="p-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded flex items-center"><CheckCircle2 className="w-5 h-5 mr-2"/> {success}</div>}
      
      {/* Metadata Section */}
      <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
        <h2 className="text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-4">Article Details</h2>
        
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
            <label className="block text-sm font-medium text-brand-muted mb-2">Slug (URL)</label>
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
          <label className="block text-sm font-medium text-brand-muted mb-2">Excerpt (Summary)</label>
          <textarea 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Cover Media</label>
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
            <label className="block text-sm font-medium text-brand-muted mb-2">Author Name</label>
            <input 
              type="text" 
              value={authorName} 
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Akin Idowu"
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
              <option value="draft">Draft (Hidden)</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex items-center pt-8">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 bg-brand-surface border border-brand-border rounded text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-black"
              />
              <span className="text-brand-cream font-medium">Featured Article</span>
            </label>
          </div>
        </div>
      </div>

      {/* Block Editor Section */}
      <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-brand-border pb-4">
          <h2 className="text-xl font-display font-medium text-brand-cream">Article Content</h2>
          <div className="flex space-x-2">
            <button type="button" onClick={() => addBlock('heading')} className="flex items-center px-3 py-1.5 bg-brand-surface border border-brand-border rounded text-sm text-brand-cream hover:border-brand-gold transition-colors"><Heading className="w-4 h-4 mr-1"/> Heading</button>
            <button type="button" onClick={() => addBlock('paragraph')} className="flex items-center px-3 py-1.5 bg-brand-surface border border-brand-border rounded text-sm text-brand-cream hover:border-brand-gold transition-colors"><Type className="w-4 h-4 mr-1"/> Paragraph</button>
            <button type="button" onClick={() => addBlock('image')} className="flex items-center px-3 py-1.5 bg-brand-surface border border-brand-border rounded text-sm text-brand-cream hover:border-brand-gold transition-colors"><ImageIcon className="w-4 h-4 mr-1"/> Media</button>
          </div>
        </div>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="flex gap-4 p-4 bg-brand-surface border border-brand-border rounded-lg group">
              <div className="flex flex-col items-center justify-center space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="hover:text-brand-gold disabled:opacity-30">▲</button>
                <GripVertical className="w-5 h-5 text-brand-muted cursor-move" />
                <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="hover:text-brand-gold disabled:opacity-30">▼</button>
              </div>
              
              <div className="flex-1">
                {block.type === 'heading' && (
                  <input 
                    type="text" 
                    value={block.content} 
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Section Heading..."
                    className="w-full bg-transparent border-none text-xl font-display font-bold text-brand-cream focus:ring-0 outline-none p-0"
                  />
                )}
                {block.type === 'paragraph' && (
                  <textarea 
                    value={block.content} 
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Write your paragraph..."
                    rows={4}
                    className="w-full bg-transparent border-none text-brand-cream focus:ring-0 outline-none p-0 resize-y"
                  />
                )}
                {block.type === 'image' && (
                  <select 
                    value={block.media_id || ''} 
                    onChange={(e) => updateBlock(index, { media_id: e.target.value })}
                    className="w-full bg-brand-surface-card border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors appearance-none"
                  >
                    <option value="">Select Media</option>
                    {mediaOptions.map(media => (
                      <option key={media.id} value={media.id} disabled={media.status !== 'ready'}>
                        {media.filename} {media.status !== 'ready' ? '(Processing)' : ''}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button 
                type="button" 
                onClick={() => removeBlock(index)}
                className="text-brand-muted hover:text-red-500 self-start p-2"
                title="Remove Block"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
        <h2 className="text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-4">SEO Overrides (Optional)</h2>
        <div>
          <label className="block text-sm font-medium text-brand-muted mb-2">SEO Title</label>
          <input 
            type="text" 
            value={seoTitle} 
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-muted mb-2">SEO Description</label>
          <textarea 
            value={seoDescription} 
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={2}
            className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-brand-surface/80 backdrop-blur-md border-t border-brand-border flex justify-end z-40">
        <div className="max-w-7xl mx-auto w-full flex justify-end items-center space-x-4">
          {initialData?.slug && (
            <a 
              href={`/journal/${initialData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 text-brand-muted hover:text-brand-cream transition-colors font-medium mr-auto"
            >
              <Eye className="w-5 h-5" />
              <span>Preview Live Article</span>
            </a>
          )}

          <button 
            type="button"
            onClick={() => router.push('/admin/journal')}
            className="px-6 py-2 border border-brand-border text-brand-cream rounded hover:bg-brand-border transition-colors font-medium"
          >
            Cancel
          </button>
          {initialData?.id && (
             <DeletePostButton id={initialData.id} title={initialData.title} />
          )}
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-brand-gold text-brand-black rounded hover:bg-white transition-colors font-medium min-w-[120px]"
          >
            {loading ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </div>
    </form>
  )
}
