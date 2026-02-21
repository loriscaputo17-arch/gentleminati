'use client'

import { useRef, useState } from 'react'
import LeadForm from './components/LeadForm'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showBg, setShowBg] = useState(false)
  const [showFolla, setShowFolla] = useState(false)

  const handleTimeUpdate = () => {
    const t = videoRef.current?.currentTime || 0

    // ⏱️ sfondo leggermente prima
    if (t >= 5.6 && !showBg) {
      setShowBg(true)

      // ⏱️ folla dopo 1s
      setTimeout(() => {
        setShowFolla(true)
      }, 1000)
    }
  }

  return (
    <main className="min-h-screen w-full overflow-hidden bg-black">
      <div className="fixed inset-0 z-10">

        {/* ================= VIDEO ================= */}
        <video
          ref={videoRef}
          src="/landing/verticale.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* ================= SFONDO ================= */}
        <picture
          className={`
            absolute inset-0 z-20 pointer-events-none
            transition-opacity duration-1000 ease-out
            ${showBg ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Desktop */}
          <source
            media="(min-width: 768px)"
            srcSet="/landing/sfondoapertura_dekstop.png"
          />

          {/* Mobile */}
          <img
            src="/landing/sfondoapertura_cellulare.png"
            className="w-full h-full object-cover"
            alt=""
          />
        </picture>

        {/* ================= FOLLA ================= */}
        <img
          src="https://firebasestorage.googleapis.com/v0/b/cleope-80cdc.firebasestorage.app/o/follagif.gif?alt=media&token=534d6c10-8d88-43b8-a2ba-65cc74283482"
          className={`
            absolute inset-0 w-full h-full object-cover
            pointer-events-none z-30
            top-[20%]
            transition-opacity duration-1000 ease-out
            ${showFolla ? 'opacity-100' : 'opacity-0'}
          `}
          alt=""
        />

        {/* ================= SOLDI ================= */}
        <img
          src="/landing/soldigif.gif"
          className={`
            absolute inset-0 w-full h-full object-cover
            pointer-events-none z-40
            transition-opacity duration-1000 ease-out
            ${showBg ? 'opacity-100' : 'opacity-0'}
          `}
          alt=""
        />

        {/* ================= CARTELLO + FORM ================= */}
        <div
          className={`
            absolute inset-0
            flex items-end justify-left
            z-50
            transition-opacity duration-700 ease-out
            ${showFolla ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="relative w-[120vw] md:w-[55%] max-w-none">

            {/* CARTELLO */}
            <picture>
              {/* Desktop */}
              <source
                media="(min-width: 768px)"
                srcSet="/landing/cartello.png"
              />

              {/* Mobile */}
              <img
                src="/landing/cartello_cellulare.png"
                className="w-full drop-shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
                alt=""
              />
            </picture>

            {/* FORM */}
            <div
              className="
                absolute inset-0
                flex items-center justify-center
                px-4 z-[60]
                md:w-[55%]
                md:bottom-[31%]
                md:top-0
                top-[12%]
                md:left-[6%]
              "
              style={{rotate: '-6deg'}}
            >
              <LeadForm />
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}