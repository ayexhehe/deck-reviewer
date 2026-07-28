import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Deck Cadet Reviewer</h1>
        <p className="text-slate-400 text-sm md:text-base">600+ exam questions — study, review, and test yourself</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <button
          onClick={() => navigate('/review')}
          className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl px-6 py-5 text-left transition-colors"
        >
          <div className="text-lg font-semibold">Review</div>
          <div className="text-blue-200 text-sm mt-0.5">Browse all questions with instant answer reveal</div>
        </button>

        <button
          onClick={() => navigate('/mock-setup')}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl px-6 py-5 text-left transition-colors"
        >
          <div className="text-lg font-semibold">Mock Test</div>
          <div className="text-indigo-200 text-sm mt-0.5">Timed randomized test — see your score at the end</div>
        </button>

        <div className="w-full bg-slate-700/50 rounded-xl px-6 py-5 text-left opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-300">Quiz Leaderboard</span>
            <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Coming Soon</span>
          </div>
          <div className="text-slate-500 text-sm mt-0.5">Compete with others on the global leaderboard</div>
        </div>
      </div>
    </div>
  )
}

export default Landing
