import ClinicStatusBadge from './ClinicStatusBadge'

const HOURS_ROWS = [
  { day: 1, label: 'จันทร์', hours: '08:00 – 18:00' },
  { day: 2, label: 'อังคาร', hours: '08:00 – 18:00' },
  { day: 3, label: 'พุธ', hours: '08:00 – 18:00' },
  { day: 4, label: 'พฤหัสบดี', hours: '08:00 – 18:00' },
  { day: 5, label: 'ศุกร์', hours: '08:00 – 18:00' },
  { day: 6, label: 'เสาร์', hours: '08:00 – 12:00' },
  { day: 0, label: 'อาทิตย์', hours: '08:00 – 12:00' },
]

export default function HeroSection() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ?? 'https://happiwell-telemed.netlify.app'

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '64px 0 56px' }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        background: 'radial-gradient(circle at 82% 12%, var(--hw-mint-100) 0%, var(--hw-bg) 46%)',
      }} />

      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1.15fr .85fr',
        gap: '48px',
        alignItems: 'center',
      }}>
        {/* Left column */}
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '.04em',
            color: 'var(--hw-teal-700)',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            คลินิกเวชกรรม · เขตทุ่งครุ กรุงเทพฯ
          </div>

          <h1 style={{
            fontFamily: "'Anuphan', 'IBM Plex Sans Thai', sans-serif",
            fontSize: '40px',
            fontWeight: 700,
            color: 'var(--hw-mint-900)',
            margin: '14px 0 16px',
            maxWidth: '520px',
            lineHeight: 1.25,
          }}>
            หมอใกล้บ้าน ที่ดูแลคุณเหมือนคนในครอบครัว
          </h1>

          <p style={{
            fontSize: '17px',
            color: 'var(--hw-ink-soft)',
            maxWidth: '460px',
            marginBottom: '26px',
          }}>
            แฮปปี้เวลล์ คลินิกเวชกรรม ให้บริการตรวจรักษาโรคทั่วไป รับสิทธิบัตรทอง 30 บาท
            และประกันสังคม พร้อมทีมแพทย์และพยาบาลที่พร้อมดูแลทุกช่วงวัย
          </p>

          <ClinicStatusBadge />

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
            <a
              href="tel:0220004586"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '15px',
                padding: '12px 22px',
                borderRadius: '999px',
                background: 'var(--hw-mint-600)',
                color: '#fff',
                border: '1px solid transparent',
              }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              โทรนัดหมาย
            </a>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '15px',
                padding: '12px 22px',
                borderRadius: '999px',
                background: 'var(--hw-line-green)',
                color: '#fff',
                border: '1px solid transparent',
              }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff">
                <circle cx="12" cy="12" r="12" />
              </svg>
              แชทผ่าน LINE
            </a>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '15px',
                padding: '12px 22px',
                borderRadius: '999px',
                background: 'var(--hw-surface)',
                color: 'var(--hw-mint-900)',
                border: '1px solid var(--hw-line)',
              }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              ดูแผนที่
            </a>
          </div>

          {/* Coverage chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['บัตรทอง 30 บาท', 'ประกันสังคม', 'ชำระเงินสด'].map((chip) => (
              <span key={chip} style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--hw-teal-700)',
                background: 'var(--hw-teal-100)',
                border: '1px solid #B7E8DF',
                padding: '6px 14px',
                borderRadius: '999px',
              }}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Hours card */}
          <div style={{
            background: 'var(--hw-surface)',
            borderRadius: 'var(--hw-radius-lg)',
            border: '1px solid var(--hw-line)',
            padding: '26px',
          }}>
            <span style={{
              display: 'inline-block',
              background: 'var(--hw-apricot-100)',
              color: '#8C1D26',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: '999px',
              marginBottom: '14px',
            }}>
              เวลาทำการ
            </span>
            <h3 style={{ fontSize: '19px', marginBottom: '6px' }}>
              เปิดทุกวัน ยกเว้นวันหยุดนักขัตฤกษ์
            </h3>
            <table style={{ width: '100%', fontSize: '14px', marginTop: '14px', borderCollapse: 'collapse' }}>
              <tbody>
                {HOURS_ROWS.map((row) => (
                  <tr key={row.day}>
                    <td style={{
                      padding: '7px 0',
                      borderTop: '1px solid var(--hw-line)',
                      color: 'var(--hw-ink-soft)',
                    }}>
                      {row.label}
                    </td>
                    <td style={{
                      padding: '7px 0',
                      borderTop: '1px solid var(--hw-line)',
                      textAlign: 'right',
                      fontWeight: 600,
                      color: 'var(--hw-ink)',
                    }}>
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Emergency card */}
          <div style={{
            background: 'var(--hw-apricot-50)',
            borderRadius: 'var(--hw-radius-lg)',
            border: '1px solid #F6C4C8',
            padding: '20px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#fff',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#8C1D26', marginBottom: '2px' }}>
                เจ็บป่วยฉุกเฉิน โทรสายด่วน
              </div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: 'var(--hw-ink)' }}>
                <a href="tel:1669" style={{ color: 'var(--hw-ink)' }}>1669</a>
                {' · '}หน่วยแพทย์ฉุกเฉิน
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
