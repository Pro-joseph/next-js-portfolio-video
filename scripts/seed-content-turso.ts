import { createClient } from '@libsql/client'

const turso = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function seed() {
  const now = new Date().toISOString()

  // ── Categories ──
  const categories = [
    { name: 'Wedding', slug: 'wedding', description: 'Cinematic wedding films' },
    { name: 'Commercial', slug: 'commercial', description: 'Brand and commercial production' },
    { name: 'Music Video', slug: 'music-video', description: 'Music video production' },
  ]
  for (const cat of categories) {
    const exists = await turso.execute({ sql: 'SELECT id FROM categories WHERE slug = ?', args: [cat.slug] })
    if (exists.rows.length === 0) {
      await turso.execute({
        sql: 'INSERT INTO categories (name, slug, description, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?)',
        args: [cat.name, cat.slug, cat.description, now, now],
      })
      console.log(`Category "${cat.name}" created`)
    } else {
      console.log(`Category "${cat.name}" already exists`)
    }
  }

  // ── Projects ──
  const projects = [
    { title: 'Sunset Wedding — Emma & James', categorySlug: 'wedding', description: 'A cinematic celebration of love set against a golden hour coastline. Every moment captured with intention and warmth.', coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920', isFeatured: 1 },
    { title: 'Nike — City Pulse Campaign', categorySlug: 'commercial', description: 'High-energy commercial capturing the rhythm of urban athletes. Shot on location across three cities.', coverImage: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=1920', isFeatured: 1 },
    { title: 'Aurora — Official Music Video', categorySlug: 'music-video', description: 'Dreamlike visuals blending practical effects with digital compositing for an ethereal narrative.', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920', isFeatured: 1 },
    { title: 'Lakeside Elopement — Sarah & Tom', categorySlug: 'wedding', description: 'Intimate elopement documentary set in the mountains. Natural light, authentic moments, timeless storytelling.', coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920', isFeatured: 0 },
  ]
  for (const proj of projects) {
    const exists = await turso.execute({ sql: 'SELECT id FROM projects WHERE title = ?', args: [proj.title] })
    if (exists.rows.length === 0) {
      const cat = await turso.execute({ sql: 'SELECT id FROM categories WHERE slug = ?', args: [proj.categorySlug] })
      const catId = cat.rows[0]?.id as number | undefined
      await turso.execute({
        sql: 'INSERT INTO projects (title, description, cover_image, category_id, is_featured, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        args: [proj.title, proj.description, proj.coverImage, catId || null, proj.isFeatured, now, now],
      })
      console.log(`Project "${proj.title}" created`)
    } else {
      console.log(`Project "${proj.title}" already exists`)
    }
  }

  // ── Testimonials ──
  const testimonials = [
    { clientName: 'Emma Johnson', body: 'We couldn\'t have asked for a better filmmaker. Every frame of our wedding film feels like a work of art. The emotion, the sound, the pacing — absolutely perfect.', rating: 5, serviceType: 'Wedding' },
    { clientName: 'Marcus Chen', body: 'Working with this team on our brand campaign was seamless. They understood our vision from day one and delivered something that exceeded every expectation.', rating: 5, serviceType: 'Commercial' },
    { clientName: 'Luna Rivera', body: 'The music video they created for "Aurora" brought my song to life in ways I never imagined. Truly collaborative, creative, and technically brilliant.', rating: 5, serviceType: 'Music Video' },
  ]
  for (const t of testimonials) {
    const exists = await turso.execute({ sql: 'SELECT id FROM testimonials WHERE client_name = ?', args: [t.clientName] })
    if (exists.rows.length === 0) {
      await turso.execute({
        sql: 'INSERT INTO testimonials (client_name, body, rating, service_type, is_visible, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)',
        args: [t.clientName, t.body, t.rating, t.serviceType, now, now],
      })
      console.log(`Testimonial "${t.clientName}" created`)
    } else {
      console.log(`Testimonial "${t.clientName}" already exists`)
    }
  }

  // ── Packages ──
  const packages = [
    { name: 'Essentials', description: 'Perfect for intimate events and small projects. Includes 4 hours of coverage, edited highlight reel (3-5 min), and online delivery.', price: 1500, icon: 'camera' },
    { name: 'Premium', description: 'Our most popular package. Full-day coverage (8 hours), cinematic highlight reel (5-8 min), full ceremony/edit, drone footage, and raw archive.', price: 3500, icon: 'film' },
    { name: 'Elite', description: 'The complete experience. Multi-camera setup, two videographers, full-day coverage, premium highlight reel, full-length feature edit, drone, behind-the-scenes, and priority support.', price: 6500, icon: 'award' },
  ]
  for (const p of packages) {
    const exists = await turso.execute({ sql: 'SELECT id FROM packages WHERE name = ?', args: [p.name] })
    if (exists.rows.length === 0) {
      await turso.execute({
        sql: 'INSERT INTO packages (name, description, price, icon, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)',
        args: [p.name, p.description, p.price, p.icon, now, now],
      })
      console.log(`Package "${p.name}" created`)
    } else {
      console.log(`Package "${p.name}" already exists`)
    }
  }

  console.log('\nContent seed complete!')
}

seed().catch(console.error)