'use client'

import { useRef, useState, useEffect} from 'react'
import LeadForm from './components/LeadForm'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showBg, setShowBg] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const interval = setInterval(() => {
      const t = video.currentTime || 0

      if (t >= 5.6 && !showBg) {
        setShowBg(true)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [showBg])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        await video.play()
      } catch (e) {
        // retry dopo interazione utente
        const resume = () => {
          video.play().catch(() => {})
          window.removeEventListener('touchstart', resume)
          window.removeEventListener('click', resume)
        }
        window.addEventListener('touchstart', resume, { once: true })
        window.addEventListener('click', resume, { once: true })
      }
    }

    tryPlay()
  }, [])

  return (
    <main className="min-h-screen w-full overflow-hidden bg-black">
      <div className="fixed inset-0 z-10">

        {/* ================= VIDEO ================= */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/landing/poster.jpg"
          className="w-full h-full object-cover"
        >
          {/* Desktop */}
          <source
            src="https://firebasestorage.googleapis.com/v0/b/cleope-80cdc.firebasestorage.app/o/gentleminati%2Forizzontale.mp4?alt=media&token=3558e98e-6204-492e-9e9f-0394a7f2a59f"
            media="(min-width: 768px)"
            type="video/mp4"
          />

          {/* Mobile */}
          <source
            src="/landing/verticale.mp4"
            media="(max-width: 767px)"
            type="video/mp4"
          />
        </video>

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
              transition-all duration-700 ease-[cubic-bezier(.22,.8,.22,1)]
              will-change-transform

              ${
                showBg
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[120px] md:translate-y-[180px]'
              }
            `}
          >
          <div className="relative w-[120vw] md:w-[75%] xl:w-[85%] max-w-none">

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
                md:bottom-[35%]
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