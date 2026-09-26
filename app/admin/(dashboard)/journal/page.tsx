import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import Link from 'next/link'
import { Plus, Edit, Eye } from 'lucide-react'
import { DeletePostButton, SeedJournalButton } from './components/JournalActions'

export const dynamic = 'force-dynamic'

export default async function JournalPage() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  const { data: posts, error } = await (supabase.from('journal_posts') as any)
    .select('id, title, slug, status, featured, author_name, published_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500">Error loading journal articles: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-medium text-brand-cream">Editorial Journal</h1>
          <p className="text-brand-muted mt-2">Manage articles, case studies, and studio updates.</p>
        </div>
        <Link 
          href="/admin/journal/new" 
          className="flex items-center space-x-2 px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Article</span>
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden shadow-2xl mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface-card border-b border-brand-border">
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Article</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Author</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider">Published / Updated</th>
                <th className="p-4 text-sm font-medium text-brand-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-brand-surface-card/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-brand-cream mb-1 flex items-center space-x-2">
                      <span>{post.title}</span>
                      {post.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-gold">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-brand-muted font-mono">/{post.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-brand-border text-brand-muted'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 text-brand-muted">
                    {post.author_name || 'Studio'}
                  </td>
                  <td className="p-4 text-brand-muted text-sm">
                    {post.status === 'published' && post.published_at 
                      ? new Date(post.published_at).toLocaleDateString()
                      : new Date(post.updated_at).toLocaleDateString()
                    }
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <a 
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-brand-muted hover:text-brand-cream hover:bg-brand-border rounded transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <Link 
                        href={`/admin/journal/${post.id}/edit`}
                        className="p-2 text-brand-muted hover:text-brand-gold hover:bg-brand-gold/10 rounded transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <SeedJournalButton postCount={posts?.length || 0} />
      )}
    </div>
  )
}
