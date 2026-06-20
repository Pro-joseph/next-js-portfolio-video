'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertPost(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const title = formData.get('title') as string
  if (!title) return { error: 'Title is required.' }

  const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const data: any = {
    title, slug,
    body: formData.get('body') as string || '',
    coverImage: formData.get('coverImage') as string || null,
    status: formData.get('status') as string || 'draft',
  }

  if (formData.get('publishedAt') === 'on') {
    data.publishedAt = new Date()
  }

  if (id) {
    await prisma.post.update({ where: { id }, data })
  } else {
    await prisma.post.create({ data })
  }

  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}
