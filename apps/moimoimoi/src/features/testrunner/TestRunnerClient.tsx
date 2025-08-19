
'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { useTestStore } from '@/hooks/useTestStore'
import type { Question } from './types'
import { Card, Button } from '@oxymammoth/ui'
import { ScaleSelector } from './ui/ScaleSelector'
import { LongTextInput } from './ui/LongTextInput'
import { ensureSession, saveAnswer, finishSession } from './api'
import { useDeviceKey } from '@/features/crypto/useDeviceKey'
import { encryptText } from '@oxymammoth/crypto'
// import { InsightsPanel } from './InsightsPanel'
// import { computeFacetStats } from './stats'
import { bootstrapAnalysis, maybeAnalyzeFacet } from './analysisClient'
import { ProgressBarMini } from '@/components/ProgressBarMini'


export default function TestRunnerClient({ testId, questions, locale }: { testId: string; questions: Question[]; locale: string }) {
  const t = useTranslations('runner')
  const key = useDeviceKey()
  const { index, setQuestions, questions: qs, answers, setAnswer, next, prev } = useTestStore()

  const [sessionId, setSessionId] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [lastSavedAt, setLastSavedAt] = React.useState<number | null>(null)
  const [saveErr, setSaveErr] = React.useState<string | null>(null)
  const [facetStatus, setFacetStatus] = React.useState<Record<string,'queued'|'processing'|'ready'|'error'>>({})


  React.useEffect(() => { 
    setQuestions(questions) 
  }, [questions, setQuestions])

  React.useEffect(() => { (async () => {
    if (!sessionId && testId) {
      try { 
        const id = await ensureSession(testId); 
        if (id) {
          setSessionId(id) 
        }
      } catch(e) { 
        console.error(e)
      }
    }
  })() }, [sessionId, testId])

  React.useEffect(() => { (async () => {
    if (sessionId) { await bootstrapAnalysis(sessionId) }
  })() }, [sessionId])

  React.useEffect(() => { if (!sessionId) return
    const id = setInterval(async () => {
      try {
        const r = await fetch(`/api/analysis/session/${sessionId}/status`)
        const j = await r.json()
        if (j.ok && j.items){
          const map: Record<string, any> = {}
          for (const it of j.items){ map[it.facet_id] = it.status }
          setFacetStatus(map)
        }
      } catch {}
    }, 6500)
    return () => clearInterval(id)
  }, [sessionId])

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
    if (key && current?.text_answer && current.text_answer.trim()) 
      {
        noteEncrypted = await encryptText(current.text_answer, key)
      }
    try {
      setSaving(true); setSaveErr(null)
      if (key && current?.text_answer?.trim()) {
        noteEncrypted = await encryptText(current.text_answer, key)
      }
      await saveAnswer({
        session_id: sessionId,
        question_id: qid,
        numeric_answer: current?.numeric_answer ?? null,
        note_encrypted: noteEncrypted
      })
      setLastSavedAt(Date.now())
    } catch (e: any) {
      console.error('saveAnswer failed', e)
      setSaveErr(e?.message || 'Erreur inconnue')
    } finally {
      setSaving(false)
    }
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
  // redirige vers la page de résultats (Jour 4)
    if (sessionId) window.location.href = `/${locale}/tests/${testId}/sessions/${sessionId}`
  }

  const current = answers[q.id]

  const numeric =
    current?.numeric_answer == null
    ? undefined
    : typeof current.numeric_answer === 'string'
      ? parseInt(current.numeric_answer, 10)
      : current.numeric_answer

  const note = current?.text_answer

  const steps = q.input_type === 'likert6' ? 6 : 5

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <ProgressBarMini
        questions={qs}
        currentQuestionId={q.id}
        answers={answers}
        facetStatus={facetStatus}
        size="lg"
        showLegend={false}
        className="mt-2"
      /> 
      <Card className="p-6 space-y-4">
        {/* Header + feedback */}
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-60">{q.question_num} {t('of')} {qs.length}</div>
          <div className="text-xs" aria-live="polite">
            {saving && <span>💾 Enregistrement…</span>}
            {!saving && lastSavedAt && <span>✅ Enregistré {new Date(lastSavedAt).toLocaleTimeString()}</span>}
            {saveErr && <span className="text-red-500">⚠️ {saveErr}</span>}
          </div>
        </div>

        <h3 className="text-lg font-medium">{q.text}</h3>

        {q.input_type.startsWith('likert') && (
          <ScaleSelector
            value={typeof current?.numeric_answer === 'number' ? current.numeric_answer : undefined}
            onChange={(v) => setAnswer(q.id, v, current?.text_answer)}
            steps={steps as 5 | 6}
          />
        )}

        {q.input_type === 'text' && (
          <LongTextInput
            value={current?.text_answer}
            onChange={(v) => setAnswer(q.id, current?.numeric_answer, v)}
            max={300}
          />
        )}

        {q.input_type !== 'text' && (
          <div>
            <div className="text-sm opacity-70 mb-1">{t('optionalNote')}</div>
            <LongTextInput
              value={current?.text_answer}
              onChange={(v) => setAnswer(q.id, current?.numeric_answer, v)}
              max={300}
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="ghost" onClick={onPrev} disabled={saving}>{t('prev')}</Button>
          {index < qs.length - 1 ? (
            <Button onClick={onNext} disabled={saving}>{t('next')}</Button>
          ) : (
            <Button onClick={onFinish} disabled={saving}>Terminer</Button>
          )}
        </div>
      </Card>

      {/* <Card className="p-4">
        <div className="text-sm opacity-70">Facettes (placeholder)</div>
        <ul className="mt-2 space-y-2">
          {[...new Set(qs.map(x => x.facet_id))].map(fid => (<li key={fid} className="text-sm">{fid}</li>))}
        </ul>
      </Card> */}
    </div>
  )
}