import { PrismaClient } from './src/generated/prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@oumalk.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@oumalk.com',
      password: hash,
    },
  })
  console.log('User created:', user.email, '| Password: admin123')
}

main().catch(console.error).finally(() => prisma.$disconnect())
