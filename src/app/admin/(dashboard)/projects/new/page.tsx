import { prisma } from '@/lib/prisma'
import { AdminProjectForm } from '../ProjectForm'

export default async function NewProjectPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Project</h1>
      <AdminProjectForm categories={categories} />
    </div>
  )
}
