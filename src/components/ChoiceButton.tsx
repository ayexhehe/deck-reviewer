import type { FC } from 'react'

export type ChoiceState = 'idle' | 'correct' | 'wrong' | 'reveal'

interface Props {
  label: string
  state: ChoiceState
  onClick?: () => void
  disabled?: boolean
}

const stateClasses: Record<ChoiceState, string> = {
  idle: 'bg-chrome-surface hover:bg-chrome-elevated border-chrome-border text-chrome-text',
  correct: 'bg-chrome-accent/15 border-chrome-accent text-chrome-accent',
  wrong: 'bg-chrome-danger/15 border-chrome-danger text-chrome-danger',
  reveal: 'bg-chrome-accent/15 border-chrome-accent text-chrome-accent',
}

const ChoiceButton: FC<Props> = ({ label, state, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 text-sm md:text-base leading-snug ${stateClasses[state]} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {label}
    </button>
  )
}

export default ChoiceButton
