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
      <div className="min-h-screen bg-chrome-bg flex items-center justify-center text-chrome-text">
        <div className="text-center">
          <p className="mb-4 text-chrome-text-secondary">No questions found. Please start from the setup screen.</p>
          <button
            onClick={() => navigate('/mock-setup')}
            className="bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-chrome-text px-6 py-3 rounded-xl"
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
      <div className="min-h-screen bg-chrome-bg flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className={`text-6xl font-bold mb-2 ${passed ? 'text-chrome-accent' : 'text-chrome-danger'}`}>{pct}%</div>
          <div className="text-chrome-text text-2xl font-semibold mb-1">
            {score} / {total}
          </div>
          <div className={`text-sm mb-8 ${passed ? 'text-chrome-accent' : 'text-chrome-danger'}`}>
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
              className="w-full bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-chrome-text rounded-xl py-4 font-semibold transition-colors"
            >
              Retake ({total} questions)
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-transparent hover:bg-chrome-surface border border-chrome-border text-chrome-text-secondary rounded-xl py-4 font-semibold transition-colors"
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
      className="min-h-screen bg-chrome-bg flex flex-col"
      onClick={selectedIndex !== null ? advance : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-chrome-border">
        <button
          onClick={e => { e.stopPropagation(); navigate('/mock-setup') }}
          className="text-chrome-text-secondary hover:text-chrome-text text-sm transition-colors"
        >
          ← Exit
        </button>
        <span className="text-chrome-text-secondary text-sm font-medium">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-chrome-surface">
        <div
          className="h-full bg-chrome-accent transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 md:py-10">
        <p className="text-chrome-text text-base md:text-lg font-medium leading-relaxed mb-6">
          {current.question}
        </p>

        <div className="flex flex-col gap-3">
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
          <div className="mt-6 text-center text-sm text-chrome-text-secondary select-none">
            {isCorrect
              ? <span className="text-chrome-accent font-medium">Correct!</span>
              : <span className="text-chrome-danger font-medium">Wrong answer</span>
            }
            <span className="block mt-1">Tap anywhere to continue</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MockTest
