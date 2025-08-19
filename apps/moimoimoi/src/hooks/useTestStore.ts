'use client'
import { create } from 'zustand'

type Answer = {
  question_id: string
  numeric_answer?: number | null
  text_answer?: string
  updated_at: string
}

type Question = {
  id: string
  input_type: string
  question_num: number
  facet_id: string
  text: string
}

type TestState = {
  // — ancien —
  answers: Record<string, Answer>
  setAnswer: (a: Answer | string, value?: number | null, note?: string) => void
  resetAnswers: () => void
  // — nouveau (ajout) —
  index: number
  questions: Question[]
  setQuestions: (qs: Question[]) => void
  next: () => void
  prev: () => void
}

export const useTestStore = create<TestState>((set, get) => ({
  // ancien
  answers: {},
  setAnswer: (a, value, note) =>
    set((state) => {
      const now = new Date().toISOString()
      if (typeof a === 'string') {
        // compat: setAnswer(qid, value, note)
        const question_id = a
        const prev = state.answers[question_id]
        return {
          answers: {
            ...state.answers,
            [question_id]: {
              question_id,
              numeric_answer: value ?? prev?.numeric_answer ?? null,
              text_answer: note ?? prev?.text_answer,
              updated_at: now
            }
          }
        }
      } else {
        // ancien: setAnswer({ question_id, ... })
        const question_id = a.question_id
        return {
          answers: {
            ...state.answers,
            [question_id]: {
              ...state.answers[question_id],
              ...a,
              updated_at: now
            }
          }
        }
      }
    }),
  resetAnswers: () => set({ answers: {} }),

  // ajout (navigation + liste)
  index: 0,
  questions: [],
  setQuestions: (qs) => set({ questions: qs, index: 0 }),
  next: () => set((s) => ({ index: Math.min(s.index + 1, Math.max(s.questions.length - 1, 0)) })),
  prev: () => set((s) => ({ index: Math.max(s.index - 1, 0) }))
}))
