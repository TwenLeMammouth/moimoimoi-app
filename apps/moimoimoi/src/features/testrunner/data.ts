export const TABLES = {
  sessions: 'test_sessions',     // ← ajuste si nécessaire
  responses: 'responses'         // ← ajuste si nécessaire (par ex: 'answers')
} as const

export type SaveAnswerPayload = {
  session_id: string
  test_id: string
  question_id: string
  numeric_answer?: number | null
  note_encrypted?: { iv: string; ct: string } | null
}