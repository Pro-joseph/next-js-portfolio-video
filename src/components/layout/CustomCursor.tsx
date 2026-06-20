'use client'

import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    const dotEl = document.getElementById('cursorDot') as HTMLElement | null
    const ringEl = document.getElementById('cursorRing') as HTMLElement | null
    if (!dotEl || !ringEl) return

    const dot = dotEl
    const ring = ringEl

    let mx = 0, my = 0, rx = 0, ry = 0

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }

    function animRing() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', onMouseMove)
    requestAnimationFrame(animRing)

    const expandTargets = document.querySelectorAll(
      'a, button, .card, .pf-card, .filter-pill, .service-card, .gallery-card, .reel-card, .project-card, .hero-dot, .featured-card'
    )

    expandTargets.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expanded'))
      el.addEventListener('mouseleave', () => ring.classList.remove('expanded'))
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" id="cursorDot" />
      <div className="cursor-ring" id="cursorRing" />
      <style>{`
        .cursor-dot {
          position: fixed; width: 8px; height: 8px;
          background: var(--orange); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease, opacity 0.3s ease;
        }
        .cursor-ring {
          position: fixed; width: 36px; height: 36px;
          border: 1px solid rgba(234,88,12,0.5); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform 0.18s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        }
        .cursor-ring.expanded { width: 64px; height: 64px; border-color: rgba(234,88,12,0.8); }
      `}</style>
    </>
  )
}
