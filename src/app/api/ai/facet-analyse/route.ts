// src/app/api/ia/facet-analyze/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const supabase = await createClient()
  const { test_session_id, facet_id } = await req.json()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 1. Récupère les réponses de la facette
  const { data: responses } = await supabase
    .from('responses')
    .select('question_id, answer')
    .eq('test_session_id', test_session_id)
    .eq('facet_id', facet_id)
    .eq('user_id', user.id)

  if (!responses || responses.length === 0)
    return NextResponse.json({ error: 'Aucune réponse trouvée' }, { status: 400 })

  // 2. Récupère les prompts de la facette
  const { data: promptData } = await supabase
    .from('facets_prompts')
    .select('analysis_prompt')
    .eq('facet_id', facet_id)
    .single()

  const answersText = responses.map((r) => `• ${r.answer}`).join('\n')
  const fullPrompt = `${promptData?.analysis_prompt}\n\nRéponses utilisateur :\n${answersText}`

  // 3. Analyse IA (GPT-4o)
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.8,
    messages: [
      {
        role: 'system',
        content: 'Tu es un assistant de psychologie bienveillant.',
      },
      {
        role: 'user',
        content: fullPrompt,
      },
    ],
  })

  const result = completion.choices[0]?.message.content ?? '[Aucune analyse]'

  // 4. Stocke le résultat dans ia_sessions
  await supabase.from('ia_sessions').insert([
    {
      user_id: user.id,
      test_session_id,
      facet_id,
      result,
      app_scope: 'moimoimoi',
    },
  ])

  return NextResponse.json({ status: 'success', result })
}
