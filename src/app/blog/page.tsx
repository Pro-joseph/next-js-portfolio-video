import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cinematic Research',
  description: 'Research logs and articles on cinematography, filmmaking techniques, and video production insights',
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <main className="pt-32 pb-24" style={{ background: 'var(--bg)' }}>
      <div className="px-6 md:px-12" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="space-y-6 mb-16">
          <span className="technical-hud block" style={{ color: 'var(--orange)' }}>// RESEARCH_LOGS_ACTIVE</span>
          <h1 className="text-6xl md:text-8xl uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)' }}>
            Cinematic Research
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.length > 0 ? posts.map(post => (
            <article
              key={post.id}
              className="glass"
              style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', cursor: 'pointer', transition: 'border-color 0.3s ease' }}
            >
              <style>{`article:hover { border-color: var(--orange); }`}</style>
              <span className="technical-hud block mb-6" style={{ color: 'var(--orange)', fontSize: '10px' }}>
                {post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0].replace(/-/g, '.') : ''}
              </span>
              <h2 className="text-2xl uppercase mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)', transition: 'color 0.3s ease' }}>
                {post.title}
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.body.replace(/<[^>]*>/g, '').substring(0, 150)}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="technical-hud inline-flex items-center gap-2"
                style={{ color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s ease' }}
              >
                READ_FULL_LOG
                <span className="text-sm">→</span>
              </Link>
            </article>
          )) : (
            <div className="col-span-full py-24 text-center border border-dashed" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="technical-hud italic" style={{ color: 'var(--muted)' }}>
                NO_RESEARCH_LOGS_FOUND_IN_ARCHIVE
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
