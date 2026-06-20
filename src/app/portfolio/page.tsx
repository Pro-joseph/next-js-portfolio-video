import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { resolveCoverImage } from '@/lib/utils'
import { PortfolioClient } from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse our portfolio of professional videography projects — weddings, events, and commercial work',
}

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    prisma.project.findMany({
      where: { isReels: false },
      include: { category: true, media: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany({
      where: { isActive: true },
    }),
  ])

  const serialized = projects.map(p => ({
    id: p.id,
    title: p.title,
    coverImage: resolveCoverImage(p.coverImage) || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    categorySlug: p.category?.slug ?? '',
    categoryName: p.category?.name ?? 'Project',
    slug: p.id.toString(),
  }))

  const serializedCategories = categories.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }))

  return <PortfolioClient projects={serialized} categories={serializedCategories} />
}
