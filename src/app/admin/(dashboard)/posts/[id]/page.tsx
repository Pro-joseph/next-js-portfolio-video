import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AdminForm } from '@/lib/admin-form'
import { upsertPost } from '../actions'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })
  if (!post) notFound()

  return (
    <div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--text)', marginBottom: '2rem' }}>Edit Post</h1>
      <AdminForm action={upsertPost} fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'body', label: 'Body (HTML)', type: 'textarea', required: true },
        { name: 'coverImage', label: 'Cover Image URL', type: 'url' },
        { name: 'status', label: 'Status', type: 'select', options: [
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
          { value: 'archived', label: 'Archived' },
        ] },
        { name: 'publishedAt', label: 'Publish now', type: 'checkbox' },
      ]} initial={{ ...post, publishedAt: !!post.publishedAt }} cancelHref="/admin/posts" />
    </div>
  )
}
