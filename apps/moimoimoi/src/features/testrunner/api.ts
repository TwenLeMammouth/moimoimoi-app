
'use client'

import { supabase } from '@oxymammoth/supabase'
import type { TablesInsert } from '@oxymammoth/db'

export async function ensureSession(test_id: string) {
  // crée/retourne une test_session (si ta table est en place)
  const { data: { user } } = await supabase.auth.getUser()
  console.log('[ensureSession] user:', user?.id, 'test_id:', test_id)
  if (!user) return null

  // réutilise la dernière non terminée si dispo
  const { data: existing } = await supabase
    .from('test_sessions')
    .select('id,status')
    .eq('user_id', user.id)
    .eq('test_id', test_id)
    .order('created_at', { ascending: false })
    .limit(1)

  if (existing && existing.length && existing[0].status !== 'completed') {
    return existing[0].id as string
  }

  const payload: TablesInsert<'test_sessions'> = {
    user_id: user.id,
    test_id,
    status: 'in_progress',
    started_at: new Date().toISOString()
  }

  const { data: created, error } = await supabase
    .from('test_sessions')
    .insert(payload)
    .select('id')
    .single()
    console.log('[ensureSession] insert session ->', { id: created?.id, error })
  if (error) throw error
  return created!.id as string
}

export async function saveAnswer(p: {
  session_id: string
  question_id: string
  numeric_answer?: number | null
  note_encrypted?: { iv: string; ct: string } | null
}) {
  const { data: { user } } = await supabase.auth.getUser()
  console.log('[saveAnswer] user:', user?.id, 'session:', p.session_id, 'question:', p.question_id)
  if (!user) return null

  const payload: TablesInsert<'responses'> = {
    user_id: user.id,
    session_id: p.session_id,
    question_id: p.question_id,
    numeric_answer: p.numeric_answer ?? null,
    text_answer: p.note_encrypted ? JSON.stringify(p.note_encrypted) : null,
    app_scope: 'moimoimoi'
  }

  // 1) tente un upsert sur la clé probable (ajuste si besoin)
  try {
    const { data, error } = await supabase
      .from('responses')
      .upsert(payload, { onConflict: 'session_id,question_id,user_id' })
      .select('id, updated_at')
      .single()
      console.log('[saveAnswer] upsert ->', { id: data?.id, error })
    if (error) throw error
    return data!.id as string
  } catch {
    // 2) fallback: insert-or-update (aucun 409)
    const { data: existing } = await supabase
      .from('responses')
      .select('id')
      .eq('session_id', p.session_id)
      .eq('question_id', p.question_id)
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle()

    if (existing) {
      const { error: eu } = await supabase
        .from('responses')
        .update({
          numeric_answer: p.numeric_answer ?? null,
          text_answer: p.note_encrypted ? JSON.stringify(p.note_encrypted) : null,
          app_scope: 'moimoimoi'
        })
        .eq('id', existing.id)
      if (eu) throw eu
      return existing.id
    }

    const { data: ins, error: ei } = await supabase
      .from('responses')
      .insert(payload)
      .select('id')
      .single()
    if (ei) throw ei
    return ins!.id as string
  }
}

export async function finishSession(session_id: string) {
  await supabase
    .from('test_sessions')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', session_id)
}