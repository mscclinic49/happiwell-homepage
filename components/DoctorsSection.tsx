import Image from 'next/image'
import type { Doctor } from '@/lib/supabase'

const DAY_LABELS: Record<number, string> = {
  0: 'อาทิตย์',
  1: 'จันทร์',
  2: 'อังคาร',
  3: 'พุธ',
  4: 'พฤหัสบดี',
  5: 'ศุกร์',
  6: 'เสาร์',
}

async function getDoctors(): Promise<Doctor[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return []

  try {
    const { createClient } = await import('@/lib/supabase')
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('get_doctors_with_schedule').select('*')

    // Fallback to direct query if RPC not available
    if (error || !data) {
      const { data: doctors } = await supabase
        .from('hw_doctors')
        .select(`
          id, full_name, specialty, bio, avatar_url, is_active, is_online,
          hw_doctor_schedules(day_of_week)
        `)
        .eq('is_active', true)
        .order('full_name')

      if (!doctors) return []

      return doctors.map((d) => ({
        id: d.id,
        full_name: d.full_name,
        specialty: d.specialty,
        bio: d.bio,
        avatar_url: d.avatar_url,
        is_active: d.is_active,
        is_online: d.is_online,
        days: (d.hw_doctor_schedules as { day_of_week: number }[] ?? [])
          .map((s) => s.day_of_week)
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort(),
      }))
    }

    return data as Doctor[]
  } catch {
    return []
  }
}

function DoctorAvatar({ doctor }: { doctor: Doctor }) {
  if (doctor.avatar_url) {
    return (
      <Image
        src={doctor.avatar_url}
        alt={`รูปถ่าย ${doctor.full_name}`}
        width={72}
        height={72}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    )
  }

  const initials = doctor.full_name
    .replace(/^(พญ\.|นพ\.|ดร\.)\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '20px', fontWeight: 700, color: 'var(--hw-mint-700)',
    }}>
      {initials}
    </div>
  )
}

// Static fallback doctors (from HTML source)
const STATIC_DOCTORS: Doctor[] = [
  {
    id: '1',
    full_name: 'พญ.กานต์ธีรา รัชพงษ์ไทย',
    specialty: 'เวชกรรม',
    bio: 'ใบประกอบวิชาชีพเวชกรรม ว.79019',
    avatar_url: '/images/doctor-1.jpg',
    is_active: true,
    is_online: false,
    days: [4, 5],
  },
  {
    id: '2',
    full_name: 'พญ.ณิชกานต์ ดีประเสริฐ',
    specialty: 'เวชกรรม',
    bio: 'ใบประกอบวิชาชีพเวชกรรม ว.75918',
    avatar_url: '/images/doctor-2.jpg',
    is_active: true,
    is_online: false,
    days: [1],
  },
  {
    id: '3',
    full_name: 'พญ.สิริลักษณ์ รุ่งศรี',
    specialty: 'เวชปฏิบัติทั่วไป',
    bio: 'ใบประกอบวิชาชีพเวชกรรม ว.23726',
    avatar_url: '/images/doctor-3.jpg',
    is_active: true,
    is_online: false,
    days: [0, 2],
  },
]

export default async function DoctorsSection() {
  const dbDoctors = await getDoctors()
  const doctors = dbDoctors.length > 0 ? dbDoctors : STATIC_DOCTORS

  return (
    <section id="doctor" style={{ padding: '64px 0' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: '560px', marginBottom: '38px' }}>
          <div style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '.04em',
            color: 'var(--hw-teal-700)', textTransform: 'uppercase',
          }}>
            ทีมแพทย์
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginTop: '8px' }}>
            แพทย์ประจำคลินิก
          </h2>
          <p style={{ color: 'var(--hw-ink-soft)', fontSize: '15px', marginTop: '10px' }}>
            ตารางเวรอาจมีการปรับเปลี่ยน แนะนำให้โทรสอบถามก่อนเข้ารับบริการ
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px',
        }}>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              style={{
                background: 'var(--hw-mint-50)',
                border: '1px solid var(--hw-mint-200)',
                borderRadius: 'var(--hw-radius-lg)',
                padding: '26px 22px',
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'var(--hw-mint-200)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
                overflow: 'hidden',
              }}>
                <DoctorAvatar doctor={doctor} />
              </div>

              <div style={{ color: 'var(--hw-mint-700)', fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
                {doctor.specialty ?? 'เวชกรรม'}
              </div>
              <h3 style={{ fontSize: '17px', marginBottom: '10px' }}>
                {doctor.full_name}
              </h3>

              {doctor.bio && (
                <span style={{
                  display: 'inline-block',
                  fontSize: '12px', fontWeight: 600,
                  color: 'var(--hw-mint-900)',
                  background: '#fff',
                  border: '1px solid var(--hw-mint-200)',
                  padding: '3px 10px', borderRadius: '999px',
                  marginBottom: '14px',
                }}>
                  {doctor.bio}
                </span>
              )}

              {doctor.days && doctor.days.length > 0 && (
                <>
                  <div style={{ fontSize: '12px', color: 'var(--hw-ink-soft)', marginBottom: '6px' }}>
                    วันที่ออกตรวจ
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {doctor.days.map((day) => (
                      <span key={day} style={{
                        fontSize: '12.5px', fontWeight: 600,
                        color: '#fff', background: 'var(--hw-mint-600)',
                        padding: '4px 11px', borderRadius: '999px',
                      }}>
                        {DAY_LABELS[day] ?? `วัน ${day}`}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
