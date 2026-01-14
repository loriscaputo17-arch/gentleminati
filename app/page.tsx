import Countdown from './components/Countdown'
import LeadForm from './components/LeadForm'

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between p-8"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <img src="/logo.png" className="h-16 mt-6" />

      <div className="flex flex-col items-center gap-8">
        <h1 className="text-5xl text-center">Coming Soon</h1>
        <Countdown />
        <LeadForm />
      </div>

      <footer className="text-sm opacity-70">
        © Miutifin 2026
      </footer>
    </main>
  )
}
