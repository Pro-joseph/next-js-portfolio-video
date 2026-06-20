'use server'

import { destroyAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  await destroyAdminSession()
  redirect('/admin/login')
}

const modelMap: Record<string, any> = {
  project: prisma.project,
  category: prisma.category,
  client: prisma.client,
  testimonial: prisma.testimonial,
  package: prisma.package,
  pageSection: prisma.pageSection,
  post: prisma.post,
  galleryImage: prisma.galleryImage,
  media: prisma.media,
  contactMessage: prisma.contactMessage,
  siteSetting: prisma.siteSetting,
  siteCustomization: prisma.siteCustomization,
}

export async function deleteResourceAction(formData: FormData) {
  const model = formData.get('model') as string
  const id = parseInt(formData.get('id') as string)
  const path = formData.get('path') as string || `/admin/${model.replace(/([A-Z])/g, '-$1').toLowerCase()}s`

  const delegate = modelMap[model]
  if (!delegate) throw new Error(`Unknown model: ${model}`)

  const item = await delegate.findUnique({ where: { id } })
  if (item?.deletedAt === undefined) {
    await delegate.delete({ where: { id } })
  } else {
    await delegate.update({ where: { id }, data: { deletedAt: new Date() } })
  }

  revalidatePath(path)
}
