import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { services as CANONICAL_SERVICES } from '@/data/services'
import { projects as CANONICAL_PROJECTS } from '@/data/projects'

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
  if (mediaRecord.media_type === 'image') return undefined
  const url = mediaRecord.playback_url || mediaRecord.provider_url
  if (!url) return undefined
  if (/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(url)) return undefined
  return url
}

// Built-in cinematic video fallbacks ensuring videos match localhost defaults
const LEGACY_PROJECT_VIDEOS: Record<string, string> = {
  'oyo-state-armed-forces-remembrance': '/projects/armed-forces.MP4',
  'dj-tunez-live-experiences': '/projects/dj-tunez.MP4',
  'utiva-future-of-tech': '/projects/utiva.MP4',
  'iconic-legacies-public-figures': '/projects/public-figures.MP4',
  'century-legacy-wedding-cinema': '/projects/wedding-cinema.MP4',
}

const LEGACY_SERVICE_VIDEOS: Record<string, string> = {
  'commercial-brand-production': '/services/commercial-brand.MOV',
  'aerial-specialized': '/services/aerial-specialized.MOV',
  'photography-division': '/services/photography.MOV',
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
  const canonical = CANONICAL_PROJECTS.find((p) => p.slug === dbProject.slug)

  // Build gallery from project_media relation (sorted)
  const galleryItems: string[] = (dbProject.project_media || [])
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((pm: any) => pm.media ? getMediaUrl(pm.media) : null)
    .filter(Boolean)

  const finalGallery = galleryItems.length > 0 ? galleryItems : (canonical?.gallery || [])

  // Parse credits from JSON field or description
  let credits: { role: string; name: string }[] = []
  if (dbProject.credits && Array.isArray(dbProject.credits) && dbProject.credits.length > 0) {
    credits = dbProject.credits
  } else if (canonical?.credits) {
    credits = canonical.credits
  }

  // Parse services from JSON field
  let services: string[] = []
  if (Array.isArray(dbProject.services) && dbProject.services.length > 0) {
    services = dbProject.services
  } else if (canonical?.services) {
    services = canonical.services
  } else if (dbProject.category) {
    services = [dbProject.category]
  }

  // Cover image / thumbnail:
  // If coverMedia is assigned in DB, prioritize it directly (whether updated via admin or seeded)
  let heroImage = canonical?.heroImage || '/brand/hero-mockup-gold.png'
  if (coverMedia) {
    if (coverMedia.media_type === 'image') {
      heroImage = getMediaUrl(coverMedia)
    } else {
      heroImage = coverMedia.thumbnail_url || getMediaUrl(coverMedia)
    }
  }

  // Hero video:
  // On localhost, rebel-empire-osogbo NEVER had a hero video; it is a photo project that displays rebel-empire.jpg.
  // For other projects: use their real video from DB hero_media, cover_media (if video), or canonical localhost fallback.
  let heroVideo: string | undefined = undefined
  if (dbProject.slug === 'rebel-empire-osogbo') {
    if (heroMedia && heroMedia.filename !== 'hero.MP4' && heroMedia.media_type === 'video') {
      heroVideo = getVideoUrl(heroMedia)
    } else {
      heroVideo = undefined
    }
  } else {
    if (heroMedia && heroMedia.media_type === 'video') {
      heroVideo = getVideoUrl(heroMedia)
    } else if (coverMedia && coverMedia.media_type === 'video') {
      heroVideo = getVideoUrl(coverMedia)
    } else {
      heroVideo = LEGACY_PROJECT_VIDEOS[dbProject.slug] || canonical?.heroVideo || undefined
    }
  }

  return {
    slug: dbProject.slug,
    title: dbProject.title || canonical?.title || '',
    client: dbProject.client_name || canonical?.client || '',
    category: dbProject.category || canonical?.category || '',
    year: dbProject.year ? String(dbProject.year) : (canonical?.year || ''),
    location: dbProject.location || canonical?.location || '',
    shortDescription: dbProject.short_description || canonical?.shortDescription || '',
    fullDescription: dbProject.description || canonical?.fullDescription || '',
    story: canonical?.story,
    heroImage,
    heroVideo,
    gallery: finalGallery,
    services,
    credits,
    featured: dbProject.featured ?? canonical?.featured ?? false,
  }
}

export const getProjects = cache(async (limit?: number): Promise<PublicProject[]> => {
  const supabase = await createClient()
  let query = supabase
    .from('projects')
    .select(`
      *,
      cover_media:cover_media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type),
      hero_media:hero_media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type),
      project_media (sort_order, media:media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type))
    `)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error || !data || data.length === 0) {
    return CANONICAL_PROJECTS.slice(0, limit || undefined) as any
  }
  return data.map(mapProject)
})

export const getProjectBySlug = cache(async (slug: string): Promise<PublicProject | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      cover_media:cover_media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type),
      hero_media:hero_media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type),
      project_media (sort_order, media:media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    const canonical = CANONICAL_PROJECTS.find(p => p.slug === slug)
    return (canonical as any) || null
  }
  return mapProject(data)
})

// ─── SERVICES ────────────────────────────────────────────────────────────────

export const getServices = cache(async (): Promise<PublicService[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      cover_media:cover_media_id (id, filename, provider_url, thumbnail_url, playback_url, media_type),
      service_items (id, title, description, sort_order)
    `)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error || !data || data.length === 0) {
    return CANONICAL_SERVICES.map((s, idx) => ({
      ...s,
      number: String(idx + 1).padStart(2, '0'),
    }))
  }

  // Filter out empty duplicate row 'the-century-post-lab' (the real post lab is 'century-post-lab')
  const validServices = data.filter((svc: any) => {
    if (svc.slug === 'the-century-post-lab') return false
    return true
  })

  return validServices.map((svc: any, index: number) => {
    const canonical = CANONICAL_SERVICES.find(
      (c) => c.id === svc.slug || (c.id === 'century-post-lab' && svc.slug.includes('post-lab'))
    )

    const items: any[] = (svc.service_items || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
    const firstItem = items[0] || {}
    const coverMedia = svc.cover_media
    let videoUrl: string | undefined = undefined
    let imagePlaceholder: string = canonical?.imagePlaceholder || '/brand/hero-mockup-gold.png'

    if (coverMedia) {
      if (coverMedia.media_type === 'video') {
        videoUrl = getVideoUrl(coverMedia)
        imagePlaceholder = coverMedia.thumbnail_url || canonical?.imagePlaceholder || getMediaUrl(coverMedia)
      } else {
        // User assigned an image: show image, DO NOT play a video over it!
        imagePlaceholder = getMediaUrl(coverMedia)
        videoUrl = undefined
      }
    } else {
      // Fallback strictly to localhost canonical configuration
      videoUrl = canonical?.videoUrl || LEGACY_SERVICE_VIDEOS[svc.slug] || undefined
      imagePlaceholder = canonical?.imagePlaceholder || '/brand/hero-mockup-gold.png'
    }

    const capabilities = items.length > 0
      ? items.map((i: any) => i.title).filter(Boolean)
      : (canonical?.capabilities || [])

    const tagline = svc.short_description || firstItem.description || canonical?.tagline || ''
    const description = svc.description || canonical?.description || ''
    const category = svc.category || canonical?.category || (svc.title ? svc.title.toUpperCase() : 'STUDIO DISCIPLINE')

    return {
      id: svc.slug,
      number: String(index + 1).padStart(2, '0'),
      title: svc.title || canonical?.title || '',
      tagline,
      description,
      category,
      videoUrl,
      imagePlaceholder,
      capabilities,
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
