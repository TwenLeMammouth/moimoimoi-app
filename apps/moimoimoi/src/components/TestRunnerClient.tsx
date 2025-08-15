'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../../packages/supabase/src/client'
import { v4 as uuidv4 } from 'uuid'
import { useTestStore } from '@/hooks/useTestStore'
import { QuestionCard, QuestionCardHeader, QuestionCardContent, QuestionCardFooter } from '@/components/ui/QuestionCard'
import { ScaleSelector } from '@/components/ui/ScaleSelector'
import { LongTextInput } from '@/components/ui/TextInput'
import { Button } from '@/components/ui/ButtonM'
import ProgressBarMini from '@/components/ProgressBarMini'

interface Question {
  id: string
  question_num: number
  input_type: string
  facet_id: string
  questions_translations: {
    questions_text: string
    image_url: string
  }[]
}

interface Facet {
  facet_id: string
  category: string
}

interface IaSession {
  facet_id: string
  status: 'pending' | 'processing' | 'done'
}

interface Response {
  question_id: string
  numeric_answer: number
  text_answer: string
}

interface Props {
  questions: Question[]
  facets: Facet[]
  responses: Response[]
  iaSessions: IaSession[]
  sessionId: string
}

export default function TestRunnerClient({ questions, facets, responses, iaSessions, sessionId }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentQuestion = questions[currentIndex]

  // const supabase = createClientComponentClient()

  const { answers, setAnswer } = useTestStore()
  const currentAnswer = answers[currentQuestion.id]

  const answeredIds = useMemo(() => new Set(responses.map(r => r.question_id)), [responses])
  const alreadyAnswered = answeredIds.has(currentQuestion.id)

  const [note, setNote] = useState<number>(currentAnswer?.numeric_answer ?? 0)
  const [text, setText] = useState(currentAnswer?.text_answer ?? '')

  useEffect(() => {
    setNote(currentAnswer?.numeric_answer ?? 0)
    setText(currentAnswer?.text_answer ?? '')
  }, [currentQuestion.id])

  useEffect(() => {
  // Hydrate le store depuis les responses chargées côté serveur
  for (const response of responses) {
    setAnswer({
      question_id: response.question_id,
      numeric_answer: response.numeric_answer ?? 0,
      text_answer: response.text_answer ?? '',
      updated_at: new Date().toISOString(),
    })
  }
}, [])

  const handleSubmit = async () => {
    const userRes = await supabase.auth.getUser()
    const user = userRes.data.user
    if (!user) return

    const payload = {
      id: uuidv4(),
      user_id: user.id,
      session_id: sessionId,  
      question_id: currentQuestion.id,
      numeric_answer: note,
      text_answer: text,
      created_at: new Date().toISOString(),
      app_scope: 'moimoimoi',
    }

    const { error } = await supabase.from('responses').upsert(payload)
    if (error) {
      console.error('[Submit Error]', error)
      return
    }

    setAnswer({
      question_id: currentQuestion.id,
      numeric_answer: note,
      text_answer: text,
      updated_at: new Date().toISOString(),
    })

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }

    const facetId = currentQuestion.facet_id
    const facetQuestions = questions.filter(q => q.facet_id === facetId)

    const allAnswers = [...responses, {
      question_id: currentQuestion.id,
      numeric_answer: note,
      text_answer: text
    }]
    const answeredIds = new Set(allAnswers.map(r => r.question_id))
    
    const allAnswered = facetQuestions.every(q => answeredIds.has(q.id))


    const alreadyLaunched = iaSessions.find(s => s.facet_id === facetId)

console.log('allAnswered', allAnswered)
console.log('alreadyLaunched', !alreadyLaunched)
    if (allAnswered && !alreadyLaunched) {
      await supabase.from('ia_sessions').insert({
        user_id: user.id,
        test_session_id: sessionId,
        facet_id: facetId,
        status: 'pending',
        // created_at: new Date().toISOString(),
        // app_scope: 'moimoimoi',
      })
    }
  }

  const isFacetLocked = useMemo(() => {
    const facet = currentQuestion.facet_id
    return iaSessions.some(s => s.facet_id === facet && s.status === 'done')
  }, [currentQuestion.facet_id, iaSessions])

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-white dark:bg-black">
      <div className="w-full max-w-4xl px-4 py-2">
        <ProgressBarMini
          questions={questions}
          responses={responses}
          facets={facets}
          iaSessions={iaSessions}
          currentQuestionId={currentQuestion.id}
          answers={answers}
        />
      </div>

      <main className="w-full flex-1 flex justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          <QuestionCard>
            <QuestionCardHeader
              image={currentQuestion.questions_translations[0]?.image_url}
            >
              {currentQuestion.questions_translations[0]?.questions_text ?? '…'}
            </QuestionCardHeader>

            <QuestionCardContent>
              {currentQuestion.input_type === 'likert_1_5' && (
                <ScaleSelector
                  value={note}
                  onChange={isFacetLocked ? () => {} : setNote}
                  labels={{ 1: 'Pas du tout', 5: 'Tout à fait' }}
                  size={5}
                />
              )}

              <LongTextInput
                value={text}
                onChange={isFacetLocked ? () => {} : setText}
                placeholder="Développe un peu ici si tu veux…"
                disabled={isFacetLocked}
              />
            </QuestionCardContent>

            <QuestionCardFooter className="flex justify-between">
              <Button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                Précédent
              </Button>

              <Button 
                disabled={note === 0 && text.trim() === '' || isFacetLocked}
                onClick={handleSubmit}>
                {currentIndex < questions.length - 1 ? 'Suivant' : 'Terminer'}
              </Button>
            </QuestionCardFooter>
          </QuestionCard>
        </div>
      </main>
    </div>
  )
}
