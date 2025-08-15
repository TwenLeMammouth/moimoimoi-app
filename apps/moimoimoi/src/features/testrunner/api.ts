
'use client'

import { supabase } from '@oxymammoth/supabase'
import { TABLES, type SaveAnswerPayload } from './data'
import type { TablesInsert } from '@oxymammoth/db'

export async function ensureSession(test_id: string){
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null // pas connecté → on ne persiste pas (on pourra gérer anonymes plus tard)

  // 1) essaie de trouver une session in_progress
  const { data: existing } = await supabase
    .from(TABLES.sessions)
    .select('id, status')
    .eq('user_id', user.id)
    .eq('test_id', test_id)
    .eq('status', 'in_progress')
    .limit(1)
  if (existing && existing.length) return existing[0].id as string

  // 2) sinon, crée la session
  const { data: created, error } = await supabase
    .from(TABLES.sessions)
    .insert({ user_id: user.id, test_id, status: 'in_progress' })
    .select('id')
    .single()
  if (error) throw error
  return created!.id as string
}

export async function saveAnswer(p: SaveAnswerPayload){
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const payload: TablesInsert<'responses'> = {
    user_id: user.id,
    session_id: p.session_id,
    question_id: p.question_id,
    numeric_answer: p.numeric_answer ?? null,
    text_answer: p.note_encrypted ? JSON.stringify(p.note_encrypted) : null,
    app_scope: 'moimoimoi'
  }

  const { data, error } = await supabase
    .from(TABLES.responses)
    .insert(payload)
    .select('id')
    .single()
  if (error) throw error
  return data!.id as string
}

export async function finishSession(session_id: string){
  const { error } = await supabase
    .from(TABLES.sessions)
    .update({ status: 'completed', ended_at: new Date().toISOString() })
    .eq('id', session_id)
  if (error) throw error
}