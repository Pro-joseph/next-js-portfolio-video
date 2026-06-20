'use client'

import { logoutAction } from './actions'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        style={{ padding: '0.6rem 0.75rem', color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, width: '100%', textAlign: 'left' }}
      >
        ← Logout
      </button>
    </form>
  )
}
