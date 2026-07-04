type NewsCard = {
  category: string
  categoryColor: string
  categoryBg: string
  thumbBg: string
  thumbIconColor: string
  title: string
  description: string
  date: string
  icon: React.ReactNode
}

const news: NewsCard[] = [
  {
    category: 'ข่าวประกาศสำคัญ',
    categoryColor: 'var(--hw-mint-700)',
    categoryBg: 'var(--hw-mint-100)',
    thumbBg: 'var(--hw-mint-100)',
    thumbIconColor: 'var(--hw-mint-700)',
    title: 'ปรับเวลาให้บริการช่วงเทศกาลสงกรานต์',
    description: 'แจ้งเวลาทำการช่วงวันหยุดยาว พร้อมช่องทางติดต่อฉุกเฉิน',
    date: '1 เม.ย. 2569',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--hw-mint-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v16l4-3h12V4H4z" /><path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    category: 'โปรโมชั่น',
    categoryColor: '#8C1D26',
    categoryBg: 'var(--hw-apricot-100)',
    thumbBg: 'var(--hw-apricot-50)',
    thumbIconColor: 'var(--hw-red)',
    title: 'วัคซีนไข้หวัดใหญ่ ราคาพิเศษเดือนนี้',
    description: 'สำหรับผู้สูงอายุและกลุ่มเสี่ยง จองคิวล่วงหน้าผ่าน LINE',
    date: 'ถึง 31 ก.ค. 2569',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--hw-red)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M9 5h6" /><path d="M7 8h10l-1 12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 8z" />
      </svg>
    ),
  },
  {
    category: 'บทความสุขภาพ',
    categoryColor: 'var(--hw-teal-700)',
    categoryBg: 'var(--hw-teal-100)',
    thumbBg: 'var(--hw-teal-100)',
    thumbIconColor: 'var(--hw-teal-700)',
    title: 'สังเกตอาการเตือนที่ไม่เด่นชัดของเลือดออกในสมอง',
    description: 'สัญญาณเตือนที่ไม่ควรมองข้าม และควรมาพบแพทย์เมื่อไร',
    date: '28 มิ.ย. 2569',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--hw-teal-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01" />
      </svg>
    ),
  },
]

export default function NewsSection() {
  return (
    <section id="news" style={{ padding: '64px 0' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: '560px', marginBottom: '38px' }}>
          <div style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '.04em',
            color: 'var(--hw-teal-700)', textTransform: 'uppercase',
          }}>
            ข่าวสารจากคลินิก
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            ข่าวประกาศสำคัญ โปรโมชั่น และบทความสุขภาพ
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
        }}>
          {news.map((item) => (
            <article
              key={item.title}
              style={{
                background: 'var(--hw-surface)',
                border: '1px solid var(--hw-line)',
                borderRadius: 'var(--hw-radius-md)',
                overflow: 'hidden',
              }}
            >
              <div style={{
                height: '120px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: item.thumbBg,
              }}>
                {item.icon}
              </div>
              <div style={{ padding: '18px 20px 20px' }}>
                <span style={{
                  fontSize: '11.5px', fontWeight: 700, letterSpacing: '.03em',
                  marginBottom: '8px', display: 'inline-block',
                  padding: '3px 10px', borderRadius: '999px',
                  color: item.categoryColor, background: item.categoryBg,
                }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '15.5px', fontWeight: 600, marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--hw-ink-soft)', marginBottom: '12px' }}>
                  {item.description}
                </p>
                <div style={{
                  fontSize: '12px', color: 'var(--hw-ink-soft)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>{item.date}</span>
                  <a href="#" style={{ color: 'var(--hw-mint-700)', fontWeight: 600 }}>
                    อ่านเพิ่มเติม →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
