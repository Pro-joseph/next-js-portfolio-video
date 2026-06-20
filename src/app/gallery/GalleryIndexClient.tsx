'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface ClientItem {
  id: number
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  imagesCount: number
}

interface Props {
  clients: ClientItem[]
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

export function GalleryIndexClient({ clients }: Props) {
  return (
    <div style={{ padding: '10rem 1.5rem 6rem' }}>
      <div className="max-w-7xl mx-auto">
        <div className="section-fade text-center" style={{ marginBottom: '4rem' }}>
          <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
          <h1 className="section-title">Client Gallery</h1>
          <p style={{ color: 'var(--muted)' }}>Browse our portfolio of work organized by client</p>
        </div>

        {clients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, i) => (
              <Link key={client.id} href={`/gallery/${client.slug}`} className="gallery-card" style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                transition: 'all 0.4s ease', cursor: 'pointer', textDecoration: 'none', display: 'block',
              }}>
                <style>{`
                  .gallery-card:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6); transform: translateY(-4px); }
                `}</style>
                <FadeSection>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}>
                    {client.logoUrl ? (
                      <img src={client.logoUrl} alt={client.name} className="w-full h-full object-contain p-8" style={{ transition: 'transform 0.6s ease' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(234, 88, 12, 0.05)' }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', color: 'rgba(234, 88, 12, 0.3)' }}>{client.name.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(234, 88, 12, 0.9)', opacity: 0, transition: 'opacity 0.3s ease',
                    }} className="gallery-hover-overlay">
                      <style>{`.gallery-card:hover .gallery-hover-overlay { opacity: 1; }`}</style>
                      <div style={{ color: 'white', textAlign: 'center' }}>
                        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.03em' }}>{client.imagesCount} images</p>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Click to view</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: 'var(--orange)', letterSpacing: '0.03em' }}>{client.name}</h3>
                    {client.description && <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{client.description}</p>}
                  </div>
                </FadeSection>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--muted)' }}>No gallery clients yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
