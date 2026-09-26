'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveSiteSettings } from './actions'
import { CheckCircle2, Globe, Mail, Phone, AtSign } from 'lucide-react'

export function SiteSettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    site_name: initialData.site_name || 'Century Imagery LLC',
    site_description: initialData.site_description || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    whatsapp: initialData.whatsapp || '',
    address: initialData.address || '',
    footer_tagline: initialData.footer_tagline || '',
    instagram_url: initialData.instagram_url || '',
    facebook_url: initialData.facebook_url || '',
    youtube_url: initialData.youtube_url || '',
    tiktok_url: initialData.tiktok_url || '',
    linkedin_url: initialData.linkedin_url || '',
    seo_title: initialData.seo_title || '',
    seo_description: initialData.seo_description || '',
  })

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const res = await saveSiteSettings(form)
    if (res?.error) {
      setError(res.error)
    } else {
      setSuccess('Settings saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-brand-surface border border-brand-border rounded-lg p-3 text-brand-cream text-sm focus:border-brand-gold outline-none transition-colors placeholder:text-brand-muted/40"
  const labelClass = "block text-sm font-medium text-brand-muted mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      {error && <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm">{error}</div>}
      {success && (
        <div className="p-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Brand Identity */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-display font-medium text-brand-cream border-b border-brand-border pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-gold" />
          Brand Identity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Site Name</label>
            <input type="text" value={form.site_name} onChange={update('site_name')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Footer Tagline</label>
            <input type="text" value={form.footer_tagline} onChange={update('footer_tagline')} placeholder="e.g. Architecting Visual Legacies" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Site Description (short)</label>
          <textarea value={form.site_description} onChange={update('site_description')} rows={2} className={inputClass} />
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-display font-medium text-brand-cream border-b border-brand-border pb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-brand-gold" />
          Contact Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={update('email')} placeholder="hello@centuryimagery.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="text" value={form.phone} onChange={update('phone')} placeholder="+234..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input type="text" value={form.whatsapp} onChange={update('whatsapp')} placeholder="+234..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address / Location</label>
            <input type="text" value={form.address} onChange={update('address')} placeholder="Ibadan, Nigeria" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-display font-medium text-brand-cream border-b border-brand-border pb-3 flex items-center gap-2">
          <AtSign className="w-4 h-4 text-brand-gold" />
          Social Media Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: 'instagram_url', label: 'Instagram URL' },
            { key: 'youtube_url', label: 'YouTube URL' },
            { key: 'tiktok_url', label: 'TikTok URL' },
            { key: 'facebook_url', label: 'Facebook URL' },
            { key: 'linkedin_url', label: 'LinkedIn URL' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input type="url" value={(form as any)[key]} onChange={update(key)} placeholder="https://..." className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      {/* Default SEO */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-display font-medium text-brand-cream border-b border-brand-border pb-3">
          Default SEO
        </h2>
        <p className="text-xs text-brand-muted">These act as fallback metadata for any page without its own SEO override.</p>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Default SEO Title</label>
            <input type="text" value={form.seo_title} onChange={update('seo_title')} placeholder="Century Imagery LLC | Motion Picture Studio" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Default SEO Description</label>
            <textarea value={form.seo_description} onChange={update('seo_description')} rows={3} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-brand-surface/90 backdrop-blur-md border-t border-brand-border flex justify-end z-40">
        <div className="max-w-7xl mx-auto w-full flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-brand-gold text-brand-black rounded-lg hover:bg-white transition-colors font-semibold text-sm min-w-[130px]"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </form>
  )
}
