import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <AdminTable
      title="Posts"
      items={posts}
      columns={[
        { header: 'Title', accessor: (p) => p.title },
        { header: 'Status', accessor: (p) => p.status },
        { header: 'Published', accessor: (p) => p.publishedAt ? p.publishedAt.toLocaleDateString() : '-' },
      ]}
      createHref="/admin/posts/new"
      editHref={(p) => `/admin/posts/${p.id}`}
      deleteModel="post"
    />
  )
}
