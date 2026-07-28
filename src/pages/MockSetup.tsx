import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import allQuestions from '../data/questions.json'
import type { Question } from '../types'
import { shuffle } from '../hooks/useShuffle'

const questions = allQuestions as Question[]

const COUNTS = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '250', value: 250 },
  { label: `All (${questions.length})`, value: questions.length },
]

const MockSetup: FC = () => {
  const navigate = useNavigate()

  const start = (count: number) => {
    const selected = shuffle(questions).slice(0, count)
    navigate('/mock-test', { state: { questions: selected } })
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-white text-sm mb-8 block"
        >
          ← Back
        </button>
        <h1 className="text-white text-2xl font-bold mb-2">Mock Test</h1>
        <p className="text-slate-400 text-sm mb-8">How many questions do you want to answer?</p>

        <div className="flex flex-col gap-3">
          {COUNTS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => start(value)}
              className="w-full bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white rounded-xl px-6 py-4 text-left font-semibold transition-colors"
            >
              {label} Questions
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MockSetup
