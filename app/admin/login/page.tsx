import { LoginForm } from './LoginForm'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Admin Login | Century Imagery',
  robots: 'noindex, nofollow',
}

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Ensure users who are already logged in are redirected to the admin panel
  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple-glow/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-surface-elevated/40 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full mb-12 text-center">
        <h1 className="text-3xl tracking-editorial font-display font-light text-brand-cream uppercase">
          Century<br />Imagery
        </h1>
      </div>

      <div className="z-10 w-full">
        <LoginForm />
      </div>
    </div>
  )
}
