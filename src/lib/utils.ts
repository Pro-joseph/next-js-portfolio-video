export function resolveImagePath(path: string | null): string | null {
  if (!path) return null

  if (path.includes('drive.google.com/file/d/')) {
    const match = path.match(/\/d\/([^/]+)/)
    if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  }

  if (path.startsWith('http')) return path

  if (!path.startsWith('/')) return `/storage/${path}`

  return path
}

export function resolveCoverImage(coverImage: string | null): string | null {
  return resolveImagePath(coverImage)
}

export function getImagesFromJson(imagePath: string | null): string[] {
  if (!imagePath) return []

  try {
    const parsed = JSON.parse(imagePath)
    if (Array.isArray(parsed)) return parsed.map(resolveImagePath).filter(Boolean) as string[]
  } catch {}

  const resolved = resolveImagePath(imagePath)
  return resolved ? [resolved] : []
}

export function getFirstImage(imagePath: string | null): string | null {
  const images = getImagesFromJson(imagePath)
  return images[0] ?? null
}

export function parseVideoUrl(url: string): string | null {
  if (!url) return null

  // YouTube Shorts
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`

  // YouTube
  const ytMatch = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  // Google Drive
  const driveMatch = url.match(/\/d\/([^/]+)/)
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`

  return url
}

export function getYouTubeThumbnail(url: string): string | null {
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortsMatch) return `https://img.youtube.com/vi/${shortsMatch[1]}/mqdefault.jpg`

  const ytMatch = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`

  return null
}

export function resolveClientLogo(logo: string | null): string | null {
  return resolveImagePath(logo)
}

export function resolveGalleryImage(imagePath: string | null): string | null {
  return resolveImagePath(imagePath)
}

export type SiteSettingsMap = {
  header: Record<string, string>
  footer: Record<string, string>
  social: Record<string, string>
  contact: Record<string, string>
  colors: Record<string, string>
  [key: string]: Record<string, string>
}

export function buildSiteSettingsMap(
  allSettings: Record<string, string>,
  customizations: { key: string; value: string | null; group: string }[]
): SiteSettingsMap {
  const map: SiteSettingsMap = {
    header: {},
    footer: {},
    social: {},
    contact: {},
    colors: {},
  }

  for (const [key, value] of Object.entries(allSettings)) {
    const group = customizations.find(c => c.key === key)?.group || 'general'
    if (!map[group]) map[group] = {}
    map[group][key] = value ?? ''
  }

  return map
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}
