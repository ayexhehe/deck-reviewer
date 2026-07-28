import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Leaderboard: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-chrome-bg flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="text-5xl mb-4">🏆</div>
        <h1 className="text-chrome-text text-2xl font-bold mb-2">Quiz Leaderboard</h1>
        <p className="text-chrome-text-secondary text-sm mb-8">Coming soon — compete with other reviewers!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-chrome-text px-6 py-3 rounded-xl font-medium transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
