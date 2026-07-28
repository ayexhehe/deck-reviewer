import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import allQuestions from '../data/questions.json'
import type { Question } from '../types'
import { shuffle } from '../hooks/useShuffle'
import { supabase } from '../lib/supabase'
import ChoiceButton, { type ChoiceState } from '../components/ChoiceButton'

const questions = allQuestions as Question[]
const QUESTION_COUNT = Math.min(100, questions.length)

const LeaderboardTest: FC = () => {
  const navigate = useNavigate()

  const [pool, setPool] = useState<Question[]>(() => shuffle(questions).slice(0, QUESTION_COUNT))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const [nickname, setNickname] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'error'>('idle')

  const total = pool.length
  const current = pool[currentIndex]

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

  const retake = () => {
    setPool(shuffle(questions).slice(0, QUESTION_COUNT))
    setCurrentIndex(0)
    setSelectedIndex(null)
    setScore(0)
    setDone(false)
    setNickname('')
    setSubmitState('idle')
  }

  const submit = async () => {
    const trimmed = nickname.trim()
    if (!trimmed || submitState === 'submitting') return
    setSubmitState('submitting')
    const pct = Math.round((score / total) * 100 * 100) / 100
    const { error } = await supabase.from('scores').insert({
      nickname: trimmed,
      score,
      total,
      pct,
    })
    if (error) {
      setSubmitState('error')
      return
    }
    navigate('/leaderboard')
  }

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

          <input
            value={nickname}
            onChange={e => setNickname(e.target.value.slice(0, 24))}
            placeholder="Enter a nickname"
            className="w-full bg-chrome-surface border border-chrome-border text-chrome-text placeholder:text-chrome-text-muted rounded-xl px-4 py-3 mb-3 text-center outline-none focus:border-chrome-accent"
          />
          {submitState === 'error' && (
            <p className="text-chrome-danger text-xs mb-3">Couldn't submit your score. Try again.</p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={submit}
              disabled={!nickname.trim() || submitState === 'submitting'}
              className="w-full bg-chrome-accent/15 hover:bg-chrome-accent/25 border border-chrome-accent text-chrome-accent rounded-xl py-4 font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitState === 'submitting' ? 'Submitting…' : 'Submit & View Leaderboard'}
            </button>
            <button
              onClick={retake}
              className="w-full bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-chrome-text rounded-xl py-4 font-semibold transition-colors"
            >
              Retake ({QUESTION_COUNT} questions)
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-transparent hover:bg-chrome-surface border border-chrome-border text-chrome-text-secondary rounded-xl py-4 font-semibold transition-colors"
            >
              Continue Studying
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-chrome-border">
        <button
          onClick={e => { e.stopPropagation(); navigate('/') }}
          className="text-chrome-text-secondary hover:text-chrome-text text-sm transition-colors"
        >
          ← Exit
        </button>
        <span className="text-chrome-text-secondary text-sm font-medium">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="h-1 bg-chrome-surface">
        <div
          className="h-full bg-chrome-accent transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

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

export default LeaderboardTest
