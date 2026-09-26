import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import Link from 'next/link'
import { Plus, Search, Edit3 } from 'lucide-react'
import { DeleteProjectButton, ToggleStatusButton } from './components/ProjectActions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | CMS',
}

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()
  const params = await searchParams

  const search = typeof params.q === 'string' ? params.q : ''
  const category = typeof params.category === 'string' ? params.category : ''
  const status = typeof params.status === 'string' ? params.status : ''

  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    // using or to search title or client_name
    query = query.or(`title.ilike.%${search}%,client_name.ilike.%${search}%`)
  }
  if (category) {
    query = query.eq('category', category)
  }
  if (status) {
    query = query.eq('status', status)
  }

  const { data: projects } = await (query as any) as { data: any[] | null }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-medium text-brand-cream">Projects</h1>
          <p className="text-sm text-brand-muted mt-1">Manage your portfolio and case studies.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="bg-brand-cream text-brand-black px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:bg-white transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Filters (Server-side powered by simple form) */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl p-4">
        <form className="flex flex-col sm:flex-row gap-4" method="GET" action="/admin/projects">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Search projects or clients..."
              className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream pl-9 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              name="category"
              defaultValue={category}
              className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors min-w-[140px]"
            >
              <option value="">All Categories</option>
              <option value="Commercial">Commercial</option>
              <option value="Cinema">Cinema</option>
              <option value="Luxury Event">Luxury Event</option>
              <option value="Music Visualizers">Music Visualizers</option>
              <option value="Fashion">Fashion</option>
              <option value="Photography">Photography</option>
            </select>

            <select
              name="status"
              defaultValue={status}
              className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors min-w-[120px]"
            >
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <button type="submit" className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg text-sm hover:bg-brand-surface transition-colors">
              Filter
            </button>
            
            {(search || category || status) && (
              <Link href="/admin/projects" className="flex items-center text-sm text-brand-muted hover:text-brand-cream px-2">
                Clear
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="bg-brand-surface-card border border-brand-border rounded-xl overflow-hidden">
        {(!projects || projects.length === 0) ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-surface-elevated rounded-full flex items-center justify-center mb-4 border border-brand-border/50">
              <Search className="w-8 h-8 text-brand-muted" />
            </div>
            <h3 className="text-lg font-medium text-brand-cream mb-1">No projects found</h3>
            <p className="text-sm text-brand-muted mb-4 max-w-sm">
              {search || category || status 
                ? "Try adjusting your filters to find what you're looking for."
                : "Get started by creating your first project."}
            </p>
            {!(search || category || status) && (
              <Link 
                href="/admin/projects/new"
                className="bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:text-brand-gold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-brand-muted">
              <thead className="bg-brand-surface border-b border-brand-border text-xs uppercase text-brand-muted font-medium">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Project</th>
                  <th className="px-6 py-4 whitespace-nowrap">Category / Client</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-brand-surface-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-brand-cream">{project.title}</span>
                        <span className="text-xs text-brand-muted/70 truncate max-w-[200px]">/{project.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-brand-cream">{project.category || '-'}</span>
                        <span className="text-xs">{project.client_name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ToggleStatusButton id={project.id} currentStatus={project.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-brand-muted hover:text-brand-gold p-2 transition-colors"
                          title="Edit project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <DeleteProjectButton id={project.id} title={project.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
