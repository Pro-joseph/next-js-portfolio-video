'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface ProjectItem {
  id: number
  title: string
  coverImage: string
  categorySlug: string
  categoryName: string
  slug: string
}

interface CategoryItem {
  id: number
  name: string
  slug: string
}

interface Props {
  projects: ProjectItem[]
  categories: CategoryItem[]
}

function useTiltCard<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el!.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.01)`
    }

    function onMouseLeave() {
      el!.style.transform = ''
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return ref
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useTiltCard<HTMLAnchorElement>()
  const [visible, setVisible] = useState(false)
  const observerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delay = index * 80

  return (
    <Link
      ref={node => {
        (cardRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node
        ;(observerRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node
      }}
      href={`/portfolio/${project.slug}`}
      className="pf-card"
      data-category={project.categorySlug}
      style={{
        position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)',
        overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', display: 'block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) rotateX(0deg)' : 'translateY(60px) rotateX(8deg)',
        transition: `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.4s ease`,
        transformStyle: 'preserve-3d', perspective: 1000, borderRadius: 2,
        transitionDelay: visible ? `${delay}ms` : '0ms',
      }}
    >
      <style>{`
        .pf-card:nth-child(3n+1) { grid-column: span 7; }
        .pf-card:nth-child(3n+2) { grid-column: span 5; }
        .pf-card:nth-child(3n+3) { grid-column: span 12; }
        @media (max-width: 900px) { .pf-card:nth-child(n) { grid-column: span 12; } }
        .pf-card:hover {
          border-color: rgba(234, 88, 12, 0.3);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(234, 88, 12, 0.15), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .pf-card-media { position: relative; overflow: hidden; width: 100%; }
        .pf-card:nth-child(3n+1) .pf-card-media { aspect-ratio: 16/10; }
        .pf-card:nth-child(3n+2) .pf-card-media { aspect-ratio: 4/5; }
        .pf-card:nth-child(3n+3) .pf-card-media { aspect-ratio: 21/9; }
        .pf-card-media img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1), filter 0.5s ease;
          display: block;
        }
        .pf-card:hover .pf-card-media img { transform: scale(1.08); filter: brightness(0.75); }
        .pf-card-glare {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none; z-index: 2;
        }
        .pf-card:hover .pf-card-glare { opacity: 1; }
        .pf-play {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(234, 88, 12, 0.9);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 3; backdrop-filter: blur(4px);
        }
        .pf-play::before {
          content: ''; width: 0; height: 0;
          border-top: 11px solid transparent; border-bottom: 11px solid transparent;
          border-left: 18px solid white; margin-left: 4px;
        }
        .pf-play::after {
          content: ''; position: absolute; inset: -8px; border-radius: 50%;
          border: 1px solid rgba(234, 88, 12, 0.4);
          animation: ringPulse 2s ease-in-out infinite;
        }
        .pf-card:hover .pf-play { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      `}</style>
      <div className="pf-card-media">
        <img src={project.coverImage} alt={project.title} loading="lazy" />
        <div className="pf-card-glare" />
        <div className="pf-play" />
      </div>
      <div className="pf-card-info" style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', background: 'var(--surface)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '1.75rem', right: '1.75rem', height: 1, background: 'var(--border)' }} />
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '0.4rem' }}>{project.categoryName}</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: 'var(--text)', letterSpacing: '0.03em', lineHeight: 1 }}>{project.title}</h2>
        </div>
        <div style={{ width: 36, height: 36, border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease', color: 'var(--muted)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export function PortfolioClient({ projects, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('')
  const [visibleCount, setVisibleCount] = useState(projects.length)

  function handleFilter(categorySlug: string) {
    setActiveCategory(categorySlug)
    const cards = document.querySelectorAll<HTMLElement>('.pf-card')
    let count = 0
    cards.forEach(card => {
      const match = categorySlug === '' || card.dataset.category === categorySlug
      if (match) {
        card.style.display = 'block'
        card.style.opacity = '1'
        card.style.transform = ''
        count++
      } else {
        card.style.opacity = '0'
        card.style.transform = 'translateY(30px)'
        setTimeout(() => { card.style.display = 'none' }, 350)
      }
    })
    setVisibleCount(count)
  }

  return (
    <div className="pf-page" style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes ringPulse { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.3); opacity: 0; } }
        .pf-page::after {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 100; opacity: 0.4;
        }
        .filter-pill {
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.55rem 1.4rem; border: 1px solid var(--border);
          background: transparent; color: var(--muted); cursor: pointer;
          border-radius: 100px; transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .filter-pill::before {
          content: ''; position: absolute; inset: 0;
          background: var(--orange); transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); border-radius: inherit; z-index: -1;
        }
        .filter-pill:hover, .filter-pill.active { color: white; border-color: var(--orange); }
        .filter-pill:hover::before, .filter-pill.active::before { transform: scaleX(1); }
      `}</style>

      <section style={{ padding: '10rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(8rem, 22vw, 20rem)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 0, letterSpacing: '0.05em' }}>
          WORK
        </div>
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', opacity: 0, transform: 'translateY(20px)', animation: 'fadeUp 0.8s ease forwards 0.2s' }}>
            <span style={{ width: 40, height: 1, background: 'var(--orange)' }} />
            Selected Work
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: 0.9, color: 'var(--text)', letterSpacing: '0.02em', marginBottom: '2rem', opacity: 0, transform: 'translateY(30px)', animation: 'fadeUp 0.9s ease forwards 0.35s' }}>
            Cinematic<br /><span style={{ color: 'transparent', WebkitTextStroke: '1px var(--orange)' }}>Stories</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7, opacity: 0, transform: 'translateY(20px)', animation: 'fadeUp 0.9s ease forwards 0.5s' }}>
            A curated collection of our finest work — from intimate weddings to large-scale productions.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem 4rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.7s' }}>
          <button className={`filter-pill ${activeCategory === '' ? 'active' : ''}`} onClick={() => handleFilter('')}>All</button>
          {categories.map(c => (
            <button key={c.slug} className={`filter-pill capitalize ${activeCategory === c.slug ? 'active' : ''}`} onClick={() => handleFilter(c.slug)}>{c.name}</button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem 2rem', opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.9s' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          Showing <span id="visibleCount" style={{ color: 'var(--orange)' }}>{visibleCount}</span> of {projects.length} projects
        </p>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem 8rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        {projects.length === 0 ? (
          <div style={{ gridColumn: 'span 12', textAlign: 'center', padding: '6rem 2rem', color: 'var(--muted)', fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>◻</div>
            <p>No projects yet. Check back soon.</p>
          </div>
        ) : (
          projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
