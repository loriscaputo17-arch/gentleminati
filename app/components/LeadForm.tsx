'use client'

import { supabase } from './../lib/supabase'
import { useState } from 'react'

const CITIES = [
  'Agrigento','Alessandria','Ancona','Aosta','Arezzo','Ascoli Piceno','Asti','Avellino',
  'Bari','Barletta','Belluno','Benevento','Bergamo','Biella','Bologna','Bolzano','Brescia','Brindisi',
  'Cagliari','Caltanissetta','Campobasso','Caserta','Catania','Catanzaro','Chieti','Como','Cosenza','Cremona','Crotone','Cuneo',
  'Enna','Fermo','Ferrara','Firenze','Foggia','Forlì','Frosinone',
  'Genova','Gorizia','Grosseto',
  'Imperia','Isernia',
  'L’Aquila','La Spezia','Latina','Lecce','Lecco','Livorno','Lodi','Lucca',
  'Macerata','Mantova','Massa','Matera','Messina','Milano','Modena','Monza',
  'Napoli','Novara','Nuoro',
  'Oristano',
  'Padova','Palermo','Parma','Pavia','Perugia','Pesaro','Pescara','Piacenza','Pisa','Pistoia','Pordenone','Potenza','Prato',
  'Ragusa','Ravenna','Reggio Calabria','Reggio Emilia','Rieti','Rimini','Roma','Rovigo',
  'Salerno','Sassari','Savona','Siena','Siracusa','Sondrio','Sud Sardegna',
  'Taranto','Teramo','Terni','Torino','Trapani','Trento','Treviso','Trieste',
  'Udine',
  'Varese','Venezia','Verbania','Vercelli','Verona','Vibo Valentia','Vicenza','Viterbo'
]

const PREFIXES = ['+39', '+41', '+33', '+49', '+34', '+43', '+44']

export default function LeadForm() {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    city: '',
  })

  const [prefix, setPrefix] = useState('+39')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const inputStyle = `
    px-3 py-2
    text-[12px]
    tracking-[0.25em]
    font-['Cinzel']
    text-[#4a3828]
    bg-[#f0e8d8]
    border border-[#b79b6a]
    shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]
    focus:outline-none
    focus:border-[#8f6a3d]
  `

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    try {
      setLoading(true)

      await supabase.from('leads').insert([
        { ...form, phone: `${prefix} ${form.phone}` },
      ])

      setSuccess(true)

      setForm({
        full_name: '',
        phone: '',
        email: '',
        city: '',
      })
    } catch (err) {
      console.error(err)
      alert('Errore durante la registrazione')
    } finally {
      setLoading(false)
    }
  }

  // ================= SUCCESS SCREEN =================
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6">

        <h2
          className="
            text-[18px] md:text-[22px]
            tracking-[0.35em]
            font-['Cinzel']
            text-[#8f6a3d]
            font-bold
          "
        >
          Registration completed
        </h2>

        <p
          className="
            mt-4
            text-[11px] md:text-[12px]
            tracking-[0.25em]
            font-['Cinzel']
            text-[#4a3828]
            max-w-[260px] 
          "
        >
YOU WILL RECEIVE <br></br>  UPDATES SOON.
          <br />
          STAY CONNECTED.
        </p>

      </div>
    )
  }

  // ================= FORM =================
  return (
    <form onSubmit={submit} className="flex flex-col gap-2 p-6 w-full">

      <input
        required
        placeholder="FULL NAME"
        value={form.full_name}
        className={`${inputStyle} placeholder:text-[#9a8466]`}
        onChange={e => setForm({ ...form, full_name: e.target.value })}
      />

      {/* PHONE */}
      <div className="flex gap-2">
        <select
          className={inputStyle}
          value={prefix}
          onChange={e => setPrefix(e.target.value)}
        >
          {PREFIXES.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input
          required
          placeholder="PHONE"
          value={form.phone}
          className={`${inputStyle} flex-1 placeholder:text-[#9a8466]`}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <input
        required
        placeholder="EMAIL"
        type="email"
        value={form.email}
        className={`${inputStyle} placeholder:text-[#9a8466]`}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      {/* CITY */}
      <select
        required
        value={form.city}
        className={inputStyle}
        onChange={e => setForm({ ...form, city: e.target.value })}
      >
        <option value="" disabled>
          CITY
        </option>
        {CITIES.map(city => (
          <option key={city} value={city}>
            {city.toUpperCase()}
          </option>
        ))}
      </select>

      <button
        disabled={loading}
        className="
          mt-2
          py-2
          text-[12px]
          tracking-[0.3em]
          font-['Cinzel']
          uppercase
          text-[#3d2b1f]
          bg-gradient-to-b from-[#e6d3a3] to-[#b8965a]
          border border-[#8f6a3d]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.4)]
          hover:brightness-95
          transition
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading ? 'Sending…' : 'Join the family'}
      </button>

    </form>
  )
}