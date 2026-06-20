import Link from 'next/link'

interface Props {
  title?: string
  body?: string
  imageUrl?: string | null
}

export function AboutSection({ title, body, imageUrl }: Props) {
  return (
    <section style={{ padding: '6rem 1.5rem 8rem', background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src={imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'}
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '8rem', height: '8rem', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', textAlign: 'center', lineHeight: 1.1 }}>5+<br />Years</span>
            </div>
          </div>
        </div>
        <div>
          <div className="accent-line" />
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>{title || 'About Us'}</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {body || 'We are a team of passionate videographers dedicated to capturing your most precious moments with cinematic excellence.'}
          </p>
          <Link href="/about" className="btn-primary">Learn More</Link>
        </div>
      </div>
    </section>
  )
}
