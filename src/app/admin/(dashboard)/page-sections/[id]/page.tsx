import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertPageSection } from '../actions'

export default async function EditPageSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const section = await prisma.pageSection.findUnique({ where: { id: parseInt(id) } })
  if (!section) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Page Section</h1>
      <AdminForm action={upsertPageSection} fields={[
        { name: 'key', label: 'Key', type: 'text', required: true },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'body', label: 'Body (HTML)', type: 'textarea' },
        { name: 'imagePath', label: 'Image URL', type: 'url' },
        { name: 'buttonText', label: 'Button Text', type: 'text' },
        { name: 'buttonLink', label: 'Button Link', type: 'text' },
        { name: 'extras', label: 'Extras (JSON)', type: 'textarea' },
        { name: 'order', label: 'Order', type: 'number' },
        { name: 'isVisible', label: 'Visible', type: 'checkbox', defaultValue: true },
      ]} initial={section} cancelHref="/admin/page-sections" />
    </div>
  )
}
