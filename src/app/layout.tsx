import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'
import { ClientShell } from '@/components/layout/ClientShell'
import { prisma } from '@/lib/prisma'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Oumalk - Professional Videography',
    template: '%s — Oumalk',
  },
  description: 'Professional videography services for weddings, events, and commercial content',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let siteName = 'Oumalk'
  let social: { facebook?: string; instagram?: string; youtube?: string } = {}
  let contact: { email?: string; phone?: string } = {}
  let copyright = ''

  try {
    const settings = await prisma.siteSetting.findMany({
      where: { isVisible: true, key: { in: ['site_name', 'social_facebook', 'social_instagram', 'social_youtube', 'contact_email', 'contact_phone', 'copyright'] } },
    })
    for (const s of settings) {
      if (s.key === 'site_name' && s.value) siteName = s.value
      else if (s.key === 'social_facebook') social.facebook = s.value || undefined
      else if (s.key === 'social_instagram') social.instagram = s.value || undefined
      else if (s.key === 'social_youtube') social.youtube = s.value || undefined
      else if (s.key === 'contact_email') contact.email = s.value || undefined
      else if (s.key === 'contact_phone') contact.phone = s.value || undefined
      else if (s.key === 'copyright') copyright = s.value ?? ''
    }
  } catch {}

  return (
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') document.documentElement.classList.add('light');
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteName,
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oumalk.com',
              description: 'Professional videography services for weddings, events, and commercial content',
            }),
          }}
        />
      </head>
      <body className={`${bebasNeue.variable} ${dmSans.variable}`}>
        <ClientShell
          siteName={siteName}
          social={social}
          contact={contact}
          copyright={copyright || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
        >
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
