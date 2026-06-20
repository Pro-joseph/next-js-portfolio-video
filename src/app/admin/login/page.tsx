'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '2rem' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--orange)', textAlign: 'center', marginBottom: '2rem' }}>
          Admin Login
        </h1>

        {state?.error && (
          <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444', fontSize: '0.9rem' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="email" name="email" required placeholder="Email" className="input-pf" />
          <input type="password" name="password" required placeholder="Password" className="input-pf" />
          <button type="submit" disabled={pending} className="btn-primary" style={{ justifyContent: 'center' }}>
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
