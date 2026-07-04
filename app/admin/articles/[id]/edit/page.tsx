import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ArticleForm from '../../_components/ArticleForm'
import Link from 'next/link'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: EditPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('hw_articles')
    .select('id, title, slug, excerpt, content, cover_image, category, is_published, published_at')
    .eq('id', id)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Link
          href="/admin/articles"
          style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
        >
          ← กลับ
        </Link>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1B2230' }}>
          แก้ไขบทความ
        </h1>
      </div>
      <ArticleForm article={article} />
    </div>
  )
}
