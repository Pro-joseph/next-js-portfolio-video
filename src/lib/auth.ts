import { cookies } from 'next/headers'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE = 'admin_session'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createAdminSession(userId: number) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, String(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getAdminUserId(): Promise<number | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (!session) return null
  const id = parseInt(session.value)
  if (isNaN(id)) return null
  return id
}

export async function requireAdmin() {
  const userId = await getAdminUserId()
  if (!userId) {
    const { redirect } = await import('next/navigation')
    redirect('/admin/login')
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: userId as number } })
    if (!user) {
      const { redirect } = await import('next/navigation')
      redirect('/admin/login')
    }
    return user
  } catch {
    console.error('requireAdmin: database error, redirecting to login')
    const { redirect } = await import('next/navigation')
    redirect('/admin/login')
  }
}
