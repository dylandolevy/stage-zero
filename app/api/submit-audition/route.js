import { supabaseServer } from '../../../lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()
  const { name, email, phone, bio, video_url } = body

  if (!name || !email) {
    return NextResponse.json({ error: 'missing name/email' }, { status: 400 })
  }

  const { error } = await supabaseServer
    .from('auditions')
    .insert([{ name, email, phone, bio, video_url }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
