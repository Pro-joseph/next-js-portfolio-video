import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminSettingsPage() {
  const [settings, customizations] = await Promise.all([
    prisma.siteSetting.findMany({ orderBy: [{ group: 'asc' }, { key: 'asc' }] }),
    prisma.siteCustomization.findMany({ orderBy: [{ group: 'asc' }, { key: 'asc' }] }),
  ])

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Settings</h1>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--orange)', marginBottom: '1rem' }}>Site Settings</h2>
          <AdminTable
            title=""
            items={settings}
            columns={[
              { header: 'Key', accessor: (s) => s.key },
              { header: 'Value', accessor: (s) => s.value?.substring(0, 60) ?? '-' },
              { header: 'Group', accessor: (s) => s.group },
              { header: 'Visible', accessor: (s) => s.isVisible ? 'Yes' : 'No' },
            ]}
            createHref="/admin/settings/new"
            editHref={(s) => `/admin/settings/${s.id}`}
          />
        </div>

        <div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--orange)', marginBottom: '1rem' }}>Customizations</h2>
          <AdminTable
            title=""
            items={customizations}
            columns={[
              { header: 'Key', accessor: (c) => c.key },
              { header: 'Value', accessor: (c) => c.value?.substring(0, 60) ?? '-' },
              { header: 'Type', accessor: (c) => c.type },
              { header: 'Group', accessor: (c) => c.group },
              { header: 'Active', accessor: (c) => c.isActive ? 'Yes' : 'No' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
