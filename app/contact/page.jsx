'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'', website:'' })
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.website) { setStatus('spam detected'); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message })
      })
      if (res.ok) { setStatus('sent — thanks!'); setForm({ name:'', email:'', subject:'', message:'', website:'' }) }
      else { const j = await res.json(); setStatus('error: ' + (j?.error || 'unknown')) }
    } catch (err) {
      setStatus('network error')
    }
  }

  return (
    <main style={{maxWidth:720, margin:'2rem auto', padding:16}}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit} style={{display:'grid', gap:8}}>
        <input placeholder="Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Subject (optional)" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} />
        <textarea placeholder="Message" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
        <input name="website" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} style={{display:'none'}} />
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  )
}
