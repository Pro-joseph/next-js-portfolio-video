'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/layout/CustomCursor'
import type { SocialLinksMap } from '@/components/ui/SocialLinks'

interface Props {
  children: React.ReactNode
  siteName: string
  social: SocialLinksMap
  contact: { email?: string; phone?: string }
  copyright: string
}

export function ClientShell({ children, siteName, social, contact, copyright }: Props) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="noise">
      <CustomCursor />
      <Header siteName={siteName} />
      <main>{children}</main>
      <Footer siteName={siteName} social={social} contact={contact} copyright={copyright} />
    </div>
  )
}
