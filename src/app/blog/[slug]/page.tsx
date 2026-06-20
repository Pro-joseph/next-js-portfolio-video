import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.body.replace(/<[^>]*>/g, '').substring(0, 160) || undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })

  if (!post) notFound()

  return (
    <main className="pt-32 pb-24" style={{ background: 'var(--bg)' }}>
      <article style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <header className="space-y-6 mb-12">
          <span className="technical-hud block" style={{ color: 'var(--orange)' }}>
            // RESEARCH_LOG_{post.id} // {post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0].replace(/-/g, '.') : ''}
          </span>
          <h1 className="text-5xl md:text-7xl uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--text)' }}>
            {post.title}
          </h1>
          {post.coverImage && (
            <div className="aspect-video overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              <img
                src={post.coverImage.startsWith('http') ? post.coverImage : `/images/${post.coverImage}`}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1)' }}
                alt={post.title}
              />
            </div>
          )}
        </header>

        <div
          className="prose-invert max-w-none space-y-8"
          style={{ color: 'var(--muted)', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <footer className="pt-12 mt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/blog" className="technical-hud inline-flex items-center gap-2" style={{ color: 'var(--orange)', textDecoration: 'none', transition: 'color 0.3s ease' }}>
            <span className="text-sm">←</span> RETURN_TO_ARCHIVE
          </Link>
        </footer>
      </article>
    </main>
  )
}
