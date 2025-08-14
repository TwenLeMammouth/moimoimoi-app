'use client'

import { cn } from '@/lib/utils'

interface Question {
  id: string
  facet_id: string
}

interface Response {
  question_id: string
}

interface Facet {
  facet_id: string
  category: string
}

interface IaSession {
  facet_id: string
  status: 'pending' | 'processing' | 'done'
}

interface Answer {
  numeric_answer?: number
  text_answer?: string
}

interface Props {
  questions: Question[]
  responses: Response[]
  facets: Facet[]
  iaSessions: IaSession[]
  currentQuestionId: string
  answers: Record<string, Answer>
}

export default function ProgressBarMini({
  questions,
  responses,
  facets,
  iaSessions,
  currentQuestionId,
  answers,
}: Props) {
  const answeredIds = new Set(responses.map(r => r.question_id))
  const iaDoneFacets = new Set(
    iaSessions.filter(s => s.status === 'done').map(s => s.facet_id)
  )

  const questionsByFacet = facets.map(facet => {
    const relatedQuestions = questions.filter(q => q.facet_id === facet.facet_id)
    const iaStatus = iaSessions.find(s => s.facet_id === facet.facet_id)?.status ?? 'pending'
    return {
      facet,
      questions: relatedQuestions,
      iaStatus,
    }
  })

  const getIaSymbol = (status: string) => {
    switch (status) {
      case 'done': return '✅'
      case 'processing': return '🌀'
      case 'pending': return '⏳'
      default: return ''
    }
  }
  
  return (
    <div className="w-full flex flex-wrap justify-center gap-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      {questionsByFacet.map(({ facet, questions, iaStatus }) => (
        <div key={facet.facet_id} className="flex flex-col p-2 items-center rounded-md bg-white">
          <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-medium capitalize">
            {facet.facet_id} <span className="ml-1">{getIaSymbol(iaStatus)}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {questions.map((q, index) => {
              const isActive = q.id === currentQuestionId
              const isLocked = iaDoneFacets.has(q.facet_id)

              const answer = answers[q.id]
              const isAnswered = !!answer?.numeric_answer
              const isEnriched = isAnswered && !!answer?.text_answer?.trim()

              return (
                <div
                  key={q.id}
                  title={`Question ${index + 1}`}
                  className={cn(
                    'w-4 h-4 rounded-sm border transition-all',
                    isLocked
                      ? 'bg-gray-400 border-gray-500'
                      : isEnriched
                      ? 'bg-blue-400 border-blue-600'
                      : isAnswered
                      ? 'bg-green-400 border-green-600'
                      : 'bg-gray-200 border-gray-300',
                    isActive && 'ring-2 ring-green-700 dark:ring-white ring-offset-2'
                  )}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
