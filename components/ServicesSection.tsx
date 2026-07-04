type ServiceCard = {
  icon: React.ReactNode
  title: string
  description: string
}

const services: ServiceCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v6a6 6 0 0 0 12 0V4" /><path d="M20 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /><path d="M10 16v2a4 4 0 0 0 8 0v-1" />
      </svg>
    ),
    title: 'ตรวจรักษาโรคทั่วไป',
    description: 'ไข้ ไอ หวัด ท้องเสีย ปวดเมื่อย และอาการเจ็บป่วยเบื้องต้น',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M9 5h6" /><path d="M7 8h10l-1 12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 8z" />
      </svg>
    ),
    title: 'ฉีดวัคซีน',
    description: 'วัคซีนตามวัย วัคซีนไข้หวัดใหญ่ และวัคซีนสำหรับผู้เดินทาง',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
    title: 'ตรวจสุขภาพประจำปี',
    description: 'แพ็กเกจตรวจสุขภาพพื้นฐาน พร้อมอ่านผลและให้คำแนะนำ',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l2-8 4 16 2-8h6" />
      </svg>
    ),
    title: 'ตรวจแล็บพื้นฐาน',
    description: 'เจาะเลือด ตรวจปัสสาวะ และตรวจคัดกรองโรคเบื้องต้น',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20l-1-1c-4-3.5-7-6.2-7-9.5A4.5 4.5 0 0 1 8.5 5 5 5 0 0 1 12 6.5 5 5 0 0 1 15.5 5 4.5 4.5 0 0 1 20 9.5c0 3.3-3 6-7 9.5z" />
      </svg>
    ),
    title: 'ทำแผล เย็บแผล',
    description: 'ทำแผลสด แผลผ่าตัด และติดตามอาการจนแผลหาย',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
      </svg>
    ),
    title: 'ดูแลผู้สูงอายุ',
    description: 'ติดตามโรคเรื้อรัง ความดัน เบาหวาน และเยี่ยมบ้านเมื่อจำเป็น',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
      </svg>
    ),
    title: 'ดูแลโรคเรื้อรัง (NCD)',
    description: 'ติดตามความดันโลหิตสูง เบาหวาน ไขมันในเลือด อย่างต่อเนื่อง',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21c-4-3-8-6.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-4 8-8 11z" /><path d="M9 11l2 2 4-4" />
      </svg>
    ),
    title: 'วางแผนครอบครัว',
    description: 'ให้คำปรึกษาคุมกำเนิด และวางแผนมีบุตร',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z" /><path d="M9 9h6M9 12h4" />
      </svg>
    ),
    title: 'ตรวจโรคติดต่อทางเพศสัมพันธ์',
    description: 'ตรวจคัดกรอง ให้คำปรึกษาเป็นความลับ จ่ายยา PrEP / PEP และรักษาโรคติดต่อทางเพศสัมพันธ์',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--hw-mint-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v5h5" /><path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M9 13h6M9 17h4" />
      </svg>
    ),
    title: 'ใบรับรองแพทย์ และส่งต่อโรงพยาบาล',
    description: 'ออกใบรับรองแพทย์ พร้อมระบบส่งต่อเมื่อจำเป็นต้องรักษาต่อ',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: '64px 0' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: '560px', marginBottom: '38px' }}>
          <div style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '.04em',
            color: 'var(--hw-teal-700)', textTransform: 'uppercase',
          }}>
            บริการของเรา
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            ดูแลตั้งแต่อาการเล็กน้อยถึงสุขภาพระยะยาว
          </h2>
          <p style={{ color: 'var(--hw-ink-soft)', fontSize: '15px', marginTop: '10px' }}>
            ทีมแพทย์ตรวจวินิจฉัยและให้คำแนะนำอย่างใกล้ชิด พร้อมส่งต่อโรงพยาบาลเมื่อจำเป็น
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
        }}>
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                background: 'var(--hw-surface)',
                border: '1px solid var(--hw-line)',
                borderRadius: 'var(--hw-radius-md)',
                padding: '22px',
              }}
            >
              <div style={{
                width: '42px', height: '42px', borderRadius: '11px',
                background: 'var(--hw-mint-50)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px',
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--hw-ink-soft)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
