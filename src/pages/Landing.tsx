import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-chrome-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-chrome-text mb-2">Deck Cadet Reviewer</h1>
        <p className="text-chrome-text-secondary text-sm md:text-base">600+ exam questions — study, review, and test yourself</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        <button
          onClick={() => navigate('/review')}
          className="w-full bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-left rounded-xl px-6 py-5 transition-colors"
        >
          <div className="text-lg font-semibold text-chrome-text">Review</div>
          <div className="text-chrome-text-secondary text-sm mt-0.5">Browse all questions with instant answer reveal</div>
        </button>

        <button
          onClick={() => navigate('/mock-setup')}
          className="w-full bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-left rounded-xl px-6 py-5 transition-colors"
        >
          <div className="text-lg font-semibold text-chrome-text">Mock Test</div>
          <div className="text-chrome-text-secondary text-sm mt-0.5">Timed randomized test — see your score at the end</div>
        </button>

        <button
          onClick={() => navigate('/leaderboard-test')}
          className="w-full bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-left rounded-xl px-6 py-5 transition-colors"
        >
          <div className="text-lg font-semibold text-chrome-text">Quiz Leaderboard</div>
          <div className="text-chrome-text-secondary text-sm mt-0.5">100 random questions — compete on the global leaderboard</div>
        </button>

        <button
          onClick={() => navigate('/leaderboard')}
          className="text-chrome-text-secondary hover:text-chrome-text text-sm text-center transition-colors"
        >
          View leaderboard →
        </button>
      </div>
    </div>
  )
}

export default Landing
