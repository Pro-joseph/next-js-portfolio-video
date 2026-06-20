import { AdminForm } from '@/lib/admin-form'
import { upsertClient } from '../actions'

export default function NewClientPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Client</h1>
      <AdminForm action={upsertClient} fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'logo', label: 'Logo URL', type: 'url' },
        { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} cancelHref="/admin/clients" />
    </div>
  )
}
