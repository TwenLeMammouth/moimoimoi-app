import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const { test_session_id, facet_id } = await req.json()
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  // Vérifier si toutes les questions de la facette sont répondues
  const { data: questions } = await supabase
    .from('questions')
    .select('id')
    .eq('facet_id', facet_id)

  const { data: answers } = await supabase
    .from('responses')
    .select('question_id')
    .eq('test_session_id', test_session_id)

  const allAnswered = questions?.every(q =>
    answers?.some(a => a.question_id === q.id)
  )

  if (!allAnswered) {
    return NextResponse.json({ message: 'Facette incomplète, pas d’analyse.' })
  }

  // Vérifier si une analyse a déjà été lancée
  const { data: existing } = await supabase
    .from('ia_sessions')
    .select('id')
    .eq('test_session_id', test_session_id)
    .eq('facet_id', facet_id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ message: 'Analyse déjà existante.' })
  }

  // Créer la session IA (état pending)
  const { error } = await supabase.from('ia_sessions').insert({
    user_id: user.id,
    test_session_id,
    facet_id,
    status: 'pending',
    app_scope: 'moimoimoi',
  })

  if (error) {
    return NextResponse.json({ error: 'Erreur création session' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: 'Analyse IA déclenchée' })
}
