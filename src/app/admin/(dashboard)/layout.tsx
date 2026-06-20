import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { LogoutButton } from './LogoutButton'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◻' },
  { href: '/admin/projects', label: 'Projects', icon: '▶' },
  { href: '/admin/categories', label: 'Categories', icon: '▣' },
  { href: '/admin/clients', label: 'Clients', icon: '◉' },
  { href: '/admin/gallery-images', label: 'Gallery Images', icon: '▦' },
  { href: '/admin/media', label: 'Media', icon: '▤' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '★' },
  { href: '/admin/packages', label: 'Packages', icon: '◆' },
  { href: '/admin/page-sections', label: 'Page Sections', icon: '▤' },
  { href: '/admin/posts', label: 'Posts', icon: '📄' },
  { href: '/admin/contact-messages', label: 'Messages', icon: '✉' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 260, background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <Link href="/admin" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--orange)', letterSpacing: '0.03em', textDecoration: 'none', marginBottom: '2rem' }}>
          Oumalk Admin
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '0.6rem 0.75rem', color: 'var(--muted)', textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: 20, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <Link href="/" style={{ display: 'block', padding: '0.6rem 0.75rem', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Back to Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main style={{ marginLeft: 260, flex: 1, padding: '2rem' }}>
        {children}
      </main>

    </div>
  )
}
