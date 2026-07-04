import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import ArticleActions from './_components/ArticleActions'

const CATEGORY_LABELS: Record<string, string> = {
  news: 'ข่าวประชาสัมพันธ์',
  promotion: 'โปรโมชั่น',
  article: 'บทความสุขภาพ',
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  news: { bg: '#dbeafe', color: '#1e40af' },
  promotion: { bg: '#fce7f3', color: '#9d174d' },
  article: { bg: '#d1fae5', color: '#065f46' },
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function AdminArticlesPage() {
  const supabase = await createClient()
  const { data: articles, error } = await supabase
    .from('hw_articles')
    .select('id, title, slug, category, is_published, published_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1B2230' }}>จัดการบทความ</h1>
          <p style={{ margin: '4px 0 0', color: '#525A6B', fontSize: '14px' }}>
            {articles?.length ?? 0} บทความทั้งหมด
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          style={{
            background: '#1B3A8C',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          + เพิ่มบทความใหม่
        </Link>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', color: '#b91c1c', marginBottom: '24px' }}>
          เกิดข้อผิดพลาด: {error.message}
        </div>
      )}

      {(!articles || articles.length === 0) ? (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '48px', textAlign: 'center', color: '#525A6B', border: '1px dashed #d1d5db' }}>
          <p style={{ margin: 0, fontSize: '16px' }}>ยังไม่มีบทความ คลิก &quot;เพิ่มบทความใหม่&quot; เพื่อเริ่มต้น</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>ชื่อบทความ</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', width: '150px' }}>หมวดหมู่</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', width: '100px' }}>สถานะ</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', width: '130px' }}>เผยแพร่เมื่อ</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', width: '220px' }}>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => {
                const catStyle = CATEGORY_COLORS[article.category] ?? { bg: '#f3f4f6', color: '#374151' }
                return (
                  <tr key={article.id} style={{ borderBottom: i < articles.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 500, color: '#1B2230' }}>{article.title}</div>
                      <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>{article.slug}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        background: catStyle.bg,
                        color: catStyle.color,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}>
                        {CATEGORY_LABELS[article.category] ?? article.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        background: article.is_published ? '#d1fae5' : '#f3f4f6',
                        color: article.is_published ? '#065f46' : '#6b7280',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}>
                        {article.is_published ? 'เผยแพร่แล้ว' : 'ร่าง'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>
                      {formatDate(article.published_at)}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <ArticleActions id={article.id} isPublished={article.is_published} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
