import Link from 'next/link'
import AdminLogout from './_components/AdminLogout'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{
        background: '#1B3A8C',
        color: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>
            แฮปปี้เวลล์ | Admin
          </span>
          <Link
            href="/admin/articles"
            style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '14px' }}
          >
            จัดการบทความ
          </Link>
        </div>
        <AdminLogout />
      </nav>
      <main style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
