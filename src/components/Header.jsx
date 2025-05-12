import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const links = [
	{ to: '/', lg: 'Home', sm: 'H' },
	{ to: '/game1', lg: 'Game 1', sm: '1' },
	{ to: '/game2', lg: 'Game 2', sm: '2' },
	{ to: '/game3', lg: 'Game 3', sm: '3' },
]

export default function Header() {
	return (
		<header className='fixed top-0 w-full h-20 bg-[#000000FF] flex items-center justify-between z-10'>
			<img
				src={logo}
				alt='logo'
				className='w-[50px] h-[50px] m-[15px]'
			/>

			<nav className=' text-neonPurple mr-6 space-x-4 text-xl '>
				{links.map(({ to, lg, sm }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) => `hover:text-white ${isActive ? 'font-bold' : ''}`}
					>
						<span className='hidden lg:inline'>{lg}</span>
						<span className='lg:hidden'>{sm}</span>
					</NavLink>
				))}
			</nav>
		</header>
	)
}
