import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertGalleryImage } from '../actions'

export default async function EditGalleryImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [image, clients] = await Promise.all([
    prisma.galleryImage.findUnique({ where: { id: parseInt(id) } }),
    prisma.client.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!image) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Gallery Image</h1>
      <AdminForm action={upsertGalleryImage} fields={[
        { name: 'imagePath', label: 'Image URL', type: 'url', required: true },
        { name: 'caption', label: 'Caption', type: 'text' },
        { name: 'clientId', label: 'Client', type: 'select', options: clients.map(c => ({ value: String(c.id), label: c.name })) },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} initial={{ ...image, clientId: String(image.clientId) }} cancelHref="/admin/gallery-images" />
    </div>
  )
}
