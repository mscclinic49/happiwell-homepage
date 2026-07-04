import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/lib/supabase'
import './article.css'

const CATEGORY_LABELS: Record<string, string> = {
  news: 'ข่าวประชาสัมพันธ์',
  promotion: 'โปรโมชั่น',
  article: 'บทความสุขภาพ',
}

const CATEGORY_CSS: Record<string, string> = {
  news: 'kicker-news',
  promotion: 'kicker-promotion',
  article: 'kicker-article',
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: article } = await supabase
    .from('hw_articles')
    .select('title, excerpt, cover_image, published_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!article) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://happiwell-clinic.com'

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.cover_image ? [{ url: article.cover_image }] : [],
      locale: 'th_TH',
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      siteName: 'แฮปปี้เวลล์ คลินิกเวชกรรม',
      url: `${siteUrl}/articles/${slug}`,
    },
  }
}

function formatThaiDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('hw_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!article) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://happiwell-clinic.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    url: `${siteUrl}/articles/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'แฮปปี้เวลล์ คลินิกเวชกรรม',
      url: siteUrl,
    },
  }

  return (
    <div className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="article-header">
        <Link href="/">← กลับหน้าหลัก</Link>
      </header>

      <div className="article-container">
        <span className={`article-kicker ${CATEGORY_CSS[article.category] ?? ''}`}>
          {CATEGORY_LABELS[article.category] ?? article.category}
        </span>

        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          {article.published_at && (
            <span>{formatThaiDate(article.published_at)}</span>
          )}
          {article.excerpt && (
            <span style={{ color: '#6b7280' }}>{article.excerpt}</span>
          )}
        </div>

        {article.cover_image ? (
          <Image
            src={article.cover_image}
            alt={article.title}
            width={760}
            height={360}
            className="article-cover"
            priority
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="article-cover-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v16l4-3h12V4H4z"/>
              <path d="M8 9h8M8 13h5"/>
            </svg>
          </div>
        )}

        <article className="article-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>

        <hr className="article-divider" />

        <Link href="/" className="article-back">
          ← กลับหน้าหลัก
        </Link>
      </div>
    </div>
  )
}
