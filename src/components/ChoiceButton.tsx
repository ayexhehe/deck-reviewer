import type { FC } from 'react'

export type ChoiceState = 'idle' | 'correct' | 'wrong' | 'reveal'

interface Props {
  label: string
  state: ChoiceState
  onClick?: () => void
  disabled?: boolean
}

const stateClasses: Record<ChoiceState, string> = {
  idle: 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white',
  correct: 'bg-green-600 border-green-500 text-white',
  wrong: 'bg-red-600 border-red-500 text-white',
  reveal: 'bg-green-600 border-green-500 text-white',
}

const ChoiceButton: FC<Props> = ({ label, state, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 text-sm md:text-base leading-snug ${stateClasses[state]} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {label}
    </button>
  )
}

export default ChoiceButton
