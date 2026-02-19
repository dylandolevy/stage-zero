// app/api/toggle-auditions/route.js
import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../lib/supabaseServer'
import { requireAdmin } from '../../../lib/requireAdmin'

export async function POST(req) {
  try {
    await requireAdmin(req)

    const body = await req.json()
    const { value } = body
    if (typeof value !== 'boolean') {
      return NextResponse.json({ error: 'invalid value; must be boolean' }, { status: 400 })
    }

    const { error } = await supabaseServer
      .from('settings')
      .upsert({ name: 'auditions_open', value }, { onConflict: 'name' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const status = e.status || 401
    const message = e.message || 'unauthorized'
    return NextResponse.json({ error: message }, { status })
  }
}
