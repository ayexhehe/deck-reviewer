import { useMemo } from 'react'
import type { Question } from '../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useShuffled(questions: Question[]): Question[] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => shuffle(questions), [])
}

export { shuffle }
