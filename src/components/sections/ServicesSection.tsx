import Link from 'next/link'

interface Package {
  id: number
  name: string
  description: string | null
  price: number | null
  features: string[]
  icon?: string | null
}

interface Props {
  packages: Package[]
  showCta?: boolean
}

function formatPrice(price: number) {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

const icons = [
  'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
  'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
]

export function ServicesSection({ packages, showCta = false }: Props) {
  if (packages.length === 0) return null

  return (
    <section style={{ padding: '6rem 1.5rem 8rem', background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="section-title">Our Services</h2>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Tailored videography solutions for every need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={pkg.id} className="service-card" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '2rem', cursor: 'pointer', transition: 'all 0.4s ease',
            }}>
              <style>{`
                .service-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(234, 88, 12, 0.15); transform: translateY(-4px); }
              `}</style>
              {!showCta && (
                <div style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', background: 'rgba(234, 88, 12, 0.1)' }}>
                  <svg className="w-7 h-7" style={{ color: 'var(--orange)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icons[i % 3]} />
                  </svg>
                </div>
              )}
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '0.75rem' }}>{pkg.name}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: pkg.price ? '1.5rem' : '0', lineHeight: 1.7 }}>{pkg.description}</p>
              {pkg.price && (
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--orange)', marginBottom: '1.5rem' }}>{formatPrice(pkg.price)}</p>
              )}
              {!showCta && pkg.features.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  {pkg.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--muted)', fontSize: '0.9rem', padding: '0.4rem 0' }}>
                      <svg className="w-4 h-4" style={{ color: 'var(--orange)', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {!showCta && (
                <Link href="/contact" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Inquire Now</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
