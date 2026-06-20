import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { ContactClient } from './ContactClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Oumalk to discuss your next video project — weddings, events, and commercial content',
}

export default async function ContactPage() {
  const [packages, categories, customizations] = await Promise.all([
    prisma.package.findMany({ where: { isActive: true } }),
    prisma.category.findMany({ where: { isActive: true } }),
    prisma.siteCustomization.findMany({ where: { isActive: true, group: 'contact' } }),
  ])

  const contact: Record<string, string> = {}
  for (const c of customizations) {
    if (c.value) contact[c.key] = c.value
  }

  const serializedPackages = packages.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    features: (() => { try { return JSON.parse(p.features ?? '[]') } catch { return [] } })(),
  }))

  const serializedCategories = categories.map(c => ({ id: c.id, name: c.name }))

  return (
    <ContactClient
      email={contact.contact_email || 'hello@frameflow.com'}
      phone={contact.contact_phone || '+1 (555) 123-4567'}
      categories={serializedCategories}
      packages={serializedPackages}
    />
  )
}
