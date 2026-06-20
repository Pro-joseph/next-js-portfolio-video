import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getImagesFromJson } from '@/lib/utils'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Oumalk — our team, our story, and our passion for visual storytelling',
}

export default async function AboutPage() {
  const [sections, testimonials, packages, settings] = await Promise.all([
    prisma.pageSection.findMany({
      where: { isVisible: true, key: { in: ['about', 'stats'] } },
    }),
    prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.package.findMany({
      where: { isActive: true },
    }),
    prisma.siteSetting.findMany({
      where: { group: 'stats', isVisible: true },
    }),
  ])

  const about = sections.find(s => s.key === 'about')
  const stats: Record<string, string> = {}
  for (const s of settings) {
    if (s.value) stats[s.key] = s.value
  }

  const defaultStats = { experience: '15+', projects: '200+', clients: '150+', awards: '50+' }

  return (
    <div style={{ padding: '10rem 1.5rem 6rem' }}>
      <div className="max-w-7xl mx-auto">
        {about && (
          <ScrollReveal as="div" className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
            <div>
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  {(() => { const imgs = getImagesFromJson(about.imagePath); return imgs[0] })() ? (
                    <img src={getImagesFromJson(about.imagePath)[0]} alt="About Us" className="w-full h-full object-cover" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="About Us" className="w-full h-full object-cover" />
                  )}
                </div>
                <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '8rem', height: '8rem', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', textAlign: 'center', lineHeight: 1.1 }}>5+<br />Years</span>
                </div>
              </div>
            </div>
            <div>
              {about.title && (
                <>
                  <div className="accent-line" />
                  <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>{about.title}</h1>
                </>
              )}
              {about.body && <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>{about.body}</p>}
              <Link href="/contact" className="btn-primary">Work With Us</Link>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal as="section" className="" style={{ marginBottom: '6rem', padding: '3rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { key: 'experience', label: 'Years Experience' },
              { key: 'projects', label: 'Projects' },
              { key: 'clients', label: 'Clients' },
              { key: 'awards', label: 'Awards' },
            ].map(stat => {
              const value = stats[stat.key] || (defaultStats as Record<string, string>)[stat.key]
              return (
                <div key={stat.key} className="stat-card" style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.4s ease',
                }}>
                  <style>{`.stat-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6); transform: translateY(-4px); }`}</style>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', color: 'var(--orange)', lineHeight: 1 }}>{value}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{stat.label}</p>
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        {packages.length > 0 && (
          <ScrollReveal as="section" style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
              <h2 className="section-title">Our Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className="service-card" style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '2rem', cursor: 'pointer', transition: 'all 0.4s ease',
                }}>
                  <style>{`.service-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6); transform: translateY(-4px); }`}</style>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.75rem' }}>{pkg.name}</h3>
                  <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>{pkg.description}</p>
                  {pkg.price && (
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--orange)' }}>${pkg.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {testimonials.length > 0 && (
          <ScrollReveal as="section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
              <h2 className="section-title">What Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="testimonial-card" style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '2rem', position: 'relative', transition: 'all 0.4s ease',
                }}>
                  <style>{`
                    .testimonial-card:hover { border-color: rgba(234, 88, 12, 0.3); }
                    .testimonial-card::before {
                      content: '"'; position: absolute; top: 1rem; left: 1.5rem;
                      font-family: 'Bebas Neue', sans-serif; font-size: 4rem;
                      color: var(--orange); opacity: 0.15; line-height: 1;
                    }
                  `}</style>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>&ldquo;{t.body}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, background: 'var(--orange)' }}>
                      {t.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--text)' }}>{t.clientName}</p>
                      {t.serviceType && <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{t.serviceType}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}
