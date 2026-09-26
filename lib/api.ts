import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import type { Project, ServiceItem, JournalArticle, ProjectCategory } from '@/data/types'

/**
 * Data Access Layer for Public Website
 * 
 * Functions here retrieve *only* published content and should be used
 * exclusively by public-facing Next.js pages.
 */

// --- PAGE & SITE SETTINGS ---
export const getSiteSettings = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*').single()
  if (error) return null
  return data
})

export const getPageBySlug = cache(async (slug: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).eq('status', 'published').single()
  if (error) return null
  return data
})

// --- PROJECTS ---
function mapProject(dbProject: any): Project {
  return {
    slug: dbProject.slug,
    title: dbProject.title,
    category: dbProject.category as ProjectCategory,
    year: dbProject.year,
    client: dbProject.client,
    location: dbProject.location,
    shortDescription: dbProject.short_description || '',
    fullDescription: dbProject.full_description || '',
    story: dbProject.story || undefined,
    heroImage: dbProject.hero_image_url || '/placeholder.jpg',
    heroVideo: dbProject.hero_video_url || undefined,
    gallery: dbProject.gallery_urls || [],
    services: dbProject.services || [],
    credits: dbProject.credits || [],
    featured: dbProject.featured,
  }
}

export const getProjects = cache(async (limit?: number): Promise<Project[]> => {
  const supabase = await createClient()
  let query = supabase.from('projects').select('*').eq('status', 'published').order('sort_order', { ascending: true }).order('created_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error || !data) return []
  return data.map(mapProject)
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).eq('status', 'published').single()
  if (error || !data) return null
  return mapProject(data)
})

// --- SERVICES ---
export const getServices = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('services').select('*, service_items(*)').eq('status', 'published').order('sort_order', { ascending: true })
  if (error || !data) return []
  
  return data.map((svc: any, index: number) => {
    // If a service has multiple items, we can combine them, or just take the first one for the main description/capabilities
    // Actually, the old format didn't have nested items, it just had capabilities directly.
    // Let's aggregate capabilities from service_items, or just use the first item.
    const items = svc.service_items || [];
    const firstItem = items[0] || {};
    
    return {
      id: svc.slug,
      number: `0${index + 1}`.slice(-2),
      title: svc.title,
      tagline: firstItem.tagline || '',
      description: svc.description || '',
      videoUrl: undefined, // DB doesn't have video URL for services natively yet, fallback to image
      imagePlaceholder: svc.cover_image_url || '/services/film-cinema.jpg',
      capabilities: items.map((i: any) => i.title) // Use item titles as capabilities, or combine them
    }
  })
})

// --- JOURNAL ---
function mapJournalArticle(dbPost: any): JournalArticle {
  return {
    slug: dbPost.slug,
    title: dbPost.title,
    category: dbPost.category || "Behind The Scenes",
    date: new Date(dbPost.published_at || dbPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: dbPost.read_time || '5 min read',
    excerpt: dbPost.excerpt || '',
    content: dbPost.content?.blocks ? dbPost.content.blocks.map((b: any) => b.data?.text || b.data?.html || '').filter(Boolean) : [],
    coverImage: dbPost.cover_image_url || '/placeholder.jpg',
    author: dbPost.author || 'Century Imagery',
    featured: dbPost.featured,
    pullQuote: dbPost.pull_quote || undefined,
    cameraSpecs: dbPost.camera_specs || undefined,
  }
}

export const getJournalPosts = cache(async (limit?: number): Promise<JournalArticle[]> => {
  const supabase = await createClient()
  let query = supabase.from('journal_posts').select('*').eq('status', 'published').order('published_at', { ascending: false, nullsFirst: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error || !data) return []
  return data.map(mapJournalArticle)
})

export const getJournalPostBySlug = cache(async (slug: string): Promise<JournalArticle | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('journal_posts').select('*').eq('slug', slug).eq('status', 'published').single()
  if (error || !data) return null
  return mapJournalArticle(data)
})
