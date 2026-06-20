'use client'

import { useEffect, useRef } from 'react'

export function useTilt<T extends HTMLElement>(strength = 6) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el!.style.transform = `translateY(-6px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) scale(1.01)`
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
  }, [strength])

  return ref
}
