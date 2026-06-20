import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { order: 'asc' } })
  return (
    <AdminTable
      title="Clients"
      items={clients}
      columns={[
        { header: 'Name', accessor: (c) => c.name },
        { header: 'Slug', accessor: (c) => c.slug },
        { header: 'Active', accessor: (c) => c.isActive ? 'Yes' : 'No' },
        { header: 'Order', accessor: (c) => String(c.order) },
      ]}
      createHref="/admin/clients/new"
      editHref={(c) => `/admin/clients/${c.id}`}
      deleteModel="client"
    />
  )
}
