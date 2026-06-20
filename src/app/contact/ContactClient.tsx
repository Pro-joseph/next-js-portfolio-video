'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitContact } from './actions'

interface CategoryItem { id: number; name: string }
interface PackageItem { id: number; name: string; description: string | null; price: number | null; features: string[] }

interface Props {
  email: string
  phone: string
  categories: CategoryItem[]
  packages: PackageItem[]
}

function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add('in-view'), delay); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref} className={`section-fade ${className}`}>{children}</div>
}

export function ContactClient({ email, phone, categories, packages }: Props) {
  const [state, formAction, pending] = useActionState(submitContact, null)

  return (
    <div style={{ padding: '10rem 1.5rem 6rem' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <FadeSection>
          <div>
            <div className="accent-line" />
            <h1 className="section-title" style={{ marginBottom: '1rem' }}>Get in Touch</h1>
            <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>Have a project in mind? Let&apos;s discuss how we can bring your vision to life.</p>

            {state?.success && (
              <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--orange)', color: 'var(--orange)', background: 'rgba(234, 88, 12, 0.1)' }}>
                Thank you! We&apos;ll get back to you soon.
              </div>
            )}

            {state?.error && (
              <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
                {state.error}
              </div>
            )}

            <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>Name *</label>
                <input type="text" name="name" required className="input-pf" placeholder="Your name" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>Email *</label>
                <input type="email" name="email" required className="input-pf" placeholder="your@email.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>Project Type</label>
                <select name="categoryId" className="input-pf">
                  <option value="">Select project type</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>Subject</label>
                <input type="text" name="subject" className="input-pf" placeholder="Project subject (optional)" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>Message *</label>
                <textarea name="body" rows={6} required className="input-pf" style={{ resize: 'vertical' }} placeholder="Tell us about your project..." />
              </div>
              <button type="submit" disabled={pending} className="btn-primary" style={{ justifyContent: 'center' }}>
                {pending ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`mailto:${email}`} style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {email}
              </a>
              <a href={`tel:${phone}`} style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {phone}
              </a>
            </div>
          </div>
        </FadeSection>

        <FadeSection delay={200}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '2rem' }}>Our Services</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {packages.length > 0 ? packages.map(pkg => (
                <div key={pkg.id} className="service-card" style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '1.5rem', cursor: 'pointer', transition: 'all 0.4s ease',
                }}>
                  <style>{`.service-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6); }`}</style>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '0.03em' }}>{pkg.name}</h3>
                    {pkg.price && <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--orange)' }}>${pkg.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{pkg.description}</p>
                  {pkg.features.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {pkg.features.slice(0, 3).map((f, fi) => (
                        <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.85rem', padding: '0.25rem 0' }}>
                          <svg className="w-4 h-4" style={{ color: 'var(--orange)', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )) : (
                <p style={{ color: 'var(--muted)' }}>No services available.</p>
              )}
            </div>
          </div>
        </FadeSection>
      </div>
    </div>
  )
}
