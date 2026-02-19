// app/api/admin/mark-read/route.js
import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../lib/supabaseServer'
import { requireAdmin } from '../../../../lib/requireAdmin'

export async function POST(req) {
  try {
    await requireAdmin(req)

    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 })

    const { error } = await supabaseServer
      .from('contacts')
      .update({ read: true })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const status = e.status || 401
    const message = e.message || 'unauthorized'
    return NextResponse.json({ error: message }, { status })
  }
}
