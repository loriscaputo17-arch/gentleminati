import Countdown from './components/Countdown'
import LeadForm from './components/LeadForm'

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between p-8"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="relative md:mb-0">
        <img src="/logoprincipale2.png" className="md:w-[30vw] w-[90vw] mx-auto opacity-90" />
        <h3
          className="
            md:text-sm
            text-xs
            md:top-[65%]
            md:left-[35%]
            top-[70%]
            left-[35%]
            w-full
            absolute
            tracking-[0.21em]
            uppercase
            select-none
            font-['Cinzel']
            w-[fit-content]
          "
          style={{
            color: '#916346',
            textShadow: `
              1px 1px 1px rgba(255,255,255,0.35),
            -1px -1px 1px rgba(0,0,0,0.35)
            `,
          }}
        >
          Coming Soon
        </h3>

      </div>

      <div className="flex flex-col items-center">
        <Countdown />
      </div>

      <div className="md:w-[30vw] w-[90vw]" >
        <LeadForm />
      </div>

      <div className="flex justify-center gap-6 mt-2">
        <img src="/logo1.svg" className="h-34 opacity-80" />
        <img src="/logo2.svg" className="h-34 opacity-80" />
      </div>

<footer
  className="
    text-xs
    tracking-widest
    pt-2
    font-['Cinzel']
    select-none
    text-center
  "
  style={{
    color: '#916346',
    textShadow: `
      1px 1px 1px rgba(255,255,255,0.35),
     -1px -1px 1px rgba(0,0,0,0.35)
    `,
  }}
>
  © {new Date().getFullYear()} - GENTLEMINATI
</footer>



    </main>
  )
}
