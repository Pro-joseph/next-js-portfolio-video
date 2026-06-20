'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertClient(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const name = formData.get('name') as string
  if (!name) return { error: 'Name is required.' }

  const slug = (formData.get('slug') as string) || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const data = {
    name, slug,
    description: formData.get('description') as string || null,
    logo: formData.get('logo') as string || null,
    isActive: formData.get('isActive') === 'on',
    order: parseInt(formData.get('order') as string) || 0,
  }

  if (id) {
    await prisma.client.update({ where: { id }, data })
  } else {
    await prisma.client.create({ data })
  }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}
