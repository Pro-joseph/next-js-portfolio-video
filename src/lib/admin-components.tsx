import Link from 'next/link'
import { DeleteButton } from './delete-button'

interface Column<T> {
  header: string
  accessor: (item: T) => React.ReactNode
}

interface AdminTableProps<T> {
  title: string
  items: T[]
  columns: Column<T>[]
  createHref?: string
  editHref?: (item: T) => string
  deleteModel?: string
}

export function AdminTable<T extends { id: number }>({ title, items, columns, createHref, editHref, deleteModel }: AdminTableProps<T>) {
  const extraCols = (editHref ? 1 : 0) + (deleteModel ? 1 : 0)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)' }}>{title}</h1>
        {createHref && (
          <Link href={createHref} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>
            + New
          </Link>
        )}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {columns.map(col => (
                <th key={col.header} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.header}
                </th>
              ))}
              {extraCols > 0 && <th style={{ padding: '0.75rem 1rem', width: extraCols * 80 }} />}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + extraCols} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted)' }}>
                  No items yet.
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  {columns.map(col => (
                    <td key={col.header} style={{ padding: '0.75rem 1rem', color: 'var(--text)', fontSize: '0.9rem' }}>
                      {col.accessor(item)}
                    </td>
                  ))}
                  <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
                    {editHref && (
                      <Link href={editHref(item)} style={{ color: 'var(--orange)', fontSize: '0.85rem', textDecoration: 'none' }}>
                        Edit
                      </Link>
                    )}
                    {deleteModel && (
                      <DeleteButton model={deleteModel} id={item.id} />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminFormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>{label}</label>
      {children}
    </div>
  )
}
