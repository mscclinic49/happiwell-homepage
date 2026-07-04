export default function InsuranceSection() {
  return (
    <section id="coverage" style={{ background: 'var(--hw-mint-50)', padding: '64px 0' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: '560px', marginBottom: '38px' }}>
          <div style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '.04em',
            color: 'var(--hw-teal-700)', textTransform: 'uppercase',
          }}>
            สิทธิการรักษา
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            เลือกใช้สิทธิที่คุณมีได้ทันที
          </h2>
          <p style={{ color: 'var(--hw-ink-soft)', fontSize: '15px', marginTop: '10px' }}>
            แจ้งเจ้าหน้าที่หน้าเคาน์เตอร์พร้อมบัตรประชาชนหรือบัตรแสดงสิทธิของคุณ
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
        }}>
          {/* บัตรทอง - Featured */}
          <div style={{
            borderRadius: 'var(--hw-radius-md)',
            padding: '24px',
            border: '1px solid var(--hw-mint-900)',
            background: 'var(--hw-mint-900)',
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '11px', fontWeight: 700, letterSpacing: '.03em',
              background: 'var(--hw-apricot-100)', color: '#8C1D26',
              padding: '3px 10px', borderRadius: '999px', marginBottom: '10px',
            }}>
              ยอดนิยม
            </span>
            <h3 style={{ fontSize: '17px', marginBottom: '8px', color: '#fff' }}>
              บัตรทอง 30 บาท
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--hw-mint-100)' }}>
              รักษาฟรีตามสิทธิหลักประกันสุขภาพแห่งชาติ สำหรับผู้มีสิทธิในพื้นที่และปริมณฑล
            </p>
          </div>

          {/* ประกันสังคม */}
          <div style={{
            borderRadius: 'var(--hw-radius-md)',
            padding: '24px',
            border: '1px solid var(--hw-line)',
            background: 'var(--hw-surface)',
          }}>
            <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>ประกันสังคม</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--hw-ink-soft)' }}>
              ผู้ประกันตนสามารถใช้บริการได้โดยไม่ต้องสำรองจ่าย ตั้งแต่วันที่ 1 มกราคม 2570
            </p>
          </div>

          {/* ประกันเอกชน */}
          <div style={{
            borderRadius: 'var(--hw-radius-md)',
            padding: '24px',
            border: '1px solid var(--hw-line)',
            background: 'var(--hw-surface)',
          }}>
            <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>ประกันเอกชน</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--hw-ink-soft)' }}>
              อยู่ระหว่างเจรจากับบริษัทประกัน
            </p>
          </div>

          {/* เงินสด */}
          <div style={{
            borderRadius: 'var(--hw-radius-md)',
            padding: '24px',
            border: '1px solid var(--hw-line)',
            background: 'var(--hw-surface)',
          }}>
            <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>ชำระเงินสด</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--hw-ink-soft)' }}>
              สำหรับสิทธิอื่นๆ สามารถขอรับใบรับรองแพทย์และใบเสร็จ เพื่อเบิกตรงกับหน่วยงาน
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
