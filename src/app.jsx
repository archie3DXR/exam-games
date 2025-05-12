import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './home'
import Game1 from './games/TixtacToe'

// Placeholder pages until you add real games
const Stub = ({ name }) => <h2 className='text-xl'>{name} coming soon…</h2>

export default function App() {
	return (
		<>
			<Header />
			<main className='pt-[80px] pb-[50px] min-h-screen flex flex-col items-center justify-center'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/game1'
						element={<Game1 />}
					/>
					<Route
						path='/g2'
						element={<Stub name='Game 2' />}
					/>
					<Route
						path='/g3'
						element={<Stub name='Game 3' />}
					/>
					<Route
						path='*'
						element={<h1>404</h1>}
					/>
				</Routes>
			</main>
			<Footer />
		</>
	)
}
