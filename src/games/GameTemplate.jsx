import React from 'react'
import Grid from '../components/Grid'
import { useLocalScore } from '../engine/useLocalScore'
import { useGameLoop } from '../engine/useGameLoop'
import { useKeyPress } from '../engine/useKeyPress'

export default function makeGame({ title, initState, onKey, onTick, renderBoard, winCheck }) {
	return function Game() {
		const { addWin } = useLocalScore()
		const [state, setState] = React.useState(initState)
		const [hasWon, setHasWon] = React.useState(false)
		const reset = () => {
			setHasWon(false)
			setState(initState)
		}

		useKeyPress((e) => {
			const newState = onKey(e, state)
			if (newState) setState(newState)
		})

		useGameLoop(
			() => {
				if (onTick) setState((s) => onTick(s))
			},
			onTick ? 1000 : null
		)

		React.useEffect(() => {
			if (!hasWon && winCheck(state)) {
				alert('Correct!')
				addWin()
				setHasWon(true)
				reset()
			}
		}, [state])

		return (
			<section className='flex flex-col items-center space-y-4'>
				<h2 className='text-xl font-semibold'>{title}</h2>
				{renderBoard(state, setState)}
				<button
					className='btn'
					onClick={reset}
				>
					Reset
				</button>
			</section>
		)
	}
}
