'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertPageSection(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const key = formData.get('key') as string
  if (!key) return { error: 'Key is required.' }

  const data = {
    key,
    title: formData.get('title') as string || null,
    subtitle: formData.get('subtitle') as string || null,
    body: formData.get('body') as string || null,
    imagePath: formData.get('imagePath') as string || null,
    buttonText: formData.get('buttonText') as string || null,
    buttonLink: formData.get('buttonLink') as string || null,
    order: parseInt(formData.get('order') as string) || 0,
    isVisible: formData.get('isVisible') === 'on',
    extras: formData.get('extras') as string || null,
  }

  if (id) {
    await prisma.pageSection.update({ where: { id }, data })
  } else {
    await prisma.pageSection.create({ data })
  }

  revalidatePath('/admin/page-sections')
  redirect('/admin/page-sections')
}
