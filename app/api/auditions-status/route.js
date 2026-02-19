import { supabaseServer } from '../../../lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabaseServer
    .from('settings')
    .select('value')
    .eq('name', 'auditions_open')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ auditions_open: data.value })
}
