import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'

const turso = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function main() {
  // Check if admin exists
  const existing = await turso.execute("SELECT id FROM users WHERE email = 'admin@oumalk.com'")
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash('admin123', 10)
    const now = new Date().toISOString()
    await turso.execute({
      sql: 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      args: ['Admin', 'admin@oumalk.com', hash, now, now],
    })
    console.log('Admin user created (admin@oumalk.com / admin123)')
  } else {
    console.log('Admin user already exists')
  }

  // Seed page sections
  const sections = [
    { key: 'hero', title: 'Visual Storyteller', subtitle: 'Video Production & Creative Direction', body: 'Crafting compelling narratives through motion, light, and sound.', extras: JSON.stringify({ images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920', 'https://images.unsplash.com/photo-1504275490777-45f30792f13f?w=1920', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920'] }), order: 1 },
    { key: 'about', title: 'About Me', body: 'I\'m a filmmaker and creative director with over a decade of experience crafting visual narratives for brands, artists, and agencies. My work spans commercial campaigns, music videos, and documentary features — each project built on a foundation of cinematic storytelling and technical precision.', buttonText: 'View Portfolio', buttonLink: '/portfolio', order: 2 },
    { key: 'cta', title: 'Let\'s Create Something', subtitle: 'Have a project in mind? Let\'s talk about bringing your vision to life.', buttonText: 'Get in Touch', buttonLink: '/contact', order: 3 },
  ]

  const now = new Date().toISOString()
  for (const s of sections) {
    const exists = await turso.execute({ sql: 'SELECT id FROM page_sections WHERE key = ?', args: [s.key] })
    if (exists.rows.length === 0) {
      await turso.execute({
        sql: 'INSERT INTO page_sections (key, title, subtitle, body, extras, button_text, button_link, "order", created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [s.key, s.title, s.subtitle || null, s.body || null, s.extras || null, s.buttonText || null, s.buttonLink || null, s.order, now, now],
      })
      console.log(`Page section "${s.key}" created`)
    } else {
      console.log(`Page section "${s.key}" already exists`)
    }
  }

  console.log('\nSeed complete!')
}

main().catch(console.error)