
'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { useRunner } from './store'
import type { Question } from './types'
import { Card, Button } from '@oxymammoth/ui'
import { ScaleSelector } from './ui/ScaleSelector'
import { LongTextInput } from './ui/LongTextInput'
import { ensureSession, saveAnswer, finishSession } from './api'
import { useDeviceKey } from '@/features/crypto/useDeviceKey'
import { encryptText } from '@oxymammoth/crypto'

export default function TestRunnerClient({ questions }: { questions: Question[] }) {
  const t = useTranslations('runner')
  const key = useDeviceKey()
  const { index, setQuestions, questions: qs, answers, setAnswer, next, prev } = useRunner()
  const [sessionId, setSessionId] = React.useState<string | null>(null)
  const [testId, setTestId] = React.useState<string>('')

  React.useEffect(() => { setQuestions(questions); setTestId(questions[0]?.facet_id?.split(':')[0] || 'unknown') }, [questions, setQuestions])

  // Crée une session au premier rendu (si user connecté)
  React.useEffect(() => { (async () => {
    if (!sessionId && testId) {
      try { const id = await ensureSession(testId); if (id) setSessionId(id) } catch(e){ console.error(e) }
    }
  })() }, [sessionId, testId])

  const q = qs[index]
  if (!q) return (
    <Card className="p-8 text-center">
      <Button onClick={next}>{t('start')}</Button>
    </Card>
  )

  async function persist(qid: string){
    if (!sessionId) return // anonymes: on skippe la persistance pour l’instant
    const current = answers[qid]
    let noteEncrypted = null as null | {iv:string; ct:string}
    if (key && current?.note && current.note.trim()) noteEncrypted = await encryptText(current.note, key)
    try {
      await saveAnswer({
        session_id: sessionId,
        test_id: testId,
        question_id: qid,
        numeric_answer: current?.value ?? null,
        note_encrypted: noteEncrypted
      })
    } catch(e){ console.error('saveAnswer failed', e) }
  }

  const onNext = async () => {
    await persist(q.id)
    next()
  }

  const onPrev = async () => {
    await persist(q.id)
    prev()
  }

  const onFinish = async () => {
    await persist(q.id)
    if (sessionId) await finishSession(sessionId)
    // TODO: rediriger vers écran de résultats ou d’analyse
  }

  const current = answers[q.id]
  const steps = q.input_type === 'likert6' ? 6 : 5

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <Card className="p-6 space-y-4">
        <div className="text-sm opacity-60">{q.question_num} {t('of')} {qs.length}</div>
        <h3 className="text-lg font-medium">{q.text}</h3>
        {q.input_type.startsWith('likert') && (
          <ScaleSelector
            value={current?.value}
            onChange={(v) => setAnswer(q.id, v, current?.note)}
            steps={steps as 5|6}
          />
        )}
        {q.input_type === 'text' && (
          <LongTextInput
            value={current?.note}
            onChange={(v) => setAnswer(q.id, current?.value, v)}
            max={300}
          />
        )}
        {q.input_type !== 'text' && (
          <div>
            <div className="text-sm opacity-70 mb-1">{t('optionalNote')}</div>
            <LongTextInput
              value={current?.note}
              onChange={(v) => setAnswer(q.id, current?.value, v)}
              max={300}
            />
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <Button variant="ghost" onClick={onPrev}>{t('prev')}</Button>
          {index < qs.length - 1 ? (
            <Button onClick={onNext}>{t('next')}</Button>
          ) : (
            <Button onClick={onFinish}>Terminer</Button>
          )}
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm opacity-70">Facettes (placeholder)</div>
        <ul className="mt-2 space-y-2">
          {[...new Set(qs.map(x => x.facet_id))].map(fid => (
            <li key={fid} className="text-sm">{fid}</li>
          ))}
        </ul>
      </Card>
    </div>
  )
}