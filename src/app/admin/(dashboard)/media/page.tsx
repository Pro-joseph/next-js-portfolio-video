import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    include: { project: { select: { title: true } } },
    orderBy: [{ projectId: 'asc' }, { order: 'asc' }],
  })
  return (
    <AdminTable
      title="Media"
      items={media}
      columns={[
        { header: 'Project', accessor: (m) => m.project?.title ?? '-' },
        { header: 'Type', accessor: (m) => m.type },
        { header: 'Order', accessor: (m) => String(m.order) },
      ]}
      createHref="/admin/media/new"
      editHref={(m) => `/admin/media/${m.id}`}
      deleteModel="media"
    />
  )
}
