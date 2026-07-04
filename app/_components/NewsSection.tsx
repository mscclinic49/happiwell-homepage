import { createClient } from '@/lib/supabase'
import Link from 'next/link'

const CATEGORY_LABELS: Record<string, string> = {
  news: 'ข่าวประชาสัมพันธ์',
  promotion: 'โปรโมชั่น',
  article: 'บทความสุขภาพ',
}

// Maps to homepage.css kicker background/color via inline styles
const CATEGORY_STYLE: Record<string, { bg: string; color: string; thumbBg: string; thumbStroke: string }> = {
  news: {
    bg: 'var(--mint-100)',
    color: 'var(--mint-700)',
    thumbBg: 'var(--mint-100)',
    thumbStroke: 'var(--mint-700)',
  },
  promotion: {
    bg: 'var(--apricot-100)',
    color: '#8C1D26',
    thumbBg: 'var(--apricot-50)',
    thumbStroke: 'var(--red)',
  },
  article: {
    bg: 'var(--teal-100)',
    color: 'var(--teal-700)',
    thumbBg: 'var(--teal-100)',
    thumbStroke: 'var(--teal-700)',
  },
}

function formatThaiDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Fallback icon for each category
function CategoryIcon({ category, stroke }: { category: string; stroke: string }) {
  if (category === 'news') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v16l4-3h12V4H4z"/>
        <path d="M8 9h8M8 13h5"/>
      </svg>
    )
  }
  if (category === 'promotion') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M9 5h6"/>
        <path d="M7 8h10l-1 12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 8z"/>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>
    </svg>
  )
}

// Static fallback articles shown when DB is empty or errors
const FALLBACK_ARTICLES = [
  {
    id: 'fallback-1',
    title: 'ปรับเวลาให้บริการช่วงเทศกาลสงกรานต์',
    excerpt: 'แจ้งเวลาทำการช่วงวันหยุดยาว พร้อมช่องทางติดต่อฉุกเฉิน',
    category: 'news',
    published_at: '2026-04-01T00:00:00Z',
    slug: null as null,
  },
  {
    id: 'fallback-2',
    title: 'วัคซีนไข้หวัดใหญ่ ราคาพิเศษเดือนนี้',
    excerpt: 'สำหรับผู้สูงอายุและกลุ่มเสี่ยง จองคิวล่วงหน้าผ่าน LINE',
    category: 'promotion',
    published_at: '2026-07-31T00:00:00Z',
    slug: null as null,
  },
  {
    id: 'fallback-3',
    title: 'สังเกตอาการไข้เลือดออกในเด็กช่วงหน้าฝน',
    excerpt: 'สัญญาณเตือนที่พ่อแม่ควรรู้ และควรพาลูกมาพบแพทย์เมื่อไร',
    category: 'article',
    published_at: '2026-06-28T00:00:00Z',
    slug: null as null,
  },
]

export default async function NewsSection() {
  let articles: Array<{
    id: string
    title: string
    excerpt: string | null
    category: string
    published_at: string | null
    slug: string | null
  }>

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('hw_articles')
      .select('id, title, excerpt, category, published_at, slug')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3)

    articles = (!error && data && data.length > 0) ? data : FALLBACK_ARTICLES
  } catch {
    articles = FALLBACK_ARTICLES
  }

  return (
    <section id="news">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">ข่าวสารจากคลินิก</div>
          <h2>ข่าวประชาสัมพันธ์ โปรโมชั่น และบทความสุขภาพ</h2>
        </div>
        <div className="news-grid">
          {articles.map(article => {
            const style = CATEGORY_STYLE[article.category] ?? CATEGORY_STYLE.news
            const label = CATEGORY_LABELS[article.category] ?? article.category
            const dateStr = article.published_at ? formatThaiDate(article.published_at) : ''
            const href = article.slug ? `/articles/${article.slug}` : '#'

            return (
              <div className="news-card" key={article.id}>
                <div className="thumb" style={{ background: style.thumbBg }}>
                  <CategoryIcon category={article.category} stroke={style.thumbStroke} />
                </div>
                <div className="body">
                  <span className="kicker" style={{ background: style.bg, color: style.color }}>
                    {label}
                  </span>
                  <h3>{article.title}</h3>
                  {article.excerpt && <p>{article.excerpt}</p>}
                  <div className="meta">
                    {dateStr && <span>{dateStr}</span>}
                    {article.slug && (
                      <Link href={href}>อ่านเพิ่มเติม →</Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
