import { MetadataRoute } from 'next'
import { getAllPages, getProjects, getJournalPosts } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://centuryimagery.com'

  // Fetch all dynamic content
  const pages = await getAllPages()
  const projects = await getProjects()
  const journalPosts = await getJournalPosts()

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Dynamic pages (from the pages table)
  // Note: we exclude about/services/home if they are handled above, but if they are dynamically updated, they can have their lastModified mapped
  const dynamicPages = pages
    .filter(page => !['home', 'about', 'services', 'booking'].includes(page.slug))
    .map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(), // If we had updated_at we would use it here
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Projects
  const projectRoutes = projects.map(project => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Journal Posts
  const journalRoutes = journalPosts.map(post => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...dynamicPages, ...projectRoutes, ...journalRoutes]
}
