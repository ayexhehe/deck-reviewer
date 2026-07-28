import { useState, type FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { Question } from '../types'
import ChoiceButton, { type ChoiceState } from '../components/ChoiceButton'
import { shuffle } from '../hooks/useShuffle'

interface LocationState {
  questions: Question[]
}

const MockTest: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { questions } = (location.state as LocationState) ?? { questions: [] }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="mb-4 text-slate-400">No questions found. Please start from the setup screen.</p>
          <button
            onClick={() => navigate('/mock-setup')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl"
          >
            Go to Setup
          </button>
        </div>
      </div>
    )
  }

  const total = questions.length
  const current = questions[currentIndex]

  const handleChoice = (i: number) => {
    if (selectedIndex !== null) return
    setSelectedIndex(i)
    if (i === current.answer_index) setScore(s => s + 1)
  }

  const advance = () => {
    if (selectedIndex === null) return
    if (currentIndex + 1 >= total) {
      setDone(true)
    } else {
      setCurrentIndex(idx => idx + 1)
      setSelectedIndex(null)
    }
  }

  const getChoiceState = (i: number): ChoiceState => {
    if (selectedIndex === null) return 'idle'
    if (i === current.answer_index) return 'correct'
    if (i === selectedIndex) return 'wrong'
    return 'idle'
  }

  const isCorrect = selectedIndex !== null && selectedIndex === current.answer_index

  if (done) {
    const pct = Math.round((score / total) * 100)
    const passed = pct >= 75
    return (
      <div
        className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-12 cursor-pointer"
        onClick={() => {}}
      >
        <div className="w-full max-w-sm text-center">
          <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-400' : 'text-red-400'}`}>{pct}%</div>
          <div className="text-white text-2xl font-semibold mb-1">
            {score} / {total}
          </div>
          <div className={`text-sm mb-8 ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {passed ? 'Passed' : 'Failed'}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                const reshuffled = shuffle(questions)
                navigate('/mock-test', { state: { questions: reshuffled }, replace: true })
                setCurrentIndex(0)
                setSelectedIndex(null)
                setScore(0)
                setDone(false)
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-4 font-semibold"
            >
              Retake ({total} questions)
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-xl py-4 font-semibold"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-slate-900 flex flex-col"
      onClick={selectedIndex !== null ? advance : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <button
          onClick={e => { e.stopPropagation(); navigate('/mock-setup') }}
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← Exit
        </button>
        <span className="text-slate-300 text-sm font-medium">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-700">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 md:py-10">
        <p className="text-white text-base md:text-lg font-medium leading-relaxed mb-6">
          {current.question}
        </p>

        <div className="flex flex-col gap-3" onClick={e => e.stopPropagation()}>
          {current.choices.map((choice, i) => (
            <ChoiceButton
              key={i}
              label={choice}
              state={getChoiceState(i)}
              disabled={selectedIndex !== null}
              onClick={() => handleChoice(i)}
            />
          ))}
        </div>

        {selectedIndex !== null && (
          <div className="mt-6 text-center text-sm text-slate-400 select-none">
            {isCorrect
              ? <span className="text-green-400 font-medium">Correct!</span>
              : <span className="text-red-400 font-medium">Wrong answer</span>
            }
            <span className="block mt-1">Tap anywhere to continue</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MockTest
