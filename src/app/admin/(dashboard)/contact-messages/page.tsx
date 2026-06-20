import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <AdminTable
      title="Contact Messages"
      items={messages}
      columns={[
        { header: 'Name', accessor: (m) => m.name },
        { header: 'Email', accessor: (m) => m.email },
        { header: 'Category', accessor: (m) => m.category?.name ?? '-' },
        { header: 'Status', accessor: (m) => m.isRead ? 'Read' : 'Unread' },
        { header: 'Date', accessor: (m) => m.createdAt.toLocaleDateString() },
      ]}
      deleteModel="contactMessage"
    />
  )
}
