'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertGalleryImage(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const imagePath = formData.get('imagePath') as string
  if (!imagePath) return { error: 'Image path is required.' }

  const data = {
    imagePath,
    clientId: parseInt(formData.get('clientId') as string) || 1,
    caption: formData.get('caption') as string || null,
    order: parseInt(formData.get('order') as string) || 0,
    isActive: formData.get('isActive') === 'on',
  }

  if (id) {
    await prisma.galleryImage.update({ where: { id }, data })
  } else {
    await prisma.galleryImage.create({ data })
  }

  revalidatePath('/admin/gallery-images')
  redirect('/admin/gallery-images')
}
