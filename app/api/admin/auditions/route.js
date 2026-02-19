// app/api/admin/auditions/route.js
import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../lib/supabaseServer'
import { requireAdmin } from '../../../../lib/requireAdmin'

export async function GET(req) {
  try {
    await requireAdmin(req)

    const { data, error } = await supabaseServer
      .from('auditions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ auditions: data })
  } catch (e) {
    const status = e.status || 401
    const message = e.message || 'unauthorized'
    return NextResponse.json({ error: message }, { status })
  }
}
