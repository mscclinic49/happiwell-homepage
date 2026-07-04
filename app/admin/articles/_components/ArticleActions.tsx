'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

interface ArticleActionsProps {
  id: string
  isPublished: boolean
}

export default function ArticleActions({ id, isPublished }: ArticleActionsProps) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('ต้องการลบบทความนี้ใช่ไหม? การกระทำนี้ไม่สามารถยกเลิกได้')) return
    const supabase = createClient()
    await supabase.from('hw_articles').delete().eq('id', id)
    router.refresh()
  }

  async function handleTogglePublish() {
    const supabase = createClient()
    const updates: Record<string, unknown> = {
      is_published: !isPublished,
      updated_at: new Date().toISOString(),
    }
    if (!isPublished) {
      updates.published_at = new Date().toISOString()
    }
    await supabase.from('hw_articles').update(updates).eq('id', id)
    router.refresh()
  }

  const btnBase: React.CSSProperties = {
    padding: '5px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
  }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <a
        href={`/admin/articles/${id}/edit`}
        style={{
          ...btnBase,
          background: '#e0e7ff',
          color: '#3730a3',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        แก้ไข
      </a>
      <button
        onClick={handleTogglePublish}
        style={{
          ...btnBase,
          background: isPublished ? '#fef3c7' : '#d1fae5',
          color: isPublished ? '#92400e' : '#065f46',
        }}
      >
        {isPublished ? 'ถอนเผยแพร่' : 'เผยแพร่'}
      </button>
      <button
        onClick={handleDelete}
        style={{ ...btnBase, background: '#fee2e2', color: '#991b1b' }}
      >
        ลบ
      </button>
    </div>
  )
}
