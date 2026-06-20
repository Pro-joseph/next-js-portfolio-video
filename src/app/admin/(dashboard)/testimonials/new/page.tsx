import { AdminForm } from '@/lib/admin-form'
import { upsertTestimonial } from '../actions'

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>New Testimonial</h1>
      <AdminForm action={upsertTestimonial} fields={[
        { name: 'clientName', label: 'Client Name', type: 'text', required: true },
        { name: 'body', label: 'Body', type: 'textarea', required: true },
        { name: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: 5 },
        { name: 'serviceType', label: 'Service Type', type: 'text' },
        { name: 'isVisible', label: 'Visible', type: 'checkbox', defaultValue: true },
      ]} cancelHref="/admin/testimonials" />
    </div>
  )
}
