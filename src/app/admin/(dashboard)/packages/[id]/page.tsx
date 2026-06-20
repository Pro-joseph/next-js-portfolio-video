import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertPackage } from '../actions'

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = await prisma.package.findUnique({ where: { id: parseInt(id) } })
  if (!pkg) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Package</h1>
      <AdminForm action={upsertPackage} fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'features', label: 'Features (JSON array)', type: 'textarea' },
        { name: 'icon', label: 'Icon', type: 'text' },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} initial={pkg} cancelHref="/admin/packages" />
    </div>
  )
}
