import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true, _count: { select: { media: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <AdminTable
      title="Projects"
      items={projects}
      columns={[
        { header: 'Title', accessor: (p) => p.title },
        { header: 'Category', accessor: (p) => p.category?.name ?? '-' },
        { header: 'Featured', accessor: (p) => p.isFeatured ? 'Yes' : 'No' },
        { header: 'Reel', accessor: (p) => p.isReels ? 'Yes' : 'No' },
        { header: 'Media', accessor: (p) => String(p._count.media) },
      ]}
      createHref="/admin/projects/new"
      editHref={(p) => `/admin/projects/${p.id}`}
      deleteModel="project"
    />
  )
}
