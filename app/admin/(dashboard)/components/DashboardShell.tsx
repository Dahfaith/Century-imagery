'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Film, 
  Image as ImageIcon, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { logout } from '@/app/admin/actions'

const NAVIGATION = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: Film },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Journal', href: '/admin/journal', icon: BookOpen },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function DashboardShell({ 
  children, 
  userEmail, 
  userName, 
  role 
}: { 
  children: React.ReactNode
  userEmail: string
  userName: string | null
  role: string 
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <h1 className="text-xl font-display font-light text-brand-cream uppercase tracking-editorial">
          Century
        </h1>
        <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider">CMS Admin</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {NAVIGATION.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-brand-surface-elevated text-brand-gold' 
                  : 'text-brand-muted hover:bg-brand-surface hover:text-brand-cream'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-brand-border mt-auto">
        <form action={logout}>
          <button 
            type="submit"
            className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-brand-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-brand-dark flex font-sans text-brand-cream">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-brand-border bg-[#0C0B10]">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0C0B10] border-r border-brand-border transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsMobileOpen(false)} className="p-2 text-brand-muted hover:text-brand-cream">
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-brand-border flex items-center justify-between px-4 md:px-8 bg-brand-surface/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-brand-muted hover:text-brand-cream mr-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-display font-medium text-brand-cream md:hidden">
              Century CMS
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-brand-cream">{userName || userEmail}</p>
              <p className="text-xs text-brand-gold capitalize">{role.replace('_', ' ')}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-surface-card border border-brand-border flex items-center justify-center text-brand-gold font-medium">
              {(userName || userEmail).charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-brand-dark">
          {children}
        </main>
      </div>
    </div>
  )
}
