import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { resolveCoverImage, getYouTubeThumbnail } from '@/lib/utils'
import { ReelsClient } from './ReelsClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Reels',
  description: 'Watch our latest video reels — highlight cuts from weddings, events, and commercial productions',
}

export default async function ReelsPage() {
  const reels = await prisma.project.findMany({
    where: { isReels: true },
    include: { media: { orderBy: { order: 'asc' }, take: 1 } },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = reels.map(r => {
    const firstMedia = r.media[0]
    let thumb = resolveCoverImage(r.coverImage)

    if (!thumb && firstMedia?.videoUrl) {
      thumb = getYouTubeThumbnail(firstMedia.videoUrl)
    }

    return {
      id: r.id,
      title: r.title,
      thumbnail: thumb || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80',
      slug: r.id.toString(),
    }
  })

  return <ReelsClient reels={serialized} />
}
