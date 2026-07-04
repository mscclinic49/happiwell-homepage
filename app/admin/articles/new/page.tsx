import ArticleForm from '../_components/ArticleForm'
import Link from 'next/link'

export default function NewArticlePage() {
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
          เพิ่มบทความใหม่
        </h1>
      </div>
      <ArticleForm />
    </div>
  )
}
