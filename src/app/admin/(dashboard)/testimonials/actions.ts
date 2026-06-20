'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertTestimonial(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const clientName = formData.get('clientName') as string
  if (!clientName) return { error: 'Client name is required.' }

  const data = {
    clientName,
    body: formData.get('body') as string,
    rating: parseInt(formData.get('rating') as string) || 5,
    serviceType: formData.get('serviceType') as string || null,
    isVisible: formData.get('isVisible') === 'on',
  }

  if (id) {
    await prisma.testimonial.update({ where: { id }, data })
  } else {
    await prisma.testimonial.create({ data })
  }

  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}
