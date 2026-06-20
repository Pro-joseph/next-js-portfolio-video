import { AdminForm } from '@/lib/admin-form'
import { upsertCategory } from '../actions'

export default function NewCategoryPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Category</h1>
      <AdminForm action={upsertCategory} fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'isActive', label: 'Active', type: 'checkbox', defaultValue: true },
      ]} cancelHref="/admin/categories" />
    </div>
  )
}
