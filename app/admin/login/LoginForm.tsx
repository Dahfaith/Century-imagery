'use client'

import { useActionState } from 'react'
import { login } from '../actions'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const initialState = {
  error: null as string | null,
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await login(formData)
      return { error: result?.error || null }
    },
    initialState
  )
  
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-brand-surface border border-brand-border/50 shadow-2xl relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-50" />
      
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-display font-medium text-brand-cream mb-2">Admin Portal</h2>
        <p className="text-brand-muted text-sm font-sans">
          Sign in to access the Century Imagery CMS.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-sans animate-fade-in text-center">
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-colors font-sans text-sm"
            placeholder="admin@centuryimagery.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block" htmlFor="password">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-colors font-sans text-sm pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-cream transition-colors p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand-cream text-brand-black font-medium py-3 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-sans disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/" className="text-brand-muted hover:text-brand-cream text-xs font-sans transition-colors inline-flex items-center space-x-2">
          <span>&larr; Back to Website</span>
        </Link>
      </div>
    </div>
  )
}
