import Link from 'next/link'

interface Props {
  siteName?: string
  social?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
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
            <div className="flex gap-3 mt-6">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--muted)' }}><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" /></svg>
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--muted)' }}><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7,1.28.07,1.69.07,4.95.07s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,8.33,24,7.92,24,12s0,3.67-.07,4.95c-.2,4.27-2.71,6.78-7,7-1.28.07-1.69.07-4.95.07V0Z" /></svg>
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--muted)' }}><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.5,3.5,12,3.5,12,3.5s-7.5,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.6,31.6,0,0,0,0,12a31.6,31.6,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14C4.5,20.5,12,20.5,12,20.5s7.5,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.6,31.6,0,0,0,24,12,31.6,31.6,0,0,0,23.5,6.19ZM9.75,15.02V8.98L15.5,12Z" /></svg>
                </a>
              )}
            </div>
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
