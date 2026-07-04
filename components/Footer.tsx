import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--hw-mint-900)', color: 'var(--hw-mint-100)', padding: '44px 0 26px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '30px',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="/images/footer-logo.png"
              alt="แฮปปี้เวลล์ คลินิกเวชกรรม"
              width={34}
              height={34}
              style={{ borderRadius: '9px' }}
            />
            <span style={{
              fontFamily: "'Anuphan', sans-serif",
              fontWeight: 700,
              color: '#fff',
              fontSize: '16px',
            }}>
              HappiWell คลินิกเวชกรรม
            </span>
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: 'var(--hw-mint-200)' }}>
            <a href="tel:0220004586" style={{ color: 'var(--hw-mint-100)', fontWeight: 600 }}>☎ 02-000-4586</a>
            <a href="tel:0886837899" style={{ color: 'var(--hw-mint-100)', fontWeight: 600 }}>📱 088-683-7899</a>
            <a href="https://line.me/R/ti/p/@p49clinic" target="_blank" rel="noopener noreferrer" style={{ color: '#06C755', fontWeight: 600 }}>LINE @p49clinic</a>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="#"
              aria-label="Facebook แฮปปี้เวลล์ คลินิก"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram แฮปปี้เวลล์ คลินิก"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                <path d="M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8 2 8.3 2 11 2h1zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.2-3.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
              </svg>
            </a>
            <a
              href="https://line.me/R/ti/p/@p49clinic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE แฮปปี้เวลล์ คลินิก"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                <circle cx="12" cy="12" r="12" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.12)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12.5px',
          color: 'var(--hw-mint-200)',
        }}>
          <span>© 2026 HappiWell Medical Clinic. สงวนลิขสิทธิ์.</span>
          <span style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#">นโยบายความเป็นส่วนตัว (PDPA)</a>
            <a href="#">นโยบายคุกกี้</a>
            <span>เลขที่ใบอนุญาตประกอบกิจการสถานพยาบาล 10101035068</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
