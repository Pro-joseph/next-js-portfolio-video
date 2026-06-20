import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getImagesFromJson, resolveCoverImage } from '@/lib/utils'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedWork } from '@/components/sections/FeaturedWork'

export const dynamic = 'force-dynamic'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'
import { SocialLinks } from '@/components/ui/SocialLinks'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Professional videography services for weddings, events, and commercial content',
}

export default async function HomePage() {
  const [sections, featuredProjects, testimonials, packages, socialSettings] = await Promise.all([
    prisma.pageSection.findMany({
      where: { isVisible: true, key: { in: ['hero', 'about', 'cta'] } },
    }),
    prisma.project.findMany({
      where: { isFeatured: true, deletedAt: null },
      include: { category: true, media: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.package.findMany({
      where: { isActive: true },
    }),
    prisma.siteSetting.findMany({
      where: { isVisible: true, key: { in: ['social_facebook', 'social_instagram', 'social_youtube', 'social_twitter', 'social_tiktok', 'social_linkedin', 'social_vimeo'] } },
    }),
  ])

  const social: Record<string, string> = {}
  for (const s of socialSettings) {
    if (s.value) social[s.key.replace('social_', '')] = s.value
  }

  const hero = sections.find(s => s.key === 'hero')
  const about = sections.find(s => s.key === 'about')
  const cta = sections.find(s => s.key === 'cta')

  const parsedPackages = packages.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    features: (() => { try { return JSON.parse(p.features ?? '[]') } catch { return [] } })(),
    icon: p.icon,
  }))

  const featuredCards = featuredProjects.map(p => ({
    id: p.id,
    title: p.title,
    coverImage: resolveCoverImage(p.coverImage),
    categoryName: p.category?.name,
    slug: p.id.toString(),
  }))

  return (
    <>
      <HeroSection
        title={hero?.title ?? undefined}
        body={hero?.body ?? undefined}
        images={getImagesFromJson(hero?.imagePath ?? null)}
        buttonText={hero?.buttonText ?? undefined}
        buttonLink={hero?.buttonLink ?? undefined}
      />

      <FeaturedWork projects={featuredCards} />
      <ServicesSection packages={parsedPackages} />

      <TestimonialsSection
        testimonials={testimonials.map(t => ({
          id: t.id,
          clientName: t.clientName,
          body: t.body,
          serviceType: t.serviceType,
        }))}
      />

      <AboutSection
        title={about?.title ?? undefined}
        body={about?.body ?? undefined}
        imageUrl={about ? (() => { const imgs = getImagesFromJson(about.imagePath); return imgs[0] ?? null })() : null}
      />

      <CTASection
        title={cta?.title ?? undefined}
        body={cta?.body ?? undefined}
        buttonText={cta?.buttonText ?? undefined}
        buttonLink={cta?.buttonLink ?? undefined}
      />

      <section style={{ padding: '2rem 1.5rem 5rem', textAlign: 'center' }}>
        <div className="max-w-7xl mx-auto">
          <div className="accent-line" style={{ margin: '0 auto 1rem' }} />
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Follow Us</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Stay connected for the latest work and behind-the-scenes content</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SocialLinks social={social} />
          </div>
        </div>
      </section>
    </>
  )
}
