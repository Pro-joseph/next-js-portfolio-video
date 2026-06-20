'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export type ContactFormState = { error?: string; success?: boolean } | null

export async function submitContact(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const categoryId = formData.get('categoryId') as string
  const body = formData.get('body') as string

  if (!name || !email || !body) {
    return { error: 'Name, email, and message are required.' }
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      categoryId: categoryId ? parseInt(categoryId) : null,
      subject: formData.get('subject') as string || null,
      body,
    },
  })

  revalidatePath('/contact')
  return { success: true }
}
