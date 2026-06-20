import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertSiteSetting } from '../actions'

export default async function EditSiteSettingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const setting = await prisma.siteSetting.findUnique({ where: { id: parseInt(id) } })
  if (!setting) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Setting</h1>
      <AdminForm action={upsertSiteSetting} fields={[
        { name: 'key', label: 'Key', type: 'text', required: true },
        { name: 'value', label: 'Value', type: 'url' },
        { name: 'type', label: 'Type', type: 'select', options: [
          { value: 'text', label: 'Text' },
          { value: 'url', label: 'URL' },
        ] },
        { name: 'group', label: 'Group', type: 'select', options: [
          { value: 'social', label: 'Social' },
          { value: 'general', label: 'General' },
          { value: 'contact', label: 'Contact' },
          { value: 'stats', label: 'Stats' },
        ] },
        { name: 'isVisible', label: 'Visible', type: 'checkbox', defaultValue: true },
      ]} initial={setting} cancelHref="/admin/settings" />
    </div>
  )
}
