import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

/**
 * Data Access Layer for Public Website
 *
 * All functions here fetch *only* published content from Supabase.
 * Media records are joined to get real URLs.
 */

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface PublicProject {
  slug: string
  title: string
  client: string
  category: string
  year: string
  location: string
  shortDescription: string
  fullDescription: string
  story?: string
  heroImage: string  // cover image URL (thumbnail / provider_url)
  heroVideo?: string // hero video playback URL (Cloudflare Stream UID or URL)
  gallery: string[]  // from project_media join
  services: string[] // from description or separate field
  credits: { role: string; name: string }[]
  featured: boolean
}

export interface PublicService {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  category: string
  videoUrl?: string
  imagePlaceholder: string
  capabilities: string[]
}

export interface PublicJournalArticle {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  content: string[]
  coverImage: string
  author: string
  featured: boolean
  pullQuote?: string
  cameraSpecs?: string[]
}

export interface PublicPage {
  slug: string
  title: string
  status: string
  content: Record<string, any>
  seo_title?: string
  seo_description?: string
  seo_image_url?: string
}

export interface SiteSettings {
  site_name?: string
  site_description?: string
  logo_url?: string
  favicon_url?: string
  email?: string
  phone?: string
  whatsapp?: string
  address?: string
  footer_tagline?: string
  instagram_url?: string
  facebook_url?: string
  youtube_url?: string
  tiktok_url?: string
  linkedin_url?: string
  seo_title?: string
  seo_description?: string
  seo_image_url?: string
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getMediaUrl(mediaRecord: any): string {
  if (!mediaRecord) return '/brand/hero-mockup-gold.png'
  // Prefer Cloudflare R2 public URL or Cloudflare Stream thumbnail
  return mediaRecord.provider_url || mediaRecord.thumbnail_url || mediaRecord.playback_url || '/brand/hero-mockup-gold.png'
}

function getVideoUrl(mediaRecord: any): string | undefined {
  if (!mediaRecord) return undefined
  // For Cloudflare Stream, playback_url is the embed-ready UID or HLS URL
  // For R2, provider_url is the direct file URL
  return mediaRecord.playback_url || mediaRecord.provider_url || undefined
}

// ─── SITE SETTINGS ───────────────────────────────────────────────────────────

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*').single()
  if (error || !data) return null
  return data as SiteSettings
})

// ─── PAGES ───────────────────────────────────────────────────────────────────

export const getPageBySlug = cache(async (slug: string): Promise<PublicPage | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pages')
    .select('slug, title, status, content, seo_title, seo_description, seo_image_url')
    .eq('slug', slug)
    .single() as any
  if (error || !data) return null
  return {
    slug: data.slug,
    title: data.title,
    status: data.status || 'draft',
    content: (data.content as Record<string, any>) || {},
    seo_title: data.seo_title || undefined,
    seo_description: data.seo_description || undefined,
    seo_image_url: data.seo_image_url || undefined,
  }
})

export const getAllPages = cache(async (): Promise<PublicPage[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pages')
    .select('slug, title, status, content, seo_title, seo_description, seo_image_url')
    .eq('status', 'published') as any
  if (error || !data) return []
  return (data as any[]).map((d: any) => ({
    slug: d.slug,
    title: d.title,
    status: d.status || 'draft',
    content: (d.content as Record<string, any>) || {},
    seo_title: d.seo_title || undefined,
    seo_description: d.seo_description || undefined,
    seo_image_url: d.seo_image_url || undefined,
  }))
})

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function mapProject(dbProject: any): PublicProject {
  const coverMedia = dbProject.cover_media || null
  const heroMedia = dbProject.hero_media || null

  // Build gallery from project_media relation (sorted)
  const galleryItems: string[] = (dbProject.project_media || [])
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((pm: any) => pm.media ? getMediaUrl(pm.media) : null)
    .filter(Boolean)

  // Parse credits from JSON field or description
  let credits: { role: string; name: string }[] = []
  if (dbProject.credits && Array.isArray(dbProject.credits)) {
    credits = dbProject.credits
  }

  // Parse services from JSON field
  let services: string[] = []
  if (Array.isArray(dbProject.services)) {
    services = dbProject.services
  } else if (dbProject.category) {
    services = [dbProject.category]
  }

  return {
    slug: dbProject.slug,
    title: dbProject.title || '',
    client: dbProject.client_name || '',
    category: dbProject.category || '',
    year: dbProject.year ? String(dbProject.year) : '',
    location: dbProject.location || '',
    shortDescription: dbProject.short_description || '',
    fullDescription: dbProject.description || '',
    story: undefined,
    heroImage: getMediaUrl(coverMedia),
    heroVideo: getVideoUrl(heroMedia),
    gallery: galleryItems,
    services,
    credits,
    featured: dbProject.featured || false,
  }
}

