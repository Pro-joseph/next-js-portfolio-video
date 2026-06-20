import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { resolveCoverImage, parseVideoUrl, getImagesFromJson } from '@/lib/utils'
import { ProjectDetailClient } from './ProjectDetailClient'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findFirst({
    where: { id: parseInt(slug) },
  })
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description ?? undefined,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await prisma.project.findFirst({
    where: { id: parseInt(slug) },
    include: { category: true, media: { orderBy: { order: 'asc' } } },
  })

  if (!project) notFound()

  const related = await prisma.project.findMany({
    where: { id: { not: project.id }, isReels: project.isReels },
    take: 2,
    orderBy: { createdAt: 'desc' },
  })

  const serializedMedia = project.media.map(m => ({
    id: m.id,
    type: m.type,
    videoUrl: m.videoUrl,
    filePath: m.filePath,
    embedUrl: m.videoUrl ? parseVideoUrl(m.videoUrl) : null,
    resolvedImage: m.filePath ? (m.filePath.startsWith('http') ? m.filePath : `/storage/${m.filePath}`) : null,
  }))

  const serializedRelated = related.map(r => ({
    id: r.id,
    title: r.title,
    coverImage: resolveCoverImage(r.coverImage) || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    slug: r.id.toString(),
  }))

  return (
    <ProjectDetailClient
      title={project.title}
      description={project.description}
      createdAt={project.createdAt.toISOString()}
      categoryName={project.category?.name ?? '-'}
      isFeatured={project.isFeatured}
      isReels={project.isReels}
      media={serializedMedia}
      related={serializedRelated}
    />
  )
}
