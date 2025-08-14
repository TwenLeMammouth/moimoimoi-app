// src/app/tests/[test_id]/page.tsx
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TestRunnerClient from '@/components/TestRunnerClient'

export default async function Page({ params }: { params: { test_id: string } }) {
  const supabase = await createClient()
  const { test_id } = await params

  // Auth
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return notFound()

  // Questions
  const { data: questions } = await supabase
    .from('questions')
    .select(`
      id,
      test_id,
      facet_id,
      question_num,
      input_type,
      questions_translations(questions_text, image_url)
    `)
    .eq('test_id', test_id)
    .order('question_num', { ascending: true })

  if (!questions || questions.length === 0) return notFound()

  // Facets
  const { data: facets } = await supabase
    .from('facets')
    .select(`facet_id, category`)
    .eq('test_id', test_id)

  // Responses
  const { data: responses } = await supabase
    .from('responses')
    .select('question_id')
    .eq('user_id', user.id)
    .eq('test_id', test_id)

  // IA Sessions
  const { data: iaSessions } = await supabase
    .from('ia_sessions')
    .select('facet_id, status')
    .eq('user_id', user.id)
    .eq('test_id', test_id)

console.log("facets", facets)
console.log("questions", questions)
console.log("responses", responses)

  return (
    <TestRunnerClient
      questions={questions}
      facets={facets ?? []}
      responses={responses ?? []}
      iaSessions={iaSessions ?? []}
      sessionId={test_id}
    />
  )
}
