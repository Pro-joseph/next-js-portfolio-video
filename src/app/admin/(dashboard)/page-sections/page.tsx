import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminPageSectionsPage() {
  const sections = await prisma.pageSection.findMany({ orderBy: { order: 'asc' } })
  return (
    <AdminTable
      title="Page Sections"
      items={sections}
      columns={[
        { header: 'Key', accessor: (s) => s.key },
        { header: 'Title', accessor: (s) => s.title ?? '-' },
        { header: 'Visible', accessor: (s) => s.isVisible ? 'Yes' : 'No' },
        { header: 'Order', accessor: (s) => String(s.order) },
      ]}
      editHref={(s) => `/admin/page-sections/${s.id}`}
      deleteModel="pageSection"
    />
  )
}
