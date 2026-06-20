import { AdminForm } from '@/lib/admin-form'
import { upsertPackage } from '../actions'

export default function NewPackagePage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Package</h1>
      <AdminForm action={upsertPackage} fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'features', label: 'Features (JSON array)', type: 'textarea' },
        { name: 'icon', label: 'Icon', type: 'text' },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} cancelHref="/admin/packages" />
    </div>
  )
}
