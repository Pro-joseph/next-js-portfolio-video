import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { resolveClientLogo } from '@/lib/utils'
import { GalleryIndexClient } from './GalleryIndexClient'

export const metadata: Metadata = {
  title: 'Client Gallery',
  description: 'View client galleries and event photography — moments captured by Oumalk',
}

export default async function GalleryPage() {
  const clients = await prisma.client.findMany({
    where: { isActive: true },
    include: { _count: { select: { images: true } } },
    orderBy: { order: 'asc' },
  })

  const serialized = clients.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    logoUrl: resolveClientLogo(c.logo),
    imagesCount: c._count.images,
  }))

  return <GalleryIndexClient clients={serialized} />
}
