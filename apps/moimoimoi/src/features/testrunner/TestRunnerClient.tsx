'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import type { Question } from './types'
import { Card, Button } from '@oxymammoth/ui'
import { ScaleSelector } from './ui/ScaleSelector'
import { LongTextInput } from './ui/LongTextInput'
import { ensureSession, saveAnswer, finishSession } from './api'
import { useDeviceKey } from '@/features/crypto/useDeviceKey'
import { encryptText } from '@oxymammoth/crypto'
import { bootstrapAnalysis } from './analysisClient'            // on garde bootstrap; (re)lancement silencieux
import { ProgressBarMini } from '@/components/ProgressBarMini'
import { useTestStore } from '@/hooks/useTestStore'

type FacetStatus = 'queued' | 'processing' | 'ready' | 'error'

export default function TestRunnerClient({
  testId,
  questions,
  locale
}: {
  testId: string
  questions: Question[]
  locale: string
}) {
  const t = useTranslations('runner')
  const key = useDeviceKey()

  // ⚠️ On part de ton store existant (qui expose index/questions/answers/...).
  const {
    index,
    setQuestions,
    questions: qs,
    answers,
    setAnswer,
    next,
    prev
  } = useTestStore()

  const [sessionId, setSessionId] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [lastSavedAt, setLastSavedAt] = React.useState<number | null>(null)
  const [saveErr, setSaveErr] = React.useState<string | null>(null)
  const [facetStatus, setFacetStatus] = React.useState<
    Record<string, FacetStatus>
  >({})

  // hydrate les questions dans le store
  React.useEffect(() => {
    setQuestions(questions)
  }, [questions, setQuestions])

  // crée/récupère la session
  React.useEffect(() => {
    ;(async () => {
      if (!sessionId && testId) {
        try {
          const id = await ensureSession(testId)
          if (id) setSessionId(id)
        } catch (e) {
          console.error(e)
        }
      }
    })()
  }, [sessionId, testId])

  // bootstrap des ia_sessions (une par facette)
  React.useEffect(() => {
    ;(async () => {
      if (sessionId) {
        try {
          await bootstrapAnalysis(sessionId)
        } catch {
          /* silent */
        }
      }
    })()
  }, [sessionId])

  // polling statut ia_sessions → barre mini (facets)
  React.useEffect(() => {
    if (!sessionId) return
    const id = setInterval(async () => {
      try {
        const r = await fetch(`/api/analysis/session/${sessionId}/status`)
        const j = await r.json()
        if (j?.ok && Array.isArray(j.items)) {
          const map: Record<string, FacetStatus> = {}
          for (const it of j.items) map[it.facet_id] = it.status as FacetStatus
          setFacetStatus(map)
        }
      } catch {
        /* silent */
      }
    }, 6500)
    return () => clearInterval(id)
  }, [sessionId])

  const q = qs[index]
  if (!q)
    return (
      <Card className="p-8 text-center">
        <Button onClick={next}>{t('start')}</Button>
      </Card>
    )

  async function persist(qid: string) {
    if (!sessionId) return
    const current = answers[qid]

    // chiffre la note uniquement si non vide et si clé dispo
    let noteEncrypted: { iv: string; ct: string } | null = null
    try {
      setSaving(true)
      setSaveErr(null)
      if (key && current?.text_answer && current.text_answer.trim()) {
        noteEncrypted = await encryptText(current.text_answer, key)
      }
      await saveAnswer({
        session_id: sessionId,
        question_id: qid,
        numeric_answer:
          typeof current?.numeric_answer === 'number'
            ? current.numeric_answer
            : current?.numeric_answer == null
            ? null
            : Number.parseInt(String(current.numeric_answer), 10),
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
    // Résumé/share secondaire : on n’y va pas automatiquement si tu veux rester “tout-en-une-page”.
    // Si tu veux quand même l’URL:
    // window.location.href = `/${locale}/tests/${testId}/sessions/${sessionId}`
  }

  const current = answers[q.id]
  const numericValue =
    typeof current?.numeric_answer === 'number'
      ? current.numeric_answer
      : undefined
  const noteValue = current?.text_answer
  const steps: 5 | 6 = q.input_type === 'likert6' ? 6 : 5

  return (
    <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-[1fr_360px] p-4 md:p-6">
      {/* top progress */}
      <div className="md:col-span-2">
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/70"
            style={{ width: `${((index + 1) / (qs.length || 1)) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs opacity-70">
          {index + 1} / {qs.length}
        </div>
      </div>

      {/* carte principale */}
      <Card className="p-6 space-y-5 bg-white/5 backdrop-blur border border-white/10 shadow-soft">
        <div className="flex items-center justify-between text-sm opacity-70">
          <span>
            {q.question_num} {t('of')} {qs.length}
          </span>
          <span className="text-xs" aria-live="polite">
            {saving && <span>💾 Enregistrement…</span>}
            {!saving && lastSavedAt && (
              <span>✅ {new Date(lastSavedAt).toLocaleTimeString()}</span>
            )}
            {saveErr && <span className="text-red-500">⚠️ {saveErr}</span>}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold leading-snug">
          {q.text}
        </h3>

        {q.input_type.startsWith('likert') && (
          <ScaleSelector
            value={numericValue}
            onChange={(v) => setAnswer(q.id, v, noteValue)}
            steps={steps}
          />
        )}

        {q.input_type === 'text' ? (
          <LongTextInput
            value={noteValue}
            onChange={(v) => setAnswer(q.id, numericValue, v)}
            max={300}
          />
        ) : (
          <div>
            <div className="text-sm opacity-70 mb-1">
              {t('optionalNote')}
            </div>
            <LongTextInput
              value={noteValue}
              onChange={(v) => setAnswer(q.id, numericValue, v)}
              max={300}
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="ghost" onClick={onPrev} disabled={saving}>
            {t('prev')}
          </Button>
          {index < qs.length - 1 ? (
            <Button onClick={onNext} disabled={saving}>
              {t('next')}
            </Button>
          ) : (
            <Button onClick={onFinish} disabled={saving}>
              Terminer
            </Button>
          )}
        </div>
      </Card>

      {/* sidebar (facettes + mini-grille) */}
      <Card className="p-5 bg-white/5 backdrop-blur border border-white/10">
        <div className="text-sm opacity-80 mb-3">Facettes</div>
        <ProgressBarMini
          questions={qs.map((x) => ({ id: x.id, facet_id: x.facet_id }))}
          currentQuestionId={q.id}
          answers={answers as any}                // shape compatible avec le composant
          facetStatus={facetStatus}
          size="md"
          showLegend={false}
          className="mt-2"
        />
      </Card>
    </div>
  )
}
