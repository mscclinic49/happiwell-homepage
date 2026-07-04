import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://happiwell-clinic.com'),
  title: {
    template: '%s | แฮปปี้เวลล์ คลินิกเวชกรรม',
    default: 'แฮปปี้เวลล์ คลินิกเวชกรรม | HappiWell Medical Clinic',
  },
  description:
    'แฮปปี้เวลล์ คลินิกเวชกรรม เขตทุ่งครุ บางมด กรุงเทพฯ รับบัตรทอง 30 บาท ประกันสังคม ตรวจรักษาโรคทั่วไป ฉีดวัคซีน ตรวจสุขภาพ',
  keywords: [
    'คลินิกเวชกรรม',
    'บัตรทอง',
    'ทุ่งครุ',
    'บางมด',
    'HappiWell',
    'แฮปปี้เวลล์',
    'ประกันสังคม',
    'คลินิกใกล้บ้าน',
    'ตรวจรักษา',
  ],
  openGraph: {
    siteName: 'แฮปปี้เวลล์ คลินิกเวชกรรม',
    locale: 'th_TH',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'แฮปปี้เวลล์ คลินิกเวชกรรม',
  alternateName: 'HappiWell Medical Clinic',
  description:
    'คลินิกเวชกรรมชุมชน เขตทุ่งครุ กรุงเทพฯ รับบัตรทอง ประกันสังคม และเงินสด',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://happiwell-clinic.com',
  telephone: '02-000-4586',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '195 ซอยประชาอุทิศ 49',
    addressLocality: 'แขวงบางมด เขตทุ่งครุ',
    addressRegion: 'กรุงเทพมหานคร',
    postalCode: '10140',
    addressCountry: 'TH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.648962,
    longitude: 100.4964886,
  },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa-Su 08:00-12:00'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 19,
    bestRating: 5,
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
