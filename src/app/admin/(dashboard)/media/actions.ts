'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertMedia(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const projectId = parseInt(formData.get('projectId') as string)
  if (!projectId) return { error: 'Project is required.' }

  const data = {
    projectId,
    type: formData.get('type') as string || 'video',
    filePath: formData.get('filePath') as string || null,
    videoUrl: formData.get('videoUrl') as string || null,
    order: parseInt(formData.get('order') as string) || 0,
  }

  if (id) {
    await prisma.media.update({ where: { id }, data })
  } else {
    await prisma.media.create({ data })
  }

  revalidatePath('/admin/media')
  redirect('/admin/media')
}
