import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PageSectionForm } from '../PageSectionForm'
import { upsertPageSection } from '../actions'

export default async function EditPageSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const section = await prisma.pageSection.findUnique({ where: { id: parseInt(id) } })
  if (!section) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Page Section</h1>
      <PageSectionForm action={upsertPageSection} initial={section} cancelHref="/admin/page-sections" />
    </div>
  )
}
