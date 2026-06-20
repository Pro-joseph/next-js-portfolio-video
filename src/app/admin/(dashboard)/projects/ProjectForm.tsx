'use client'

import { useActionState } from 'react'
import { createProject } from './actions'
import { AdminFormField } from '@/lib/admin-components'

interface Category {
  id: number
  name: string
}

interface Props {
  categories: Category[]
  initial?: {
    title: string
    description?: string | null
    coverImage?: string | null
    categoryId?: number | null
    isFeatured?: boolean
    isReels?: boolean
  }
}

export function AdminProjectForm({ categories, initial }: Props) {
  const [state, formAction, pending] = useActionState(createProject, null)

  return (
    <>
      {state?.error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ maxWidth: 600, background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
        <AdminFormField label="Title *">
          <input type="text" name="title" required className="input-pf" defaultValue={initial?.title} />
        </AdminFormField>

        <AdminFormField label="Description">
          <textarea name="description" rows={4} className="input-pf" defaultValue={initial?.description ?? ''} />
        </AdminFormField>

        <AdminFormField label="Cover Image URL">
          <input type="text" name="coverImage" className="input-pf" placeholder="https://..." defaultValue={initial?.coverImage ?? ''} />
        </AdminFormField>

        <AdminFormField label="Category">
          <select name="categoryId" className="input-pf" defaultValue={initial?.categoryId ?? ''}>
            <option value="">No category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </AdminFormField>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', fontSize: '0.9rem' }}>
            <input type="checkbox" name="isFeatured" defaultChecked={initial?.isFeatured} />
            Featured
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', fontSize: '0.9rem' }}>
            <input type="checkbox" name="isReels" defaultChecked={initial?.isReels} />
            Reel
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? 'Saving...' : 'Save Project'}
          </button>
          <a href="/admin/projects" className="btn-secondary">Cancel</a>
        </div>
      </form>
    </>
  )
}
