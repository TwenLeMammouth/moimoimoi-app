// src/app/tests/session/[session_id]/page.tsx
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TestRunnerClient from '@/components/TestRunnerClient'

export default async function Page({ params }: { params: { session_id: string } }) {
  const supabase = await createClient()
  const { session_id } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return notFound()

  // Charger la session
  const { data: session } = await supabase
    .from('test_sessions')
    .select('test_id')
    .eq('id', session_id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!session) return notFound()
  const { test_id } = session

  // Récupérer les données liées
  const { data: questions } = await supabase
    .from('questions')
    .select(`id, test_id, facet_id, question_num, input_type, questions_translations(questions_text, image_url)`)
    .eq('test_id', test_id)
    .order('question_num', { ascending: true })

  const { data: facets } = await supabase
    .from('facets')
    .select(`facet_id, category`)
    .eq('test_id', test_id)

  const { data: responses } = await supabase
    .from('responses')
    .select('question_id, numeric_answer, text_answer')
    .eq('user_id', user.id)
    .eq('session_id', session_id)

  const { data: iaSessions } = await supabase
    .from('ia_sessions')
    .select('facet_id, status')
    .eq('user_id', user.id)
    .eq('test_session_id', session_id)

  return (
    <TestRunnerClient
      questions={questions ?? []}
      facets={facets ?? []}
      responses={responses ?? []}
      iaSessions={iaSessions ?? []}
      sessionId={session_id}
    />
  )
}
