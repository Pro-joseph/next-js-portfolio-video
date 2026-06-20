import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertClient } from '../actions'

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await prisma.client.findUnique({ where: { id: parseInt(id) } })
  if (!client) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Client</h1>
      <AdminForm action={upsertClient} fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'logo', label: 'Logo URL', type: 'url' },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} initial={client} cancelHref="/admin/clients" />
    </div>
  )
}
