import Link from 'next/link'

interface Props {
  title?: string
  body?: string
  buttonText?: string
  buttonLink?: string
}

export function CTASection({ title, body, buttonText, buttonLink }: Props) {
  return (
    <section style={{ padding: '6rem 1.5rem', background: 'var(--orange)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9, color: 'white', marginBottom: '1.5rem' }}>
          {title || 'Ready to Create Something Amazing?'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
          {body || 'Let\'s discuss your project and bring your vision to life.'}
        </p>
        <Link href={buttonLink || "/contact"} className="btn-primary" style={{ background: 'white', color: 'var(--orange)' }}>
          <span>{buttonText || "Get in Touch"}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </section>
  )
}
