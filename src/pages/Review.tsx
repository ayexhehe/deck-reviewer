import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import allQuestions from '../data/questions.json'
import type { Question } from '../types'
import { useShuffled } from '../hooks/useShuffle'
import ChoiceButton, { type ChoiceState } from '../components/ChoiceButton'

const questions = allQuestions as Question[]

interface CardState {
  selected: number | null
}

const ReviewCard: FC<{ question: Question; index: number }> = ({ question, index }) => {
  const [state, setState] = useState<CardState>({ selected: null })

  const getChoiceState = (i: number): ChoiceState => {
    if (state.selected === null) return 'idle'
    if (i === question.answer_index) return 'correct'
    if (i === state.selected) return 'wrong'
    return 'idle'
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 md:p-6 border border-slate-700">
      <div className="text-xs text-slate-500 mb-2">#{index + 1}</div>
      <p className="text-white text-sm md:text-base font-medium leading-relaxed mb-4">{question.question}</p>
      <div className="flex flex-col gap-2">
        {question.choices.map((choice, i) => (
          <ChoiceButton
            key={i}
            label={choice}
            state={getChoiceState(i)}
            disabled={state.selected !== null}
            onClick={() => setState({ selected: i })}
          />
        ))}
      </div>
    </div>
  )
}

const Review: FC = () => {
  const navigate = useNavigate()
  const shuffled = useShuffled(questions)

  return (
    <div className="min-h-screen bg-slate-900 pb-16">
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-white transition-colors text-sm"
        >
          ← Back
        </button>
        <h1 className="text-white font-semibold">Review Mode</h1>
        <span className="text-slate-500 text-xs ml-auto">{shuffled.length} questions</span>
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
