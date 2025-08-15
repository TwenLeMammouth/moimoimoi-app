import TestRunnerClient from '@/features/testrunner/TestRunnerClient'
import type { Question, TestData } from '@/features/testrunner/types'
import { supabaseServer } from '../../../../lib/supabase/supabase-server'
import { notFound } from 'next/navigation'
import type { JSX } from 'react'

async function fetchTestData(test_id_param: string, locale: string): Promise<TestData> {
  const sb = await supabaseServer()

  const { data: testRow, error: eTest } = await sb
    .from('tests')
    .select('test_id, title, active, deleted')
    .ilike('test_id', test_id_param)
    .eq('active', true)
    .eq('deleted', false)
    .maybeSingle()
  if (eTest || !testRow) notFound()

  const test_id = testRow.test_id

  const { data: facetsRows, error: ef } = await sb
    .from('facets')
    .select('id, facet_id, category, test_id')
    .eq('test_id', test_id)
  if (ef) notFound()

  const { data: qRows, error: eq } = await sb
    .from('questions')
    .select('id, question_num, facet_id, input_type')
    .eq('test_id', test_id)
    .order('question_num', { ascending: true })
  if (eq) notFound()

  const ids = (qRows ?? []).map(q => q.id)
  const tMap = new Map<string, string>()
  if (ids.length) {
    const { data: tr } = await sb
      .from('questions_translations')
      .select('question_id, lang, questions_text')
      .eq('lang', locale)
      .in('question_id', ids)
    for (const row of tr || []) tMap.set(row.question_id!, row.questions_text ?? '')
  }

  const questions: Question[] = (qRows ?? []).map(q => ({
    id: q.id,
    question_num: q.question_num ?? 0,
    facet_id: q.facet_id ?? '',
    input_type: (q.input_type as Question['input_type']) ?? 'likert5',
    text: tMap.get(q.id) || ''
  }))

  return {
    test_id,
    name: testRow.title,
    facets: (facetsRows ?? []).map(f => ({ facet_id: f.facet_id ?? String(f.id), name: f.category ?? f.facet_id ?? '' })),
    questions
  }
}

export default async function Page(
  { params }: { params: Promise<{ locale: string; test_id: string }> }
): Promise<JSX.Element> {
  const { locale, test_id } = await params
  const data = await fetchTestData(test_id, locale)
  return <TestRunnerClient 
    questions={data.questions} 
    // testId={data.test_id}
    />
}