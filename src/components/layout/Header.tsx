'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  siteName?: string
}

export function Header({ siteName = 'Oumalk' }: Props) {
  const pathname = usePathname()
  const { isLight, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Work' },
    { href: '/reels', label: 'Reels' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ]

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'var(--header-bg)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)', letterSpacing: '0.03em' }}
        >
          {siteName}
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={isActive(link.href) ? { color: 'var(--orange)' } : undefined}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
            aria-label="Toggle theme"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={isLight ? 'M12 3a6 6 0 0 0 9 9 6 6 0 1 1-9-9Z' : 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'} />
            </svg>
          </button>
          <Link href="/contact" className="btn-primary text-sm" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
            Let&apos;s Talk
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
            aria-label="Toggle theme"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={isLight ? 'M12 3a6 6 0 0 0 9 9 6 6 0 1 1-9-9Z' : 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'} />
            </svg>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          style={{ background: 'var(--header-bg)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}
          className="px-6 py-6 flex flex-col gap-5 md:hidden"
        >
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ fontSize: '1.1rem', ...(isActive(link.href) ? { color: 'var(--orange)' } : {}) }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
            Let&apos;s Talk
          </Link>
        </nav>
      )}
    </header>
  )
}
