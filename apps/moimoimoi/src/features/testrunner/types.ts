
export type Question = {
  id: string
  question_num: number
  facet_id: string
  input_type: 'likert5' | 'likert6' | 'text'
  text: string
}

export type Facet = { facet_id: string; name: string }

export type TestData = {
  test_id: string
  name: string
  facets: Facet[]
  questions: Question[]
}