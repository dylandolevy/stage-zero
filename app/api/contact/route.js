import { supabaseServer } from '../../../lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()
  const { name, email, subject = '', message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const { error } = await supabaseServer
    .from('contacts')
    .insert([{ name, email, subject, message }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
