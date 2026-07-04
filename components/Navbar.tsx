import Image from 'next/image'

export default function Navbar() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ?? 'https://happiwell-telemed.netlify.app'

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(247, 250, 249, 0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--hw-line)',
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        maxWidth: '1120px',
        margin: '0 auto',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src="/images/logo.png"
            alt="แฮปปี้เวลล์ คลินิกเวชกรรม โลโก้"
            width={38}
            height={38}
            priority
            style={{ borderRadius: '11px' }}
          />
          <span style={{
            fontFamily: "'Anuphan', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--hw-mint-900)',
          }}>
            HappiWell <span style={{ color: 'var(--hw-apricot-600)' }}>Clinic</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{
          display: 'flex',
          gap: '28px',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--hw-ink-soft)',
        }} className="hw-nav-links">
          <a href="#services" style={{ transition: 'color .15s' }}>บริการ</a>
          <a href="#coverage" style={{ transition: 'color .15s' }}>สิทธิการรักษา</a>
          <a href="#news" style={{ transition: 'color .15s' }}>ข่าว/โปรโมชั่น</a>
          <a href="#doctor" style={{ transition: 'color .15s' }}>เกี่ยวกับเรา</a>
          <a href="#contact" style={{ transition: 'color .15s' }}>ติดต่อ / แผนที่</a>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="tel:0886837899"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--hw-mint-900)',
              fontWeight: 600,
              fontSize: '14px',
              padding: '9px 16px',
              borderRadius: '999px',
              border: '1px solid var(--hw-line)',
            }}
          >
            088-683-7899
          </a>
          <a
            href="https://line.me/R/ti/p/@p49clinic"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--hw-line-green)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              padding: '9px 18px',
              borderRadius: '999px',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
              <circle cx="12" cy="12" r="12" />
            </svg>
            LINE @p49clinic
          </a>
        </div>
      </nav>
    </header>
  )
}
