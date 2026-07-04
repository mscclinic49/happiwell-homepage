import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import InsuranceSection from '@/components/InsuranceSection'
import DoctorsSection from '@/components/DoctorsSection'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://happiwell-clinic.com'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'หมอใกล้บ้าน ทุ่งครุ บางมด | แฮปปี้เวลล์ คลินิกเวชกรรม',
    description:
      'แฮปปี้เวลล์ คลินิกเวชกรรม เขตทุ่งครุ กรุงเทพฯ รับบัตรทอง 30 บาท ประกันสังคม เปิดทุกวัน ตรวจรักษาโรคทั่วไป ฉีดวัคซีน ตรวจสุขภาพ ดูแลผู้สูงอายุ',
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: 'หมอใกล้บ้าน ทุ่งครุ บางมด | แฮปปี้เวลล์ คลินิกเวชกรรม',
      description:
        'คลินิกเวชกรรมชุมชน เขตทุ่งครุ กรุงเทพฯ รับบัตรทอง ประกันสังคม เปิดทุกวัน 08:00–18:00',
      url: SITE_URL,
      siteName: 'แฮปปี้เวลล์ คลินิกเวชกรรม',
      locale: 'th_TH',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/logo.png`,
          width: 512,
          alt: 'แฮปปี้เวลล์ คลินิกเวชกรรม',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'แฮปปี้เวลล์ คลินิกเวชกรรม | ทุ่งครุ กรุงเทพฯ',
      description:
        'รับบัตรทอง ประกันสังคม เปิดทุกวัน 08:00–18:00 (จ–ศ) และ 08:00–12:00 (ส–อ)',
      images: [`${SITE_URL}/images/logo.png`],
    },
  }
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Trust strip */}
        <div style={{ background: 'var(--hw-mint-900)', padding: '22px 0' }}>
          <div className="hw-wrap" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px 40px',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'var(--hw-mint-100)',
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '0 24px',
          }}>
            <div><b style={{ color: '#fff', fontWeight: 600 }}>★ 4.8</b> จาก 19 รีวิวใน Google</div>
            <div><b style={{ color: '#fff', fontWeight: 600 }}>หน่วยบริการปฐมภูมิ</b> ในระบบ สปสช.</div>
            <div><b style={{ color: '#fff', fontWeight: 600 }}>ใบอนุญาตเลขที่</b> 10101035068</div>
          </div>
        </div>
        <ServicesSection />
        <InsuranceSection />
        <DoctorsSection />
        <NewsSection />
        {/* Contact section */}
        <section id="contact" style={{ background: 'var(--hw-mint-50)', padding: '64px 0' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: '560px', marginBottom: '38px' }}>
              <div style={{
                fontSize: '13px', fontWeight: 600, letterSpacing: '.04em',
                color: 'var(--hw-teal-700)', textTransform: 'uppercase',
              }}>ติดต่อเรา</div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
                แวะมาหาเราได้เลย
              </h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '.55fr .45fr',
              gap: '28px',
            }}>
              <div style={{
                background: 'var(--hw-mint-100)',
                borderRadius: 'var(--hw-radius-lg)',
                minHeight: '320px',
                border: '1px solid var(--hw-mint-200)',
                overflow: 'hidden',
              }}>
                <iframe
                  src="https://www.google.com/maps?q=13.648962,100.4964886&z=16&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่ HappiWell คลินิกเวชกรรม"
                />
              </div>
              <div style={{
                background: 'var(--hw-surface)',
                border: '1px solid var(--hw-line)',
                borderRadius: 'var(--hw-radius-lg)',
                padding: '28px',
              }}>
                {/* Address */}
                <div style={{ display: 'flex', gap: '14px', paddingBottom: '14px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--hw-mint-50)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', color: 'var(--hw-ink-soft)', marginBottom: '2px' }}>ที่อยู่</div>
                    <div style={{ fontSize: '14.5px', fontWeight: 600 }}>
                      195 ซอยประชาอุทิศ 49 แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderTop: '1px solid var(--hw-line)' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--hw-mint-50)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', color: 'var(--hw-ink-soft)', marginBottom: '2px' }}>โทรศัพท์</div>
                    <div style={{ fontSize: '14.5px', fontWeight: 600 }}>02-000-4586</div>
                  </div>
                </div>
                {/* LINE */}
                <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderTop: '1px solid var(--hw-line)' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--hw-mint-50)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <circle cx="12" cy="12" r="12" fill="var(--hw-line-green)" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', color: 'var(--hw-ink-soft)', marginBottom: '2px' }}>LINE Official Account</div>
                    <div style={{ fontSize: '14.5px', fontWeight: 600 }}>@happiwellclinic</div>
                  </div>
                </div>
                {/* Hours */}
                <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderTop: '1px solid var(--hw-line)' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--hw-mint-50)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', color: 'var(--hw-ink-soft)', marginBottom: '2px' }}>เวลาทำการ</div>
                    <div style={{ fontSize: '14.5px', fontWeight: 600 }}>
                      จ–ศ 08:00–18:00 · ส–อ 08:00–12:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
