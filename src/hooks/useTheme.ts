'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const light = stored === 'light'
    setIsLight(light)
    if (light) document.documentElement.classList.add('light')
  }, [])

  function toggleTheme() {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('theme', next ? 'light' : 'dark')
  }

  return { isLight, toggleTheme }
}
