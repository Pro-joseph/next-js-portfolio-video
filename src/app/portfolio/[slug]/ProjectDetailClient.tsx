'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface MediaItem {
  id: number
  type: string
  videoUrl: string | null
  filePath: string | null
  embedUrl: string | null
  resolvedImage: string | null
}

interface RelatedItem {
  id: number
  title: string
  coverImage: string
  slug: string
}

interface Props {
  title: string
  description: string | null
  createdAt: string
  categoryName: string
  isFeatured: boolean
  isReels: boolean
  media: MediaItem[]
  related: RelatedItem[]
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`section-fade ${className}`}>
      {children}
    </div>
  )
}

export function ProjectDetailClient({ title, description, createdAt, categoryName, isFeatured, isReels, media, related }: Props) {
  const date = new Date(createdAt)
  const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <div style={{ padding: '10rem 1.5rem 6rem' }}>
      <div className="max-w-7xl mx-auto">
        <Link href={isReels ? '/reels' : '/portfolio'} style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to {isReels ? 'Reels' : 'Portfolio'}
        </Link>

        <FadeSection>
          <header style={{ marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 className="section-title" style={{ marginBottom: '1rem' }}>{title}</h1>
            {description && <p style={{ color: 'var(--muted)', maxWidth: 640 }}>{description}</p>}
          </header>
        </FadeSection>

        <FadeSection>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {media.length > 0 ? media.map(m => (
              <div key={m.id}>
                {m.embedUrl ? (
                  <div style={{ aspectRatio: '16/9', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <iframe src={m.embedUrl} className="w-full h-full" frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                  </div>
                ) : m.resolvedImage ? (
                  <img src={m.resolvedImage} className="w-full" alt={title} style={{ border: '1px solid var(--border)' }} />
                ) : null}
              </div>
            )) : (
              <div style={{ aspectRatio: '16/9', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--muted)' }}>No media available.</p>
              </div>
            )}
          </section>
        </FadeSection>

        <FadeSection>
          <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Category</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: 'var(--text)', letterSpacing: '0.03em' }}>{categoryName}</p>
            </div>
            <div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Date</p>
              <p style={{ color: 'var(--text)' }}>{monthYear}</p>
            </div>
            <div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Featured</p>
              <p style={{ color: 'var(--text)' }}>{isFeatured ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </FadeSection>

        {related.length > 0 && (
          <FadeSection>
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--text)', letterSpacing: '0.03em', marginBottom: '2rem' }}>
                {isReels ? 'More Reels' : 'More Projects'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map(r => (
                  <Link key={r.id} href={`/portfolio/${r.slug}`} className="related-card" style={{
                    background: 'var(--surface)', border: '1px solid var(--border)', transition: 'all 0.4s ease',
                    cursor: 'pointer', overflow: 'hidden', textDecoration: 'none', display: 'block',
                  }}>
                    <style>{`
                      .related-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6); transform: translateY(-4px); }
                    `}</style>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={r.coverImage} className="w-full h-full object-cover" alt={r.title} style={{ transition: 'transform 0.6s ease' }} />
                    </div>
                    <div style={{ padding: '1rem 1.25rem' }}>
                      <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--orange)', letterSpacing: '0.03em' }}>{r.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeSection>
        )}
      </div>
    </div>
  )
}
