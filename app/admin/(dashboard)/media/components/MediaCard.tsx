'use client'

import { useState } from 'react'
import { Film, Image as ImageIcon, Copy, Check, Eye, X, ExternalLink, Calendar, HardDrive, Maximize2 } from 'lucide-react'
import { DeleteMediaButton, SyncMediaButton } from './MediaActions'

export interface MediaItem {
  id: string
  filename: string
  original_filename?: string
  media_type: string
  mime_type?: string
  file_size?: number
  provider?: string
  provider_asset_id?: string
  provider_url?: string
  thumbnail_url?: string
  playback_url?: string
  duration_seconds?: number
  width?: number
  height?: number
  status: string
  alt_text?: string
  created_at?: string
}

function formatFileSize(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

function getFileExtension(filename: string, mime?: string): string {
  const match = filename?.match(/\.([^.]+)$/)
  if (match) return match[1].toUpperCase()
  if (mime) {
    const parts = mime.split('/')
    if (parts[1]) return parts[1].toUpperCase()
  }
  return 'FILE'
}

export function MediaCard({ item }: { item: MediaItem }) {
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [imgError, setImgError] = useState(false)

  const previewUrl = item.thumbnail_url || item.playback_url || item.provider_url || ''
  const isVideo = item.media_type === 'video' || /\.(mp4|webm|mov|m4v|mkv)$/i.test(previewUrl || item.filename)
  const ext = getFileExtension(item.filename, item.mime_type)
  const formattedSize = formatFileSize(item.file_size)
  const exactBytes = item.file_size ? `${item.file_size.toLocaleString()} bytes` : ''

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!previewUrl) return
    const fullUrl = previewUrl.startsWith('http') ? previewUrl : `${window.location.origin}${previewUrl}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const createdDate = item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : null

  return (
    <>
      <div className="bg-brand-surface-card border border-brand-border rounded-xl overflow-hidden group hover:border-brand-gold/40 transition-all duration-300 flex flex-col shadow-lg shadow-black/20 hover:shadow-black/50">
        {/* Media Preview Box */}
        <div 
          onClick={() => setShowModal(true)}
          className="aspect-video bg-brand-surface-elevated relative overflow-hidden cursor-pointer select-none"
        >
          {isVideo ? (
            previewUrl ? (
              <div className="w-full h-full relative group/video">
                <video 
                  src={previewUrl} 
                  preload="metadata"
                  poster={item.thumbnail_url && !item.thumbnail_url.match(/\.(mp4|webm|mov|m4v)$/i) ? item.thumbnail_url : undefined}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-brand-black/80 backdrop-blur-md border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-lg group-hover:scale-110 transition-transform">
                    <Film className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-muted">
                <Film className="w-8 h-8 opacity-40 text-brand-gold" />
              </div>
            )
          ) : previewUrl && !imgError ? (
            <img 
              src={previewUrl} 
              alt={item.alt_text || item.filename} 
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-brand-muted gap-2">
              <ImageIcon className="w-8 h-8 opacity-30 text-brand-cream" />
              <span className="text-[10px] text-brand-muted font-mono">{ext}</span>
            </div>
          )}

          {/* Badges Overlay (Top-Left) */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm backdrop-blur-md ${
              item.status === 'ready' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' : 
              item.status === 'processing' ? 'bg-amber-950/80 text-brand-gold border border-brand-gold/30' : 
              'bg-red-950/80 text-red-400 border border-red-500/30'
            }`}>
              {item.status}
            </span>
            
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-brand-cream border border-white/10">
              {ext}
            </span>

            {item.duration_seconds ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-brand-cream border border-white/10">
                {Math.floor(item.duration_seconds / 60)}:{(Math.round(item.duration_seconds % 60)).toString().padStart(2, '0')}
              </span>
            ) : null}
          </div>

          {/* Hover Action Overlay (Top-Right) */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={copyUrl}
              className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-brand-border text-brand-cream hover:text-brand-gold hover:border-brand-gold/50 transition-colors shadow-lg"
              title="Copy link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-brand-border text-brand-cream hover:text-brand-gold hover:border-brand-gold/50 transition-colors shadow-lg"
              title="Inspect details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {item.status !== 'ready' && item.provider_asset_id && (
              <SyncMediaButton id={item.id} uid={item.provider_asset_id} />
            )}
            
            <DeleteMediaButton 
              id={item.id} 
              uid={item.provider_asset_id || ''} 
              provider={item.provider || 'r2'} 
              filename={item.filename} 
            />
          </div>
        </div>

        {/* Media Details Footer */}
        <div className="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <p 
              className="font-medium text-brand-cream text-sm truncate" 
              title={item.filename}
            >
              {item.filename}
            </p>
            {item.alt_text && (
              <p className="text-[11px] text-brand-muted truncate mt-0.5 italic">
                {item.alt_text}
              </p>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-brand-border/60 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-brand-muted uppercase tracking-wider">
              {item.media_type}
            </span>
            <div className="flex items-center gap-2">
              <span 
                className="font-medium text-brand-gold/90 font-mono text-xs" 
                title={exactBytes}
              >
                {formattedSize}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Media Detail & Full Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-brand-border">
              <div className="min-w-0 pr-4">
                <h3 className="text-base sm:text-lg font-display font-medium text-brand-cream truncate" title={item.filename}>
                  {item.filename}
                </h3>
                <p className="text-xs text-brand-muted mt-0.5 flex items-center gap-2">
                  <span className="uppercase font-mono">{ext}</span>
                  <span>•</span>
                  <span className="font-mono text-brand-gold">{formattedSize}</span>
                  {exactBytes && <span className="text-brand-muted/70">({exactBytes})</span>}
                </p>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="text-brand-muted hover:text-brand-cream p-1.5 rounded-lg hover:bg-brand-surface-elevated transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player / Full Preview */}
            <div className="bg-black/90 aspect-video flex items-center justify-center relative overflow-hidden border-b border-brand-border">
              {isVideo ? (
                previewUrl ? (
                  <video 
                    src={previewUrl} 
                    controls 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-brand-muted text-sm">Video preview unavailable</div>
                )
              ) : previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt={item.alt_text || item.filename} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-brand-muted text-sm">Image preview unavailable</div>
              )}
            </div>

            {/* Modal Metadata Grid */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-brand-surface-card border border-brand-border p-3 rounded-lg">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-muted block">Format / MIME</span>
                  <span className="text-xs font-mono text-brand-cream font-medium mt-1 truncate block">
                    {item.mime_type || `${item.media_type}/${ext.toLowerCase()}`}
                  </span>
                </div>

                <div className="bg-brand-surface-card border border-brand-border p-3 rounded-lg">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-muted block">Exact Size</span>
                  <span className="text-xs font-mono text-brand-gold font-medium mt-1 truncate block" title={exactBytes}>
                    {formattedSize} {item.file_size ? `(${item.file_size.toLocaleString()} B)` : ''}
                  </span>
                </div>

                <div className="bg-brand-surface-card border border-brand-border p-3 rounded-lg">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-muted block">Storage Provider</span>
                  <span className="text-xs font-mono text-brand-cream font-medium mt-1 truncate block capitalize">
                    {item.provider || 'Cloudflare R2'}
                  </span>
                </div>

                <div className="bg-brand-surface-card border border-brand-border p-3 rounded-lg">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-muted block">Status</span>
                  <span className="text-xs font-mono text-emerald-400 font-medium mt-1 truncate block capitalize">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Direct Link Bar */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-brand-muted block">Direct Media URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={previewUrl}
                    className="flex-1 bg-brand-surface-elevated border border-brand-border text-brand-cream px-3 py-2 rounded-lg text-xs font-mono truncate"
                  />
                  <button
                    onClick={copyUrl}
                    className="bg-brand-gold text-brand-black px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-brand-surface-elevated border border-brand-border text-brand-muted hover:text-brand-cream transition-colors"
                      title="Open full size in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Alt Text & Media ID */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-brand-muted gap-2 border-t border-brand-border/60">
                <span className="font-mono text-[11px] truncate">ID: {item.id}</span>
                {createdDate && <span>Added {createdDate}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
