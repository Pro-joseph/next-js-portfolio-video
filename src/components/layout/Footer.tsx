import Link from 'next/link'
import { SocialLinks, SocialLinksMap } from '@/components/ui/SocialLinks'

interface Props {
  siteName?: string
  social?: SocialLinksMap
  contact?: {
    email?: string
    phone?: string
  }
  copyright?: string
}

export function Footer({ siteName = 'Oumalk', social = {}, contact = {}, copyright = '© 2026 Oumalk. All rights reserved.' }: Props) {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '4rem 1.5rem 2rem' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)', letterSpacing: '0.03em' }}>
              {siteName}
            </h3>
            <p style={{ color: 'var(--muted)', maxWidth: 400, lineHeight: 1.7 }}>
              Professional videography services for life&apos;s most precious moments. We transform your stories into cinematic experiences.
            </p>
            <SocialLinks social={social} className="mt-6" />
          </div>

          <div>
            <h4 className="mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)', letterSpacing: '0.03em', fontSize: '1.2rem' }}>Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>Home</Link>
              <Link href="/portfolio" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>Work</Link>
              <Link href="/about" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>About</Link>
              <Link href="/contact" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)', letterSpacing: '0.03em', fontSize: '1.2rem' }}>Services</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/contact" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>Cinematography</Link>
              <Link href="/contact" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>Video Production</Link>
              <Link href="/contact" className="nav-link" style={{ textTransform: 'none', fontSize: '0.9rem' }}>Post-Production</Link>
            </nav>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="md:flex-row md:justify-between md:items-center">
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{copyright}</p>
          <div className="flex gap-6">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="nav-link" style={{ textTransform: 'none', fontSize: '0.85rem' }}>{contact.email}</a>
            )}
            {contact.phone && (
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{contact.phone}</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
