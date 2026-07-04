'use client'

import { useEffect, useState } from 'react'

type StatusState = {
  isOpen: boolean
  text: string
  nextInfo: string
}

const SCHEDULE: Record<number, { open: number; close: number }> = {
  0: { open: 480, close: 720 },  // Sun  08:00–12:00
  1: { open: 480, close: 1080 }, // Mon  08:00–18:00
  2: { open: 480, close: 1080 }, // Tue  08:00–18:00
  3: { open: 480, close: 1080 }, // Wed  08:00–18:00
  4: { open: 480, close: 1080 }, // Thu  08:00–18:00
  5: { open: 480, close: 1080 }, // Fri  08:00–18:00
  6: { open: 480, close: 720 },  // Sat  08:00–12:00
}

const DAY_NAMES = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']

function minToLabel(m: number): string {
  const h = Math.floor(m / 60)
  const mm = m % 60
  return `${h < 10 ? '0' : ''}${h}:${mm < 10 ? '0' : ''}${mm}`
}

function bangkokNow(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }))
}

function computeStatus(): StatusState {
  const now = bangkokNow()
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  const sch = SCHEDULE[day]
  const isOpen = mins >= sch.open && mins < sch.close

  if (isOpen) {
    return {
      isOpen: true,
      text: 'เปิดอยู่',
      nextInfo: `ปิด ${minToLabel(sch.close)} น.`,
    }
  }

  let nextInfo: string
  if (mins < sch.open) {
    nextInfo = `เปิดวันนี้ ${minToLabel(sch.open)} น.`
  } else {
    const nextDay = (day + 1) % 7
    nextInfo = `เปิดพรุ่งนี้ (${DAY_NAMES[nextDay]}) ${minToLabel(SCHEDULE[nextDay].open)} น.`
  }

  return { isOpen: false, text: 'ปิดอยู่', nextInfo }
}

export default function ClinicStatusBadge() {
  const [status, setStatus] = useState<StatusState>({
    isOpen: false,
    text: 'กำลังตรวจสอบ…',
    nextInfo: '',
  })

  useEffect(() => {
    setStatus(computeStatus())
    const id = setInterval(() => setStatus(computeStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      background: 'var(--hw-surface)',
      border: '1px solid var(--hw-line)',
      padding: '10px 18px 10px 14px',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: 600,
      marginBottom: '26px',
    }}>
      <span
        className={status.isOpen ? 'hw-status-dot-open' : ''}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: status.isOpen ? 'var(--hw-teal-600)' : 'var(--hw-red)',
          flexShrink: 0,
          display: 'block',
        }}
        aria-hidden="true"
      />
      <span>
        <span style={{ color: 'var(--hw-mint-900)' }}>{status.text}</span>
        {status.nextInfo && (
          <>
            <span style={{ color: 'var(--hw-ink-soft)', fontWeight: 400, margin: '0 4px' }}>•</span>
            <span style={{ color: 'var(--hw-ink-soft)', fontWeight: 400 }}>{status.nextInfo}</span>
          </>
        )}
      </span>
    </div>
  )
}
