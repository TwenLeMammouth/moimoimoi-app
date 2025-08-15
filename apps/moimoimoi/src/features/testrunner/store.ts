'use client'

import { create } from 'zustand'
import type { Question } from './types'

type Answer = { qid: string; value?: number; note?: string }

type State = {
  index: number
  answers: Record<string, Answer>
  questions: Question[]
  setQuestions: (qs: Question[]) => void
  setAnswer: (qid: string, value?: number, note?: string) => void
  next: () => void
  prev: () => void
}

export const useRunner = create<State>((set, get) => ({
  index: 0,
  answers: {},
  questions: [],
  setQuestions: (qs) => set({ questions: qs, index: 0 }),
  setAnswer: (qid, value, note) => set((s) => ({
    answers: { ...s.answers, [qid]: { qid, value, note } }
  })),
  next: () => set((s) => ({ index: Math.min(s.index + 1, s.questions.length - 1) })),
  prev: () => set((s) => ({ index: Math.max(s.index - 1, 0) }))
}))