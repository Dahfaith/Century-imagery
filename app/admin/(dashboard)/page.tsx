import { createClient } from '@/lib/supabase/server'
import { Film, Briefcase, BookOpen, Calendar } from 'lucide-react'

export default async function DashboardOverview() {
  const supabase = await createClient()

  // Fetch real counts from the database securely
  const [
    { count: projectsCount },
    { count: servicesCount },
    { count: journalCount },
    { count: bookingsCount }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('services').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('journal_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'new')
  ])

  const stats = [
    { name: 'Published Projects', value: projectsCount ?? 0, icon: Film },
    { name: 'Published Services', value: servicesCount ?? 0, icon: Briefcase },
    { name: 'Journal Posts', value: journalCount ?? 0, icon: BookOpen },
    { name: 'New Bookings', value: bookingsCount ?? 0, icon: Calendar },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-medium text-brand-cream">Overview</h1>
        <p className="text-brand-muted mt-2">Welcome to the Century Imagery Admin Dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-brand-surface-card border border-brand-border rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Icon className="w-24 h-24 text-brand-cream" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="p-2 bg-brand-surface-elevated rounded-lg border border-brand-border text-brand-gold">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm font-medium text-brand-muted relative z-10">{stat.name}</p>
              <p className="text-3xl font-display font-medium text-brand-cream mt-1 relative z-10">{stat.value}</p>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}
