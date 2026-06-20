'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface Props {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function ScrollReveal({ children, className = '', as: Tag = 'div' }: Props) {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`section-fade ${className}`}>
      {children}
    </Tag>
  )
}
