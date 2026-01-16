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
  <div className="flex gap-4 text-center select-none">
    {Object.entries(time).map(([k, v]) => (
      <div
        key={k}
        className="
          flex flex-col items-center
          px-3
          font-['Cinzel']
            font-light

        "
      >
        <div
           className="
          text-4xl
          tracking-widest
          select-none
        "
        style={{
          color: '#916346',
          fontSize: "24px",
          textShadow: `
            1px 1px 1px rgba(255,255,255,0.35),
          -1px -1px 1px rgba(0,0,0,0.35)
          `,
        }}
        >
          {v.toString().padStart(2, '0')}
        </div>

        <div
          className="
          select-none
        "
        style={{
          color: '#916346',
          fontSize: '10px',
          letterSpacing: '2px',
          textShadow: `
            1px 1px 1px rgba(255,255,255,0.35),
          -1px -1px 1px rgba(0,0,0,0.35)
          `,
        }}
        >
          {k}
        </div>
      </div>
    ))}
  </div>
)

}
