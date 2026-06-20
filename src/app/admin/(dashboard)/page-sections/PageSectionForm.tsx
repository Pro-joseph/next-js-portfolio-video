'use client'

import { useActionState, useState } from 'react'
import { AdminFormField } from '@/lib/admin-components'

interface Props {
  action: (prev: { error?: string } | null, data: FormData) => Promise<{ error?: string } | null>
  initial?: {
    id?: number
    key: string
    title?: string | null
    subtitle?: string | null
    body?: string | null
    imagePath?: string | null
    buttonText?: string | null
    buttonLink?: string | null
    order?: number
    isVisible?: boolean
    extras?: string | null
  }
  cancelHref: string
}

function parseImages(imagePath: string | null | undefined): string[] {
  if (!imagePath) return []
  try {
    const parsed = JSON.parse(imagePath)
    if (Array.isArray(parsed)) return parsed.filter(Boolean)
  } catch {}
  return imagePath ? [imagePath] : []
}

export function PageSectionForm({ action, initial, cancelHref }: Props) {
  const [state, formAction, pending] = useActionState(action, null)
  const [images, setImages] = useState<string[]>(() => parseImages(initial?.imagePath))

  function addImage() {
    setImages(prev => [...prev, ''])
  }

  function updateImage(index: number, value: string) {
    setImages(prev => prev.map((img, i) => i === index ? value : img))
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  function moveImage(index: number, direction: 'up' | 'down') {
    setImages(prev => {
      const next = [...prev]
      const swap = direction === 'up' ? index - 1 : index + 1
      if (swap < 0 || swap >= next.length) return next
      ;[next[index], next[swap]] = [next[swap], next[index]]
      return next
    })
  }

  return (
    <>
      {state?.error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ maxWidth: 600, background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem' }}>
        {initial?.id && <input type="hidden" name="id" value={initial.id} />}

        <AdminFormField label="Key *">
          <input type="text" name="key" required className="input-pf" defaultValue={initial?.key} />
        </AdminFormField>

        <AdminFormField label="Title">
          <input type="text" name="title" className="input-pf" defaultValue={initial?.title ?? ''} />
        </AdminFormField>

        <AdminFormField label="Subtitle">
          <input type="text" name="subtitle" className="input-pf" defaultValue={initial?.subtitle ?? ''} />
        </AdminFormField>

        <AdminFormField label="Body (HTML)">
          <textarea name="body" rows={4} className="input-pf" defaultValue={initial?.body ?? ''} />
        </AdminFormField>

        <AdminFormField label="Images (for slider/carousel)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {images.map((img, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="url"
                  className="input-pf"
                  style={{ flex: 1 }}
                  placeholder="https://..."
                  value={img}
                  onChange={e => updateImage(i, e.target.value)}
                />
                {img && (
                  <div style={{ width: 40, height: 40, borderRadius: 4, overflow: 'hidden', flexShrink: 0, background: 'var(--bg)' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLElement).style.display = 'none' }} />
                  </div>
                )}
                <button type="button" onClick={() => moveImage(i, 'up')} disabled={i === 0} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', width: 28, height: 28, cursor: 'pointer', fontSize: '0.8rem' }}>▲</button>
                <button type="button" onClick={() => moveImage(i, 'down')} disabled={i === images.length - 1} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', width: 28, height: 28, cursor: 'pointer', fontSize: '0.8rem' }}>▼</button>
                <button type="button" onClick={() => removeImage(i)} style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', width: 28, height: 28, cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
              </div>
            ))}
            <button type="button" onClick={addImage} style={{ alignSelf: 'flex-start', padding: '0.4rem 0.75rem', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
              + Add Image
            </button>
          </div>
          <input type="hidden" name="imagePath" value={images.filter(Boolean).length > 0 ? JSON.stringify(images.filter(Boolean)) : ''} />
        </AdminFormField>

        <AdminFormField label="Button Text">
          <input type="text" name="buttonText" className="input-pf" defaultValue={initial?.buttonText ?? ''} />
        </AdminFormField>

        <AdminFormField label="Button Link">
          <input type="text" name="buttonLink" className="input-pf" defaultValue={initial?.buttonLink ?? ''} />
        </AdminFormField>

        <AdminFormField label="Extras (JSON)">
          <textarea name="extras" rows={3} className="input-pf" defaultValue={initial?.extras ?? ''} />
        </AdminFormField>

        <AdminFormField label="Order">
          <input type="number" name="order" className="input-pf" defaultValue={initial?.order ?? 0} />
        </AdminFormField>

        <AdminFormField label="Visible">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
            <input type="checkbox" name="isVisible" defaultChecked={initial?.isVisible ?? true} />
            Visible
          </label>
        </AdminFormField>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? 'Saving...' : 'Save'}
          </button>
          <a href={cancelHref} className="btn-secondary">Cancel</a>
        </div>
      </form>
    </>
  )
}
