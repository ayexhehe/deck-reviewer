export interface Question {
  id: number
  source: string
  source_question_num: number
  category: string | null
  question: string
  choices: string[]
  answer_index: number
  needs_review: boolean
  source_page: number
  status: string
  note: string
}

export interface ScoreEntry {
  id: number
  nickname: string
  score: number
  total: number
  pct: number
  created_at: string
}
