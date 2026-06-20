const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@oumalk.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@oumalk.com', password: hash },
  })
  console.log('OK: admin@oumalk.com / admin123')
}

main().catch(console.error).finally(() => prisma.$disconnect())
