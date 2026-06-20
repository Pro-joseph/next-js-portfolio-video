'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface ImageItem {
  id: number
  imageUrl: string
  caption: string | null
}

interface Props {
  clientName: string
  slug: string
  description: string | null
  logoUrl: string | null
  images: ImageItem[]
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

export function GalleryShowClient({ clientName, slug, description, logoUrl, images }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null)

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [lightbox])

  return (
    <div style={{ padding: '10rem 1.5rem 6rem' }}>
      <div className="max-w-7xl mx-auto">
        <div className="section-fade text-center" style={{ marginBottom: '3rem' }}>
          {logoUrl && <img src={logoUrl} alt={clientName} style={{ height: '5rem', margin: '0 auto 1.5rem', objectFit: 'contain' }} />}
          <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
          <h1 className="section-title">{clientName}</h1>
          {description && <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>{description}</p>}
          <Link href="/gallery" className="btn-secondary" style={{ marginTop: '2rem', display: 'inline-flex' }}>Back to Gallery</Link>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <FadeSection key={img.id} delay={i * 50}>
                <div
                  className="gallery-image relative group aspect-square cursor-pointer"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.4s ease' }}
                  onClick={() => setLightbox({ src: img.imageUrl, caption: img.caption || '' })}
                >
                  <style>{`
                    .gallery-image:hover { border-color: rgba(234, 88, 12, 0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.6); transform: scale(1.02); }
                  `}</style>
                  <img src={img.imageUrl} alt={img.caption || clientName} className="w-full h-full object-cover" style={{ transition: 'transform 0.6s ease' }} />
                  {img.caption && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--overlay-bg)', opacity: 0, transition: 'opacity 0.3s ease' }} className="gallery-caption-overlay">
                      <style>{`.gallery-image:hover .gallery-caption-overlay { opacity: 1; }`}</style>
                      <p style={{ color: 'white', textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>{img.caption}</p>
                    </div>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--muted)' }}>No images for this client yet.</p>
          </div>
        )}
      </div>

      {lightbox && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--overlay-heavy)', cursor: 'pointer' }}
          onClick={() => setLightbox(null)}
        >
          <button
            style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white', fontSize: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
          >
            &times;
          </button>
          <img src={lightbox.src} alt="" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
          {lightbox.caption && <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem', position: 'absolute', bottom: '2rem' }}>{lightbox.caption}</p>}
        </div>
      )}
    </div>
  )
}
