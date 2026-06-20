import { prisma } from './prisma'
import type { SiteSettingsMap } from './utils'

let cached: SiteSettingsMap | null = null

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  if (cached) return cached

  const [settings, customizations] = await Promise.all([
    prisma.siteSetting.findMany({ where: { isVisible: true } }),
    prisma.siteCustomization.findMany({ where: { isActive: true } }),
  ])

  const allSettings: Record<string, string> = {}
  for (const s of settings) {
    if (s.value) allSettings[s.key] = s.value
  }
  for (const c of customizations) {
    if (c.value) allSettings[c.key] = c.value
  }

  const map: SiteSettingsMap = {
    header: {},
    footer: {},
    social: {},
    contact: {},
    colors: {},
  }

  for (const c of customizations) {
    if (!map[c.group]) map[c.group] = {}
    if (c.value) map[c.group][c.key] = c.value
  }

  cached = map
  return map
}

export function invalidateSiteSettingsCache() {
  cached = null
}
