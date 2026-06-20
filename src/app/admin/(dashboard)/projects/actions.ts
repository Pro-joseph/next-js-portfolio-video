'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const title = formData.get('title') as string
  if (!title) return { error: 'Title is required.' }

  const data = {
    title,
    description: formData.get('description') as string || null,
    categoryId: formData.get('categoryId') ? parseInt(formData.get('categoryId') as string) : null,
    coverImage: formData.get('coverImage') as string || null,
    isFeatured: formData.get('isFeatured') === 'on',
    isReels: formData.get('isReels') === 'on',
  }

  if (id) {
    await prisma.project.update({ where: { id }, data })
  } else {
    await prisma.project.create({ data })
  }

  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } })
  revalidatePath('/admin/projects')
}
