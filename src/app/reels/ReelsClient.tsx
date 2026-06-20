'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface ReelItem {
  id: number
  title: string
  thumbnail: string
  slug: string
}

interface Props {
  reels: ReelItem[]
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`card-fade ${className}`}>{children}</div>
}

export function ReelsClient({ reels }: Props) {
  return (
    <div style={{ padding: '10rem 1.5rem 6rem' }}>
      <div className="max-w-7xl mx-auto">
        <div className="section-fade" style={{ marginBottom: '4rem' }}>
          <div className="accent-line" />
          <h1 className="section-title">Reels</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 480 }}>Short-form video highlights from our latest projects.</p>
        </div>

        {reels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reels.map((reel, i) => (
              <Link key={reel.id} href={`/portfolio/${reel.slug}`} className="reel-card" style={{
                position: 'relative', overflow: 'hidden', background: 'var(--surface)', border: '1px solid var(--border)',
                transition: 'all 0.4s ease', cursor: 'pointer', textDecoration: 'none', display: 'block',
              }}>
                <style>{`
                  .reel-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(234, 88, 12, 0.15); transform: translateY(-4px); }
                  .reel-play {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%) scale(0.7);
                    width: 72px; height: 72px; border-radius: 50%;
                    background: rgba(234, 88, 12, 0.9);
                    display: flex; align-items: center; justify-content: center;
                    opacity: 0; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 3;
                    backdrop-filter: blur(4px);
                  }
                  .reel-play::before {
                    content: ''; width: 0; height: 0;
                    border-top: 11px solid transparent; border-bottom: 11px solid transparent;
                    border-left: 18px solid white; margin-left: 4px;
                  }
                  .reel-play::after {
                    content: ''; position: absolute; inset: -8px; border-radius: 50%;
                    border: 1px solid rgba(234, 88, 12, 0.4);
                    animation: ringPulse 2s ease-in-out infinite;
                  }
                  .reel-card:hover .reel-play { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                `}</style>
                <FadeSection>
                  <div style={{ aspectRatio: '9/16', position: 'relative', overflow: 'hidden' }}>
                    <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" style={{ transition: 'transform 0.6s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--overlay-bg) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem' }}>
                      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: 'white', letterSpacing: '0.03em' }}>{reel.title}</h3>
                    </div>
                    <div className="reel-play" />
                  </div>
                </FadeSection>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--muted)' }}>No reels available yet.</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
