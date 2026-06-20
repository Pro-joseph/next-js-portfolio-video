import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminGalleryImagesPage() {
  const images = await prisma.galleryImage.findMany({
    include: { client: true },
    orderBy: [{ clientId: 'asc' }, { order: 'asc' }],
  })
  return (
    <AdminTable
      title="Gallery Images"
      items={images}
      columns={[
        { header: 'Client', accessor: (i) => i.client?.name ?? '-' },
        { header: 'Caption', accessor: (i) => i.caption ?? '-' },
        { header: 'Active', accessor: (i) => i.isActive ? 'Yes' : 'No' },
        { header: 'Order', accessor: (i) => String(i.order) },
      ]}
      createHref="/admin/gallery-images/new"
      editHref={(i) => `/admin/gallery-images/${i.id}`}
      deleteModel="galleryImage"
    />
  )
}
