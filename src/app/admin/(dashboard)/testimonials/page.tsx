import { prisma } from '@/lib/prisma'
import { AdminTable } from '@/lib/admin-components'

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <AdminTable
      title="Testimonials"
      items={testimonials}
      columns={[
        { header: 'Client', accessor: (t) => t.clientName },
        { header: 'Service', accessor: (t) => t.serviceType ?? '-' },
        { header: 'Visible', accessor: (t) => t.isVisible ? 'Yes' : 'No' },
        { header: 'Rating', accessor: (t) => String(t.rating) + '/5' },
      ]}
      createHref="/admin/testimonials/new"
      editHref={(t) => `/admin/testimonials/${t.id}`}
      deleteModel="testimonial"
    />
  )
}
