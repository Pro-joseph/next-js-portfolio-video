interface Testimonial {
  id: number
  clientName: string
  body: string
  serviceType: string | null
}

interface Props {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: Props) {
  if (testimonials.length === 0) return null

  return (
    <section style={{ padding: '6rem 1.5rem 8rem' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="section-title">Client Stories</h2>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>What our clients say about working with us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '2rem', transition: 'all 0.4s ease',
            }}>
              <style>{`
                .testimonial-card:hover { border-color: rgba(234, 88, 12, 0.3); }
              `}</style>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>&ldquo;{t.body}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, background: 'var(--orange)' }}>
                  {t.clientName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: 'var(--text)' }}>{t.clientName}</p>
                  {t.serviceType && <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{t.serviceType}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
