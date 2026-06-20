import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertMedia } from '../actions'

export default async function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [media, projects] = await Promise.all([
    prisma.media.findUnique({ where: { id: parseInt(id) } }),
    prisma.project.findMany({ orderBy: { title: 'asc' } }),
  ])
  if (!media) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Media</h1>
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
        { name: 'order', label: 'Order', type: 'number' },
      ]} initial={{ ...media, projectId: String(media.projectId) }} cancelHref="/admin/media" />
    </div>
  )
}
