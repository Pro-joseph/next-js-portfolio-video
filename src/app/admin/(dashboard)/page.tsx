import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [projects, categories, clients, testimonials, packages, posts, messages] = await Promise.all([
    prisma.project.count(),
    prisma.category.count(),
    prisma.client.count(),
    prisma.testimonial.count(),
    prisma.package.count(),
    prisma.post.count(),
    prisma.contactMessage.count(),
  ])

  const unreadMessages = await prisma.contactMessage.count({ where: { isRead: false } })

  const cards = [
    { label: 'Projects', count: projects },
    { label: 'Categories', count: categories },
    { label: 'Clients', count: clients },
    { label: 'Testimonials', count: testimonials },
    { label: 'Packages', count: packages },
    { label: 'Posts', count: posts },
    { label: 'Messages', count: messages, badge: unreadMessages > 0 ? `${unreadMessages} unread` : undefined },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.label}</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--orange)' }}>{card.count}</p>
            {card.badge && <p style={{ color: 'var(--orange)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{card.badge}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
