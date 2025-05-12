import React from 'react'
import { useLocalScore } from '../engine/useLocalScore'

export default function GameStats() {
	const { wins, resetWins } = useLocalScore()
	return (
		<div className='text-center space-y-2'>
			<p className='mt-4'>
				<span className='text-neonPurple font-bold text-2xl'>Games&nbsp;won:&nbsp;{wins}</span>

				<button
					onClick={resetWins}
					className=' ml-4 text-white  px-2 py-1 rounded-md bg-neonPurple hover:brightness-125 transition-colors duration-300 cursor-pointer'
					aria-label='Reset game win count'
				>
					RESET
				</button>
			</p>
		</div>
	)
}
