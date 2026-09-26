import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { MediaUploader } from './components/MediaUploader'
import { DeleteMediaButton, SyncMediaButton } from './components/MediaActions'
import { Search, Film, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Media Library | CMS',
}

export default async function MediaPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()
  const params = await searchParams

  const search = typeof params.q === 'string' ? params.q : ''
  const type = typeof params.type === 'string' ? params.type : ''
  const status = typeof params.status === 'string' ? params.status : ''

  let query = supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(`filename.ilike.%${search}%,alt_text.ilike.%${search}%`)
  }
  if (type) {
    query = query.eq('media_type', type)
  }
  if (status) {
    query = query.eq('status', status)
  }

  const { data: mediaItems } = await (query as any) as { data: any[] | null }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-medium text-brand-cream">Media Library</h1>
          <p className="text-sm text-brand-muted mt-1">Manage videos and images for your projects.</p>
        </div>
        <div className="self-start sm:self-auto">
          <MediaUploader />
        </div>
      </div>

      {!process.env.CLOUDFLARE_ACCOUNT_ID && (
        <div className="bg-brand-gold/10 border border-brand-gold/20 p-4 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
          <div className="text-sm font-sans">
            <p className="text-brand-cream font-medium">Cloudflare Configuration Missing</p>
            <p className="text-brand-muted mt-1">
              Cloudflare Stream API keys are not set in your environment variables. 
              Live video uploads will fail safely. Please configure CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_STREAM_API_TOKEN.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-4">
        <form className="flex flex-col sm:flex-row gap-4" method="GET" action="/admin/media">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Search filenames or alt text..."
              className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream pl-9 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              name="type"
              defaultValue={type}
              className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors min-w-[140px]"
            >
              <option value="">All Types</option>
              <option value="video">Videos</option>
              <option value="image">Images</option>
            </select>

            <select
              name="status"
              defaultValue={status}
              className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors min-w-[140px]"
            >
              <option value="">All Statuses</option>
              <option value="ready">Ready</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>

            <button type="submit" className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg text-sm hover:bg-brand-surface transition-colors">
              Filter
            </button>
            
            {(search || type || status) && (
              <Link href="/admin/media" className="flex items-center text-sm text-brand-muted hover:text-brand-cream px-2">
                Clear
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* Media Grid */}
      {(!mediaItems || mediaItems.length === 0) ? (
        <div className="bg-brand-surface-card border border-brand-border rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-surface-elevated rounded-full flex items-center justify-center mb-4 border border-brand-border/50">
            <Film className="w-8 h-8 text-brand-muted" />
          </div>
          <h3 className="text-lg font-medium text-brand-cream mb-1">No media found</h3>
          <p className="text-sm text-brand-muted mb-4 max-w-sm">
            {search || type || status 
              ? "Try adjusting your filters."
              : "Upload your first video to see it here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-brand-surface-card border border-brand-border rounded-xl overflow-hidden group hover:border-brand-gold/30 transition-colors flex flex-col">
              <div className="aspect-video bg-brand-surface-elevated relative overflow-hidden">
                {item.thumbnail_url ? (
                  <img 
                    src={item.thumbnail_url} 
                    alt={item.alt_text || item.filename} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-muted">
                    {item.media_type === 'video' ? <Film className="w-8 h-8 opacity-20" /> : <ImageIcon className="w-8 h-8 opacity-20" />}
                  </div>
                )}
                
                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-black/70 backdrop-blur-md ${
                    item.status === 'ready' ? 'text-green-400' : 
                    item.status === 'processing' ? 'text-brand-gold' : 'text-red-400'
                  }`}>
                    {item.status}
                  </span>
                  {item.duration_seconds && (
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/70 backdrop-blur-md text-brand-cream">
                      {Math.floor(item.duration_seconds / 60)}:{(Math.round(item.duration_seconds % 60)).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.status !== 'ready' && item.provider_asset_id && (
                    <SyncMediaButton id={item.id} uid={item.provider_asset_id} />
                  )}
                  <DeleteMediaButton id={item.id} uid={item.provider_asset_id} provider={item.provider} filename={item.filename} />
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-medium text-brand-cream text-sm truncate" title={item.filename}>{item.filename}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-brand-muted">
                  <span className="capitalize">{item.media_type}</span>
                  {item.file_size && (
                    <span>{(item.file_size / (1024 * 1024)).toFixed(2)} MB</span>
                  )}
                </div>
                
                {item.playback_url && (
                  <div className="mt-4 pt-3 border-t border-brand-border">
                    <p className="text-xs text-brand-muted font-mono truncate" title={item.provider_asset_id}>
                      UID: {item.provider_asset_id}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
