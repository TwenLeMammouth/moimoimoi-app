
import { create } from 'zustand'

type Answer = {
  question_id: string
  numeric_answer?: number
  text_answer?: string
  updated_at: string
}

type TestState = {
  answers: Record<string, Answer> // par question_id
  setAnswer: (answer: Answer) => void
  resetAnswers: () => void
}

export const useTestStore = create<TestState>((set) => ({
  answers: {},
  setAnswer: (answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [answer.question_id]: {
          ...state.answers[answer.question_id],
          ...answer,
          updated_at: new Date().toISOString(),
        },
      },
    })),
  resetAnswers: () => set({ answers: {} }),
}))

