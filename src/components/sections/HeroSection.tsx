'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  title?: string
  body?: string
  images: string[]
}

export function HeroSection({ title, body, images }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <style>{`
        .hero-section::before {
          content: 'CINEMA';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -55%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(8rem, 22vw, 20rem);
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
          letter-spacing: 0.05em;
        }
        .slide {
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }
        .slide.active { opacity: 1; z-index: 1; }
        .slide img { width: 100%; height: 100%; object-fit: cover; }
        .slide::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%);
        }
        @media (max-width: 768px) {
          .slide img { object-position: center 30%; }
          .slide::after { background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.92) 100%); }
        }
      `}</style>

      <div className="hero-slider" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {images.length > 0 ? (
          images.map((img, i) => (
            <div key={i} className={`slide ${i === current ? 'active' : ''}`}>
              <img src={img} alt={`Hero ${i + 1}`} />
            </div>
          ))
        ) : (
          <div className="slide active" style={{ background: 'linear-gradient(135deg, var(--bg) 0%, var(--surface) 100%)' }} />
        )}
      </div>

      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '6rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: '0.75rem' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="hero-dot"
              style={{
                width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                background: i === current ? 'var(--orange)' : 'rgba(255,255,255,0.3)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="hero-content" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '8rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '48rem' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--orange)',
            display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem',
            opacity: 0, transform: 'translateY(20px)',
            animation: 'fadeUp 0.8s ease forwards 0.2s',
          }}>
            <span style={{ width: 40, height: 1, background: 'var(--orange)', display: 'inline-block' }} />
            Professional Videography
          </p>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: 0.9,
            color: 'var(--text)', letterSpacing: '0.02em', marginBottom: '2rem',
            opacity: 0, transform: 'translateY(30px)',
            animation: 'fadeUp 0.9s ease forwards 0.35s',
          }}>
            {title || 'Cinematic'}<br /><span style={{ color: 'transparent', WebkitTextStroke: '1px var(--orange)' }}>Stories</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
            color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7, marginBottom: '2.5rem',
            opacity: 0, transform: 'translateY(20px)',
            animation: 'fadeUp 0.9s ease forwards 0.5s',
          }}>
            {body || 'We transform your moments into compelling visual narratives that resonate with your audience and leave lasting impressions.'}
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            opacity: 0, transform: 'translateY(20px)',
            animation: 'fadeUp 0.9s ease forwards 0.65s',
          }}>
            <Link href="/portfolio" className="btn-primary">
              <span>View Our Work</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/contact" className="btn-secondary">Get In Touch</Link>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em',
        opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.8s',
      }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--muted), transparent)', animation: 'scrollLine 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
