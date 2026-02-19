'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [auditionsOpen, setAuditionsOpen] = useState(null)
  const [contacts, setContacts] = useState([])
  const [auditions, setAuditions] = useState([])

  useEffect(() => {
    // get current session on load
    async function init() {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user ?? null)
    }
    init()

    // listen for auth changes (user signs in after clicking magic link)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function signInWithMagicLink(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) alert('Error sending magic link: ' + error.message)
    else alert('Magic link sent. Check your email.')
  }

  // helper to get access token for Authorization header
  async function getAccessToken() {
    const { data } = await supabase.auth.getSession()
    return data?.session?.access_token || null
  }

  async function fetchStatus() {
    const r = await fetch('/api/auditions-status')
    if (r.ok) {
      const j = await r.json()
      setAuditionsOpen(Boolean(j.auditions_open))
    }
  }

  async function fetchContacts() {
    const token = await getAccessToken()
    const r = await fetch('/api/admin/contacts', { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) { console.error('failed', await r.text()); return }
    const j = await r.json()
    setContacts(j.contacts || [])
  }

  async function fetchAuditions() {
    const token = await getAccessToken()
    const r = await fetch('/api/admin/auditions', { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) return
    const j = await r.json()
    setAuditions(j.auditions || [])
  }

  async function toggleAuditions() {
    const token = await getAccessToken()
    const newVal = !auditionsOpen
    const r = await fetch('/api/toggle-auditions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ value: newVal })
    })
    if (r.ok) setAuditionsOpen(newVal)
  }

  async function markRead(id) {
    const token = await getAccessToken()
    const r = await fetch('/api/admin/mark-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id })
    })
    if (r.ok) fetchContacts()
  }

  // load data if user signed in
  useEffect(() => {
    if (user) {
      fetchStatus()
      fetchContacts()
      fetchAuditions()
    } else {
      setContacts([]); setAuditions([])
    }
  }, [user])

  if (!user) {
    return (
      <main style={{maxWidth:720, margin:'2rem auto', padding:16}}>
        <h1>Admin login</h1>
        <form onSubmit={signInWithMagicLink} style={{display:'grid', gap:8}}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin email" type="email" required />
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send magic link'}</button>
        </form>
        <p>Use the same email address that is listed in the <code>admins</code> table.</p>
      </main>
    )
  }

  return (
    <main style={{maxWidth:980, margin:'2rem auto', padding:16}}>
      <h1>Admin</h1>
      <p>Signed in as <strong>{user.email}</strong></p>
      <button onClick={() => supabase.auth.signOut().then(()=>setUser(null))}>Sign out</button>

      <section style={{marginTop:20}}>
        <h2>Auditions</h2>
        <p>Open: {String(auditionsOpen)}</p>
        <button onClick={toggleAuditions}>{auditionsOpen ? 'Close' : 'Open'} auditions</button>

        <h3 style={{marginTop:16}}>Applications</h3>
        {auditions.length === 0 ? <p>No applications yet</p> : auditions.map(a => (
          <div key={a.id} style={{border:'1px solid #ddd', padding:8, marginBottom:8}}>
            <strong>{a.name}</strong> — {a.email} — <small>{new Date(a.created_at).toLocaleString()}</small>
            <p>{a.bio}</p>
            <p>Video: {a.video_url}</p>
            <p>Status: {a.status}</p>
          </div>
        ))}
      </section>

      <section style={{marginTop:24}}>
        <h2>Messages</h2>
        <p>Unread: {contacts.filter(c=>!c.read).length}</p>
        {contacts.length === 0 ? <p>No messages</p> : contacts.map(c => (
          <div key={c.id} style={{border: c.read ? '1px solid #ddd' : '2px solid #333', padding:8, marginBottom:8}}>
            <strong>{c.name}</strong> <em>{c.email}</em> — <small>{new Date(c.created_at).toLocaleString()}</small>
            <p>{c.subject}</p>
            <p>{c.message}</p>
            {!c.read && <button onClick={()=>markRead(c.id)}>Mark read</button>}
          </div>
        ))}
      </section>
    </main>
  )
}
