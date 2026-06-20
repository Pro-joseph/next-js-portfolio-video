'use server'

import { prisma } from '@/lib/prisma'
import { verifyPassword, createAdminSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: { error?: string } | null, formData: FormData): Promise<{ error?: string } | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { error: 'Invalid credentials.' }
  }

  const valid = await verifyPassword(password, user.password)
  if (!valid) {
    return { error: 'Invalid credentials.' }
  }

  await createAdminSession(user.id)
  redirect('/admin')
}
