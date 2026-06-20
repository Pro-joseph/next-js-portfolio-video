'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertCategory(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const name = formData.get('name') as string
  if (!name) return { error: 'Name is required.' }

  const slug = (formData.get('slug') as string) || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const data = { name, slug, description: formData.get('description') as string || null, isActive: formData.get('isActive') === 'on' }

  if (id) {
    await prisma.category.update({ where: { id }, data })
  } else {
    await prisma.category.create({ data })
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}
