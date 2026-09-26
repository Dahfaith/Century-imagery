'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { savePage } from '../actions'
import { CheckCircle2, Eye } from 'lucide-react'

// Schemas for specific pages to render structured fields
const PAGE_SCHEMAS: Record<string, any> = {
  home: {
    hero: [
      { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { key: 'heading', label: 'Hero Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cta_text', label: 'CTA Button Text', type: 'text' },
      { key: 'cta_link', label: 'CTA Link', type: 'text' },
      { key: 'video_media_id', label: 'Background Video', type: 'media' },
    ],
    about_preview: [
      { key: 'heading', label: 'About Section Heading', type: 'text' },
      { key: 'text', label: 'About Text', type: 'textarea' },
      { key: 'link_text', label: 'Link Text', type: 'text' },
    ]
  },
  about: {
    hero: [
      { key: 'heading', label: 'Hero Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    bio: [
      { key: 'heading', label: 'Bio Heading (Name)', type: 'text' },
      { key: 'text', label: 'Bio Description', type: 'textarea' },
      { key: 'image_media_id', label: 'Founder Image', type: 'media' }
    ],
    statement: [
      { key: 'text', label: 'Brand Statement Text', type: 'textarea' }
    ]
  },
  services: {
    hero: [
      { key: 'heading', label: 'Hero Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    cta: [
      { key: 'heading', label: 'CTA Heading', type: 'text' },
      { key: 'text', label: 'CTA Text', type: 'textarea' },
    ]
  },
  booking: {
    hero: [
      { key: 'heading', label: 'Hero Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    instructions: [
      { key: 'heading', label: 'Instructions Heading', type: 'text' },
      { key: 'text', label: 'Instructions Text', type: 'textarea' },
    ]
  }
}

export function PageEditor({ initialData, mediaOptions }: { initialData: any, mediaOptions: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [title, setTitle] = useState(initialData.title || '')
  const [status, setStatus] = useState(initialData.status || 'draft')
  const [seoTitle, setSeoTitle] = useState(initialData.seo_title || '')
  const [seoDescription, setSeoDescription] = useState(initialData.seo_description || '')
  
  // JSON content
  const [content, setContent] = useState<Record<string, any>>(
    typeof initialData.content === 'object' ? initialData.content : {}
  )

  const schema = PAGE_SCHEMAS[initialData.slug] || {}

  const handleContentChange = (section: string, key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const pageData = {
      title,
      status,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_image_url: initialData.seo_image_url,
      content
    }

    const res = await savePage(initialData.slug, pageData)

    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setSuccess('Page content saved successfully!')
      setLoading(false)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-24">
      {error && <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded">{error}</div>}
      {success && <div className="p-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded flex items-center"><CheckCircle2 className="w-5 h-5 mr-2"/> {success}</div>}
      
      <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
        <h2 className="text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-4">General Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">Page Title (Internal)</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
            />
          </div>
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
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 border-t border-brand-border">
          <h3 className="text-lg font-medium text-brand-cream">SEO Overrides (Optional)</h3>
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-2">SEO Title</label>
            <input 
              type="text" 
              value={seoTitle} 
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Leave blank to use default site settings"
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
      </div>

      {Object.keys(schema).length > 0 ? (
        Object.keys(schema).map(sectionKey => (
          <div key={sectionKey} className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl">
            <h2 className="text-xl font-display font-medium text-brand-cream border-b border-brand-border pb-4 uppercase">
              {sectionKey.replace('_', ' ')} Section
            </h2>
            
            <div className="space-y-6">
              {schema[sectionKey].map((field: any) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-brand-muted mb-2">{field.label}</label>
                  
                  {field.type === 'text' && (
                    <input 
                      type="text"
                      value={content[sectionKey]?.[field.key] || ''}
                      onChange={(e) => handleContentChange(sectionKey, field.key, e.target.value)}
                      className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea 
                      value={content[sectionKey]?.[field.key] || ''}
                      onChange={(e) => handleContentChange(sectionKey, field.key, e.target.value)}
                      rows={3}
                      className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
                    />
                  )}

                  {field.type === 'media' && (
                    <select 
                      value={content[sectionKey]?.[field.key] || ''}
                      onChange={(e) => handleContentChange(sectionKey, field.key, e.target.value)}
                      className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-cream focus:border-brand-gold outline-none transition-colors appearance-none"
                    >
                      <option value="">No Media Selected</option>
                      {mediaOptions.map(media => (
                        <option key={media.id} value={media.id} disabled={media.status !== 'ready'}>
                          {media.filename} {media.status !== 'ready' ? '(Processing)' : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-brand-surface-card p-6 rounded-xl border border-brand-border space-y-6 shadow-xl text-center">
          <p className="text-brand-muted">No structured schema defined for this page type.</p>
        </div>
      )}

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-3 sm:p-4 bg-[#0C0B10]/95 backdrop-blur-md border-t border-brand-border z-40">
        <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-start">
            <a 
              href={initialData.slug === 'home' ? '/' : `/${initialData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-brand-muted hover:text-brand-cream transition-colors font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Page</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              type="button"
              onClick={() => router.push('/admin/pages')}
              className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm border border-brand-border text-brand-cream rounded-lg hover:bg-brand-border transition-colors font-medium text-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-5 py-2 text-xs sm:text-sm bg-brand-gold text-brand-black rounded-lg hover:bg-white transition-colors font-semibold text-center shadow-lg min-w-[110px]"
            >
              {loading ? 'Saving...' : 'Save Page'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
