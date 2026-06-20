'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertSiteSetting(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const key = formData.get('key') as string
  if (!key) return { error: 'Key is required.' }

  const data = {
    key,
    value: formData.get('value') as string || null,
    type: (formData.get('type') as string) || 'text',
    group: (formData.get('group') as string) || 'general',
    isVisible: formData.get('isVisible') === 'on',
  }

  if (id) {
    await prisma.siteSetting.update({ where: { id }, data })
  } else {
    await prisma.siteSetting.create({ data })
  }

  revalidatePath('/admin/settings')
  redirect('/admin/settings')
}
