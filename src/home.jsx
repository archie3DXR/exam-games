import React from 'react'
import GameStats from './components/GameStats'

export default function Home() {
	return (
		<section className='flex flex-col items-center space-y-4'>
			<h1 className='text-3xl font-bold'>Welcome to The Game Hub</h1>

			<h1 className='text-2xl mb-4'>Pick a game from the navbar.</h1>
			<GameStats />
		</section>
	)
}
