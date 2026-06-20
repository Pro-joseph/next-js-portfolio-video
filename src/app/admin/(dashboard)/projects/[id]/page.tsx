import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { createProject } from '../actions'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [project, categories] = await Promise.all([
    prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!project) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Project</h1>
      <AdminForm action={createProject} fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'coverImage', label: 'Cover Image URL', type: 'url' },
        { name: 'categoryId', label: 'Category', type: 'select', options: categories.map(c => ({ value: String(c.id), label: c.name })) },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
        { name: 'isReels', label: 'Reel', type: 'checkbox' },
      ]} initial={project} cancelHref="/admin/projects" />
    </div>
  )
}
