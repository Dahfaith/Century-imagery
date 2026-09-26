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

import { toast } from 'react-hot-toast'

export function JournalForm({ 
  initialData, 
  mediaOptions 
}: { 
  initialData?: any, 
  mediaOptions: any[] 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
      toast.error(res.error)
      setLoading(false)
    } else {
      toast.success('Article saved successfully!')
      if (!initialData?.id) {
        setTimeout(() => router.push(`/admin/journal`), 500)
      } else {
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-40">
      
      {/* Metadata Section */}
      <div className="bg-brand-surface-card p-4 sm:p-6 rounded-xl border border-brand-border space-y-5 sm:space-y-6 shadow-xl">
        <h2 className="text-lg sm:text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-3 sm:pb-4">Article Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => {
                setTitle(e.target.value)
                if (!initialData?.id) generateSlug(e.target.value)
              }}
              required
              className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">Slug (URL)</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">Excerpt (Summary)</label>
          <textarea 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">Cover Media</label>
            <select 
              value={coverMediaId} 
              onChange={(e) => setCoverMediaId(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors appearance-none"
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
            <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">Author Name</label>
            <input 
              type="text" 
              value={authorName} 
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Akin Idowu"
              className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-brand-border">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors"
            >
              <option value="draft">Draft (Hidden)</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex items-center pt-2 sm:pt-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 bg-brand-surface border border-brand-border rounded text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-black"
              />
              <span className="text-xs sm:text-sm text-brand-cream font-medium">Featured Article</span>
            </label>
          </div>
        </div>
      </div>

      {/* Block Editor Section */}
      <div className="bg-brand-surface-card p-4 sm:p-6 rounded-xl border border-brand-border space-y-5 sm:space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-3 sm:pb-4">
          <h2 className="text-lg sm:text-xl font-display font-medium text-brand-cream">Article Content</h2>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button type="button" onClick={() => addBlock('heading')} className="flex items-center px-2.5 py-1.5 bg-brand-surface border border-brand-border rounded-lg text-xs font-medium text-brand-cream hover:border-brand-gold transition-colors"><Heading className="w-3.5 h-3.5 mr-1 text-brand-gold"/> Heading</button>
            <button type="button" onClick={() => addBlock('paragraph')} className="flex items-center px-2.5 py-1.5 bg-brand-surface border border-brand-border rounded-lg text-xs font-medium text-brand-cream hover:border-brand-gold transition-colors"><Type className="w-3.5 h-3.5 mr-1 text-brand-gold"/> Paragraph</button>
            <button type="button" onClick={() => addBlock('image')} className="flex items-center px-2.5 py-1.5 bg-brand-surface border border-brand-border rounded-lg text-xs font-medium text-brand-cream hover:border-brand-gold transition-colors"><ImageIcon className="w-3.5 h-3.5 mr-1 text-brand-gold"/> Media</button>
          </div>
        </div>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="flex flex-col sm:flex-row gap-3 p-3.5 sm:p-4 bg-brand-surface border border-brand-border rounded-xl group relative">
              <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 border-b sm:border-b-0 sm:border-r border-brand-border/40 pb-2 sm:pb-0 sm:pr-3">
                <div className="flex sm:flex-col items-center gap-1">
                  <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 hover:text-brand-gold disabled:opacity-20 text-xs">▲</button>
                  <GripVertical className="hidden sm:block w-4 h-4 text-brand-muted cursor-move" />
                  <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="p-1 hover:text-brand-gold disabled:opacity-20 text-xs">▼</button>
                </div>
                <button 
                  type="button" 
                  onClick={() => removeBlock(index)}
                  className="sm:hidden text-brand-muted hover:text-red-500 p-1"
                  title="Remove Block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                {block.type === 'heading' && (
                  <input 
                    type="text" 
                    value={block.content} 
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Section Heading..."
                    className="w-full bg-transparent border-none text-base sm:text-xl font-display font-bold text-brand-cream focus:ring-0 outline-none p-0"
                  />
                )}
                {block.type === 'paragraph' && (
                  <textarea 
                    value={block.content} 
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Write your paragraph..."
                    rows={4}
                    className="w-full bg-transparent border-none text-brand-cream focus:ring-0 outline-none p-0 resize-y text-xs sm:text-sm leading-relaxed"
                  />
                )}
                {block.type === 'image' && (
                  <select 
                    value={block.media_id || ''} 
                    onChange={(e) => updateBlock(index, { media_id: e.target.value })}
                    className="w-full bg-brand-surface-card border border-brand-border rounded-lg p-2.5 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors appearance-none"
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
                className="hidden sm:block text-brand-muted hover:text-red-500 self-start p-1.5"
                title="Remove Block"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-brand-surface-card p-4 sm:p-6 rounded-xl border border-brand-border space-y-4 sm:space-y-6 shadow-xl">
        <h2 className="text-lg sm:text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-3 sm:pb-4">SEO Overrides (Optional)</h2>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">SEO Title</label>
          <input 
            type="text" 
            value={seoTitle} 
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-brand-muted mb-1.5 sm:mb-2">SEO Description</label>
          <textarea 
            value={seoDescription} 
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={2}
            className="w-full bg-brand-surface border border-brand-border rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-brand-cream focus:border-brand-gold outline-none transition-colors"
          />
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-3 sm:p-4 bg-[#0C0B10]/95 backdrop-blur-md border-t border-brand-border z-40">
        <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            {initialData?.slug && (
              <a 
                href={`/journal/${initialData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-brand-muted hover:text-brand-cream transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Live</span>
              </a>
            )}
            {initialData?.id && (
              <DeletePostButton id={initialData.id} title={initialData.title} />
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              type="button"
              onClick={() => router.push('/admin/journal')}
              className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm border border-brand-border text-brand-cream rounded-lg hover:bg-brand-border transition-colors font-medium text-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-5 py-2 text-xs sm:text-sm bg-brand-gold text-brand-black rounded-lg hover:bg-white transition-colors font-semibold text-center shadow-lg min-w-[110px]"
            >
              {loading ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
