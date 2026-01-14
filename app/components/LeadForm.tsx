'use client'
import { supabase } from './../lib/supabase'
import { useState } from 'react'

export default function LeadForm() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', city: '' })

  const submit = async (e: any) => {
    e.preventDefault()
    await supabase.from('leads').insert([form])
    alert('Registrazione completata')
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-md w-full">
      {['full_name', 'phone', 'email', 'city'].map(field => (
        <input
          key={field}
          required
          placeholder={field.replace('_', ' ')}
          className="p-3 border border-neutral-300 bg-white/80"
          onChange={e => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button className="bg-black text-white py-3">Notify Me</button>
    </form>
  )
}
