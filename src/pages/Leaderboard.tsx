import { useEffect, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { ScoreEntry } from '../types'

const Leaderboard: FC = () => {
  const navigate = useNavigate()
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    supabase
      .from('scores')
      .select('*')
      .order('pct', { ascending: false })
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setStatus('error')
          return
        }
        setScores((data ?? []) as ScoreEntry[])
        setStatus('ready')
      })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen bg-chrome-bg pb-16">
      <div className="sticky top-0 z-10 bg-chrome-bg/95 backdrop-blur border-b border-chrome-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-chrome-text-secondary hover:text-chrome-text transition-colors text-sm"
        >
          ← Back
        </button>
        <h1 className="text-chrome-text font-semibold">Leaderboard</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {status === 'loading' && (
          <p className="text-chrome-text-secondary text-sm text-center py-12">Loading scores…</p>
        )}
        {status === 'error' && (
          <p className="text-chrome-danger text-sm text-center py-12">Couldn't load the leaderboard. Try again later.</p>
        )}
        {status === 'ready' && scores.length === 0 && (
          <p className="text-chrome-text-secondary text-sm text-center py-12">No scores yet — be the first to take the leaderboard test!</p>
        )}
        {status === 'ready' && scores.length > 0 && (
          <div className="flex flex-col gap-2">
            {scores.map((entry, i) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 bg-chrome-surface border border-chrome-border rounded-xl px-4 py-3"
              >
                <span className="text-chrome-text-muted text-sm font-medium w-6 text-right">{i + 1}</span>
                <span className="text-chrome-text font-medium flex-1 truncate">{entry.nickname}</span>
                <span className="text-chrome-text-secondary text-sm">{entry.score}/{entry.total}</span>
                <span className="text-chrome-accent font-semibold w-14 text-right">{entry.pct}%</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/leaderboard-test')}
          className="w-full mt-6 bg-chrome-surface hover:bg-chrome-elevated border border-chrome-border text-chrome-text rounded-xl py-4 font-semibold transition-colors"
        >
          Take the Test
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
