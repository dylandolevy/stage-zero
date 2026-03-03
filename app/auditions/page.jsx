'use client'
import { useEffect, useState } from 'react'

export default function AuditionsPage() {
  const [open, setOpen] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    interest: '',
    contribution: '',
    website: '' // honeypot
  })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch('/api/auditions-status')
      .then(r => r.json())
      .then(d => setOpen(Boolean(d.auditions_open)))
      .catch(() => setOpen(false))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.website) { setStatus('spam detected'); return } // honeypot
    setStatus('submitting')
    try {
      const res = await fetch('/api/submit-audition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          bio: form.bio,
          interest: form.interest,
          contribution: form.contribution,
        })
      })
      if (res.ok) {
        setStatus('submitted — thanks!')
        setForm({ name: '', email: '', phone: '', role: '', bio: '', interest: '', contribution: '', website: '' })
      } else {
        const j = await res.json()
        setStatus('error: ' + (j?.error || 'unknown'))
      }
    } catch (err) {
      setStatus('network error')
    }
  }

  if (open === null) return <div>Loading…</div>

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: 16 }}>
      <h1>Auditions</h1>

      {open ? (
        <>
          <p>Auditions are open! Fill out the form below.</p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
            <input
              placeholder="Name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Duke Email"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Phone Number (optional)"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <input
              placeholder="Role / Position Auditioning For"
              required
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            />
            <textarea
              placeholder="Short bio"
              rows={3}
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
            />
            <textarea
              placeholder="Why are you interested in this organization?"
              rows={4}
              value={form.interest}
              onChange={e => setForm({ ...form, interest: e.target.value })}
            />
            <textarea
              placeholder="What would you bring to the team?"
              rows={4}
              value={form.contribution}
              onChange={e => setForm({ ...form, contribution: e.target.value })}
            />
            {/* honeypot - hidden from users but bots often fill */}
            <input
              name="website"
              value={form.website}
              onChange={e => setForm({ ...form, website: e.target.value })}
              style={{ display: 'none' }}
            />
            <button type="submit">Submit application</button>
          </form>

          {status && <p>{status}</p>}
        </>
      ) : (
        <p>Auditions are currently closed. Please check back during the next audition cycle..</p>
      )}
    </main>
  )
}