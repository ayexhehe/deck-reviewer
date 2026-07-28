import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import allQuestions from '../data/questions.json'
import type { Question } from '../types'
import { useShuffled } from '../hooks/useShuffle'

const questions = allQuestions as Question[]

const ReviewCard: FC<{ question: Question; index: number }> = ({ question, index }) => (
  <div className="bg-chrome-surface rounded-xl p-5 md:p-6 border border-chrome-border">
    <div className="text-xs text-chrome-text-muted mb-2">#{index + 1}</div>
    <p className="text-chrome-text text-sm md:text-base font-medium leading-relaxed mb-3">{question.question}</p>
    <p className="text-chrome-accent text-sm md:text-base leading-relaxed">
      {question.choices[question.answer_index]}
    </p>
  </div>
)

const Review: FC = () => {
  const navigate = useNavigate()
  const shuffled = useShuffled(questions)

  return (
    <div className="min-h-screen bg-chrome-bg pb-16">
      <div className="sticky top-0 z-10 bg-chrome-bg/95 backdrop-blur border-b border-chrome-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-chrome-text-secondary hover:text-chrome-text transition-colors text-sm"
        >
          ← Back
        </button>
        <h1 className="text-chrome-text font-semibold">Review Mode</h1>
        <span className="text-chrome-text-muted text-xs ml-auto">{shuffled.length} questions</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        {shuffled.map((q, i) => (
          <ReviewCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Review
