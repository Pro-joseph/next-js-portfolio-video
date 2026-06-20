import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return (
    <AdminTable
      title="Categories"
      items={categories}
      columns={[
        { header: 'Name', accessor: (c) => c.name },
        { header: 'Slug', accessor: (c) => c.slug },
        { header: 'Active', accessor: (c) => c.isActive ? 'Yes' : 'No' },
      ]}
      createHref="/admin/categories/new"
      editHref={(c) => `/admin/categories/${c.id}`}
      deleteModel="category"
    />
  )
}
