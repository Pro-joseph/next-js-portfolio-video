'use client'

import { useActionState } from 'react'
import { AdminFormField } from '@/lib/admin-components'

interface Field {
  name: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'url'
  required?: boolean
  options?: { value: string; label: string }[]
  defaultValue?: string | number | boolean | null
}

interface AdminFormProps {
  action: (prevState: { error?: string } | null, formData: FormData) => Promise<{ error?: string } | null>
  fields: Field[]
  initial?: Record<string, any>
  cancelHref: string
  submitLabel?: string
}

export function AdminForm({ action, fields, initial, cancelHref, submitLabel = 'Save' }: AdminFormProps) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <>
      {state?.error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ maxWidth: 600, background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
        {initial?.id && <input type="hidden" name="id" value={initial.id} />}
        {fields.map(f => {
          const val = initial?.[f.name] ?? f.defaultValue
          return (
            <AdminFormField key={f.name} label={f.label}>
              {f.type === 'textarea' ? (
                <textarea name={f.name} rows={4} className="input-pf" required={f.required} defaultValue={val as string || ''} />
              ) : f.type === 'checkbox' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
                  <input type="checkbox" name={f.name} defaultChecked={!!val} />
                  {f.label}
                </label>
              ) : f.type === 'select' ? (
                <select name={f.name} className="input-pf" defaultValue={val as string || ''}>
                  {f.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                  name={f.name}
                  className="input-pf"
                  required={f.required}
                  defaultValue={val as string || ''}
                />
              )}
            </AdminFormField>
          )
        })}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? 'Saving...' : submitLabel}
          </button>
          <a href={cancelHref} className="btn-secondary">Cancel</a>
        </div>
      </form>
    </>
  )
}
