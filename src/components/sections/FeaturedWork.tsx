'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface ProjectCard {
  id: number
  title: string
  coverImage: string | null
  categoryName?: string
  slug: string
}

interface Props {
  projects: ProjectCard[]
}

function ProjectCard({ project, index }: { project: ProjectCard; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function onMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current!.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current!.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.01)`
  }

  function onMouseLeave() {
    cardRef.current!.style.transform = ''
  }

  return (
    <Link
      ref={cardRef}
      href={`/portfolio/${project.slug}`}
      className="featured-card"
        style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', display: 'block',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(60px) rotateX(8deg)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.4s ease',
          transformStyle: 'preserve-3d', perspective: 1000,
          transitionDelay: `${index * 100}ms`,
        }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <style>{`
        .featured-card:hover {
          border-color: rgba(234, 88, 12, 0.3);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(234, 88, 12, 0.15), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .featured-card-media { position: relative; overflow: hidden; aspect-ratio: 16/10; }
        .featured-card-media img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1), filter 0.5s ease;
          display: block;
        }
        .featured-card:hover .featured-card-media img { transform: scale(1.08); filter: brightness(0.75); }
        .featured-card-glare {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none; z-index: 2;
        }
        .featured-card:hover .featured-card-glare { opacity: 1; }
        .featured-play {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(234, 88, 12, 0.9);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 3; backdrop-filter: blur(4px);
        }
        .featured-play::before {
          content: ''; width: 0; height: 0;
          border-top: 11px solid transparent; border-bottom: 11px solid transparent;
          border-left: 18px solid white; margin-left: 4px;
        }
        .featured-play::after {
          content: ''; position: absolute; inset: -8px; border-radius: 50%;
          border: 1px solid rgba(234, 88, 12, 0.4);
          animation: ringPulse 2s ease-in-out infinite;
        }
        .featured-card:hover .featured-play { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      `}</style>
      <div className="featured-card-media">
        <img src={project.coverImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80'} alt={project.title} loading="lazy" />
        <div className="featured-card-glare" />
        <div className="featured-play" />
      </div>
      <div style={{ padding: '1.25rem 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem', height: 1, background: 'var(--border)' }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '0.25rem' }}>
          {project.categoryName || 'Project'}
        </p>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: 'var(--text)', letterSpacing: '0.03em', lineHeight: 1 }}>{project.title}</h3>
      </div>
    </Link>
  )
}

export function FeaturedWork({ projects }: Props) {
  return (
    <section style={{ padding: '6rem 1.5rem 8rem' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4rem' }} className="md:flex-row md:justify-between md:items-end">
          <div>
            <div className="accent-line" />
            <h2 className="section-title">Featured Work</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 400, marginTop: '0.5rem' }}>A curated selection of our most impactful projects</p>
          </div>
          <Link href="/portfolio" style={{ color: 'var(--orange)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }} className="md:mt-0">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
