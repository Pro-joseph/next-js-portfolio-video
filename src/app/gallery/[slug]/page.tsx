import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { resolveGalleryImage, resolveClientLogo } from '@/lib/utils'
import { GalleryShowClient } from './GalleryShowClient'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const client = await prisma.client.findUnique({ where: { slug } })
  if (!client) return { title: 'Gallery Not Found' }
  return {
    title: `${client.name} Gallery`,
    description: client.description ?? undefined,
  }
}

export default async function GalleryShowPage({ params }: Props) {
  const { slug } = await params
  const client = await prisma.client.findUnique({
    where: { slug },
    include: {
      images: {
        where: { isActive: true },
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!client) notFound()

  const serializedImages = client.images.map(img => ({
    id: img.id,
    imageUrl: resolveGalleryImage(img.imagePath) || '',
    caption: img.caption,
  }))

  return (
    <GalleryShowClient
      clientName={client.name}
      slug={client.slug}
      description={client.description}
      logoUrl={resolveClientLogo(client.logo)}
      images={serializedImages}
    />
  )
}
