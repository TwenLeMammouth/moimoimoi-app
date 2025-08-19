import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/supabase-server'

export async function POST(_: Request, { params }: { params: { test_id: string; session_id: string } }) {
  const { test_id, session_id } = params
  const sb = await supabaseServer()

  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  // Récupère les facettes du test
  const { data: facets, error: ef } = await sb
    .from('facets')
    .select('id, facet_id')
    .eq('test_id', test_id)
  if (ef) return NextResponse.json({ error: ef.message }, { status: 400 })

  const rows = (facets || []).map(f => ({
    id: crypto.randomUUID(),
    user_id: user.id,
    test_session_id: session_id,
    facet_id: f.facet_id || String(f.id),
    status: 'queued',
    started_at: new Date().toISOString(),
    app_scope: 'moimoimoi',
    metadata: null
  }))

  if (!rows.length) return NextResponse.json({ ok: true, enqueued: 0 })

  const { error: ei } = await sb.from('ia_sessions').insert(rows)
  if (ei) return NextResponse.json({ error: ei.message }, { status: 400 })

  return NextResponse.json({ ok: true, enqueued: rows.length })
}