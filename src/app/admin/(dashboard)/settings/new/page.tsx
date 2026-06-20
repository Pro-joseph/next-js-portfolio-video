import { AdminForm } from '@/lib/admin-form'
import { upsertSiteSetting } from '../actions'

export default function NewSiteSettingPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Setting</h1>
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
      ]} cancelHref="/admin/settings" />
    </div>
  )
}
