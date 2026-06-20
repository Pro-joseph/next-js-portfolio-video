import { prisma } from '@/lib/prisma'
import { AdminForm } from '@/lib/admin-form'
import { upsertGalleryImage } from '../actions'

export default async function NewGalleryImagePage() {
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } })
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Gallery Image</h1>
      <AdminForm action={upsertGalleryImage} fields={[
        { name: 'imagePath', label: 'Image URL', type: 'url', required: true },
        { name: 'caption', label: 'Caption', type: 'text' },
        { name: 'clientId', label: 'Client', type: 'select', options: clients.map(c => ({ value: String(c.id), label: c.name })) },
        { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} cancelHref="/admin/gallery-images" />
    </div>
  )
}