export const getProjects = cache(async (limit?: number): Promise<PublicProject[]> => {
  const supabase = await createClient()
  let query = supabase
    .from('projects')
    .select(`
      *,
      cover_media:cover_media_id (id, provider_url, thumbnail_url, playback_url, media_type),
      hero_media:hero_media_id (id, provider_url, thumbnail_url, playback_url, media_type),
      project_media (sort_order, media:media_id (id, provider_url, thumbnail_url, playback_url, media_type))
    `)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error || !data) return []
  return data.map(mapProject)
})

export const getProjectBySlug = cache(async (slug: string): Promise<PublicProject | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      cover_media:cover_media_id (id, provider_url, thumbnail_url, playback_url, media_type),
      hero_media:hero_media_id (id, provider_url, thumbnail_url, playback_url, media_type),
      project_media (sort_order, media:media_id (id, provider_url, thumbnail_url, playback_url, media_type))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null
  return mapProject(data)
})

// ─── SERVICES ────────────────────────────────────────────────────────────────

export const getServices = cache(async (): Promise<PublicService[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      cover_media:cover_media_id (id, provider_url, thumbnail_url, playback_url, media_type),
      service_items (id, title, description, sort_order)
    `)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error || !data) return []

  return data.map((svc: any, index: number) => {
    const items: any[] = (svc.service_items || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
    const firstItem = items[0] || {}
    const coverMedia = svc.cover_media

    return {
      id: svc.slug,
      number: String(index + 1).padStart(2, '0'),
      title: svc.title,
      tagline: firstItem.description || svc.short_description || '',
      description: svc.description || '',
      category: svc.title,
      videoUrl: getVideoUrl(coverMedia),
      imagePlaceholder: getMediaUrl(coverMedia),
      capabilities: items.map((i: any) => i.title).filter(Boolean),
    }
  })
})

// ─── JOURNAL ─────────────────────────────────────────────────────────────────

function mapJournalArticle(dbPost: any): PublicJournalArticle {
  const coverMedia = dbPost.cover_media || null

  // Parse content blocks — admin saves as { blocks: [{type, content}] }
  const blocks: any[] = dbPost.content?.blocks || []
  const contentStrings = blocks
    .filter((b: any) => b.type === 'paragraph')
    .map((b: any) => b.content || b.data?.text || b.data?.html || '')
    .filter(Boolean)

  // Estimate read time from word count
  const totalWords = contentStrings.join(' ').split(/\s+/).length
  const readMins = Math.max(1, Math.ceil(totalWords / 200))

  return {
    slug: dbPost.slug,
    title: dbPost.title,
    category: dbPost.category || 'Behind The Scenes',
    date: new Date(dbPost.published_at || dbPost.created_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    readTime: `${readMins} min read`,
    excerpt: dbPost.excerpt || '',
    content: contentStrings,
    coverImage: getMediaUrl(coverMedia),
    author: dbPost.author_name || 'Century Imagery',
    featured: dbPost.featured || false,
    pullQuote: dbPost.pull_quote || undefined,
    cameraSpecs: dbPost.camera_specs || undefined,
  }
}

export const getJournalPosts = cache(async (limit?: number): Promise<PublicJournalArticle[]> => {
  const supabase = await createClient()
  let query = supabase
    .from('journal_posts')
    .select(`
      *,
      cover_media:cover_media_id (id, provider_url, thumbnail_url, playback_url, media_type)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error || !data) return []
  return data.map(mapJournalArticle)
})

export const getJournalPostBySlug = cache(async (slug: string): Promise<PublicJournalArticle | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journal_posts')
    .select(`
      *,
      cover_media:cover_media_id (id, provider_url, thumbnail_url, playback_url, media_type)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null
  return mapJournalArticle(data)
})
