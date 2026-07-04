'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  category: string
  is_published: boolean
  published_at: string | null
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9฀-๿-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'system-ui, sans-serif',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color: '#1B2230',
  marginBottom: '6px',
}

const fieldStyle: React.CSSProperties = {
  marginBottom: '20px',
}

interface ArticleFormProps {
  article?: Article
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState(article?.title ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '')
  const [content, setContent] = useState(article?.content ?? '')
  const [category, setCategory] = useState(article?.category ?? 'news')
  const [coverImage, setCoverImage] = useState(article?.cover_image ?? '')
  const [isPublished, setIsPublished] = useState(article?.is_published ?? false)
  const [publishedAt, setPublishedAt] = useState(
    article?.published_at ? article.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10)
  )

  const [coverUploading, setCoverUploading] = useState(false)
  const [contentImgUploading, setContentImgUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugEdited, setSlugEdited] = useState(!!article?.slug)

  // Auto-generate slug from title (unless manually edited)
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(toSlug(title))
    }
  }, [title, slugEdited])

  const uploadCoverImage = useCallback(async (file: File) => {
    setCoverUploading(true)
    const supabase = createClient()
    const path = `cover/${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(path, file, { upsert: true })
    if (uploadError) {
      setError('อัปโหลดรูปภาพล้มเหลว: ' + uploadError.message)
      setCoverUploading(false)
      return
    }
    const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(path)
    setCoverImage(publicUrl)
    setCoverUploading(false)
  }, [])

  const insertContentImage = useCallback(async (file: File) => {
    setContentImgUploading(true)
    const supabase = createClient()
    const path = `content/${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(path, file, { upsert: true })
    if (uploadError) {
      setError('อัปโหลดรูปภาพล้มเหลว: ' + uploadError.message)
      setContentImgUploading(false)
      return
    }
    const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(path)

    // Insert at cursor
    const textarea = contentRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const mdImage = `\n![รูปภาพ](${publicUrl})\n`
      const newContent = content.slice(0, start) + mdImage + content.slice(end)
      setContent(newContent)
      // Re-focus and move cursor
      setTimeout(() => {
        textarea.focus()
        const pos = start + mdImage.length
        textarea.setSelectionRange(pos, pos)
      }, 0)
    } else {
      setContent(prev => prev + `\n![รูปภาพ](${publicUrl})\n`)
    }
    setContentImgUploading(false)
  }, [content])

  async function handleSubmit(publish: boolean) {
    if (!title.trim()) { setError('กรุณากรอกชื่อบทความ'); return }
    if (!content.trim()) { setError('กรุณากรอกเนื้อหาบทความ'); return }
    if (!slug.trim()) { setError('กรุณากรอก slug'); return }

    setSaving(true)
    setError(null)

    const supabase = createClient()

    // Check slug uniqueness (exclude current article on edit)
    const slugQuery = supabase.from('hw_articles').select('id').eq('slug', slug)
    if (article?.id) {
      slugQuery.neq('id', article.id)
    }
    const { data: existing } = await slugQuery.maybeSingle()
    if (existing) {
      setError('Slug นี้ถูกใช้แล้ว กรุณาเปลี่ยน slug')
      setSaving(false)
      return
    }

    const now = new Date().toISOString()
    const shouldPublish = publish
    const publishTime = shouldPublish
      ? (publishedAt ? new Date(publishedAt).toISOString() : now)
      : (article?.published_at ?? null)

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_image: coverImage || null,
      category,
      is_published: shouldPublish,
      published_at: shouldPublish ? publishTime : null,
      updated_at: now,
    }

    let opError
    if (article?.id) {
      const { error: e } = await supabase.from('hw_articles').update(payload).eq('id', article.id)
      opError = e
    } else {
      const { error: e } = await supabase.from('hw_articles').insert({ ...payload, created_at: now })
      opError = e
    }

    if (opError) {
      setError('บันทึกไม่สำเร็จ: ' + opError.message)
      setSaving(false)
      return
    }

    router.push('/admin/articles')
    router.refresh()
  }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', border: '1px solid #e5e7eb' }}>
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', color: '#b91c1c', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div style={fieldStyle}>
        <label style={labelStyle}>ชื่อบทความ *</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={inputStyle}
          placeholder="เช่น วัคซีนไข้หวัดใหญ่ ราคาพิเศษ..."
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Slug (URL) *</label>
        <input
          type="text"
          value={slug}
          onChange={e => { setSlug(e.target.value); setSlugEdited(true) }}
          style={inputStyle}
          placeholder="เช่น vaccine-flu-special"
        />
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
          จะแสดงเป็น: /articles/{slug || '...'}
        </span>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>หมวดหมู่</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ ...inputStyle, background: '#fff' }}
        >
          <option value="news">ข่าวประชาสัมพันธ์</option>
          <option value="promotion">โปรโมชั่น</option>
          <option value="article">บทความสุขภาพ</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>บทคัดย่อ (excerpt)</label>
        <textarea
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="สรุปสั้นๆ สำหรับแสดงในหน้าหลัก (ไม่เกิน 200 ตัวอักษร)"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>รูปปก (cover image)</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadCoverImage(f) }}
              style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}
            />
            {coverUploading && <span style={{ fontSize: '13px', color: '#6b7280' }}>กำลังอัปโหลด...</span>}
            {coverImage && (
              <div style={{ marginTop: '8px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="cover preview" style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
                <button
                  type="button"
                  onClick={() => setCoverImage('')}
                  style={{ display: 'block', marginTop: '6px', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px' }}
                >
                  ลบรูปปก
                </button>
              </div>
            )}
          </div>
          {coverImage && (
            <div style={{ flex: 1 }}>
              <label style={{ ...labelStyle, marginBottom: '4px' }}>URL รูปปก</label>
              <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} style={{ ...inputStyle, fontSize: '12px' }} />
            </div>
          )}
        </div>
      </div>

      <div style={fieldStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>เนื้อหา (Markdown) *</label>
          <label style={{ cursor: 'pointer', fontSize: '13px' }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) insertContentImage(f) }}
            />
            <span style={{ background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', color: '#374151' }}>
              {contentImgUploading ? 'กำลังอัปโหลด...' : '📷 แทรกรูปภาพ'}
            </span>
          </label>
        </div>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>
          รองรับ Markdown: **ตัวหนา** *ตัวเอียง* ## หัวข้อ - รายการ
        </p>
        <textarea
          ref={contentRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={18}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', lineHeight: '1.6' }}
          placeholder="เขียนเนื้อหาบทความที่นี่..."
        />
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={e => setIsPublished(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            เผยแพร่บทความ
          </label>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={labelStyle}>วันที่เผยแพร่</label>
          <input
            type="date"
            value={publishedAt}
            onChange={e => setPublishedAt(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={saving}
          style={{
            padding: '11px 24px',
            background: saving ? '#d1d5db' : '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          บันทึกร่าง
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={saving}
          style={{
            padding: '11px 24px',
            background: saving ? '#6b8fd4' : '#1B3A8C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'กำลังบันทึก...' : 'เผยแพร่'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          disabled={saving}
          style={{
            padding: '11px 24px',
            background: 'transparent',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '15px',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  )
}
