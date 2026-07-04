import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://happiwell-clinic.com'

  let articleUrls: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()
    const { data: articles } = await supabase
      .from('hw_articles')
      .select('slug, updated_at')
      .eq('is_published', true)

    articleUrls = (articles ?? []).map(a => ({
      url: `${siteUrl}/articles/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // DB unavailable at build time — skip article URLs
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...articleUrls,
  ]
}
