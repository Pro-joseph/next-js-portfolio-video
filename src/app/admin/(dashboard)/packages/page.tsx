import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({ orderBy: { name: 'asc' } })
  return (
    <AdminTable
      title="Packages"
      items={packages}
      columns={[
        { header: 'Name', accessor: (p) => p.name },
        { header: 'Price', accessor: (p) => p.price ? `$${p.price.toLocaleString()}` : '-' },
        { header: 'Active', accessor: (p) => p.isActive ? 'Yes' : 'No' },
      ]}
      createHref="/admin/packages/new"
      editHref={(p) => `/admin/packages/${p.id}`}
      deleteModel="package"
    />
  )
}
