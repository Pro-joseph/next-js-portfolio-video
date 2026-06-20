'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertPackage(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const id = parseInt(formData.get('id') as string) || undefined
  const name = formData.get('name') as string
  if (!name) return { error: 'Name is required.' }

  const data = {
    name,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string) || 0,
    features: formData.get('features') as string || null,
    icon: formData.get('icon') as string || null,
    isActive: formData.get('isActive') === 'on',
  }

  if (id) {
    await prisma.package.update({ where: { id }, data })
  } else {
    await prisma.package.create({ data })
  }

  revalidatePath('/admin/packages')
  redirect('/admin/packages')
}
