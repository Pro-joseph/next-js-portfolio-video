import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertTestimonial } from '../actions'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const testimonial = await prisma.testimonial.findUnique({ where: { id: parseInt(id) } })
  if (!testimonial) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Testimonial</h1>
      <AdminForm action={upsertTestimonial} fields={[
        { name: 'clientName', label: 'Client Name', type: 'text', required: true },
        { name: 'body', label: 'Body', type: 'textarea', required: true },
        { name: 'rating', label: 'Rating (1-5)', type: 'number' },
        { name: 'serviceType', label: 'Service Type', type: 'text' },
        { name: 'isVisible', label: 'Visible', type: 'checkbox', defaultValue: true },
      ]} initial={testimonial} cancelHref="/admin/testimonials" />
    </div>
  )
}
