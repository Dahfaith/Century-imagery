import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import { PageListActions } from './components/PageActions'

export const dynamic = 'force-dynamic'

export default async function PagesPage() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { data: pages, error } = await (supabase.from('pages') as any)
    .select('id, title, slug, status, updated_at')
    .order('title', { ascending: true })

  if (error) {
    return <div className="p-8 text-red-500">Error loading pages: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-medium text-brand-cream">Structured Pages</h1>
        <p className="text-brand-muted mt-2">Manage content for core website pages using safe, structured schemas.</p>
      </div>

      <PageListActions pagesCount={pages?.length || 0} />

      {pages && pages.length > 0 && (
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden shadow-2xl mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface-card border-b border-brand-border">
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Page Title</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Slug / Route</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Last Updated</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {pages.map((page: any) => (
                <tr key={page.id} className="hover:bg-brand-surface-card/50 transition-colors">
                  <td className="p-4 font-medium text-brand-cream">
                    {page.title}
                  </td>
                  <td className="p-4 text-brand-muted font-mono text-sm">
                    /{page.slug === 'home' ? '' : page.slug}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      page.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-brand-border text-brand-muted'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="p-4 text-brand-muted text-sm">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/admin/pages/${page.slug}/edit`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-black rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
