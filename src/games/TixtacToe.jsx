import makeGame from './GameTemplate.jsx'

import Grid from '../components/Grid.jsx'

const TicTacToe = makeGame({
	title: 'Tic-Tac-Toe',
	initState: { turn: 'X', board: Array(9).fill(null) },
	onKey: () => false, // not needed; we’ll use clicks
	renderBoard: (state, set) => (
		<Grid
			rows={3}
			cols={3}
			data={[state.board.slice(0, 3), state.board.slice(3, 6), state.board.slice(6, 9)]}
			size='100px'
			render={(v, i) => (
				<div
					key={i}
					className='cell w-[100px] h-[100px] border-[10px] border-neonBlue flex items-center justify-center text-[60px] font-bold text-neonPurple'
					onClick={() =>
						!v &&
						set((s) => {
							const b = [...s.board]
							b[i] = s.turn
							return { board: b, turn: s.turn === 'X' ? 'O' : 'X' }
						})
					}
				>
					{v}
				</div>
			)}
		/>
	),
	winCheck: ({ board }) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		return lines.some(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c])
	},
})

export default TicTacToe
