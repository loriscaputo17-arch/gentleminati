'use client'
import { useEffect, useState } from 'react'

const targetDate = new Date('2026-02-07T00:00:00')

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = targetDate.getTime() - now

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-6 text-center text-xl">
      {Object.entries(time).map(([k, v]) => (
        <div key={k}>
          <div className="text-3xl font-semibold">{v}</div>
          <div className="uppercase text-sm">{k}</div>
        </div>
      ))}
    </div>
  )
}
