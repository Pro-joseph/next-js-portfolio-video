import { prisma } from '@/lib/prisma'
import { AdminForm } from '@/lib/admin-form'
import { upsertMedia } from '../actions'

export default async function NewMediaPage() {
  const projects = await prisma.project.findMany({ orderBy: { title: 'asc' } })
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Media</h1>
      <AdminForm action={upsertMedia} fields={[
        { name: 'projectId', label: 'Project', type: 'select', required: true, options: projects.map(p => ({ value: String(p.id), label: p.title })) },
        { name: 'type', label: 'Type', type: 'select', options: [
          { value: 'video', label: 'Video' },
          { value: 'image', label: 'Image' },
          { value: 'vimeo', label: 'Vimeo' },
          { value: 'youtube', label: 'YouTube' },
        ] },
        { name: 'filePath', label: 'File Path', type: 'text' },
        { name: 'videoUrl', label: 'Video URL', type: 'url' },
        { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
      ]} cancelHref="/admin/media" />
    </div>
  )
}
