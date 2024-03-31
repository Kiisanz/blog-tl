import {
	IconArrowDown,
	IconArrowRight,
	IconArrowUp,
	IconArrowsSplit,
	IconArrowsUp,
	IconEditCircle,
	IconListDetails,
	IconX,
} from '@tabler/icons-react'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../utils/withAuth'
import { Link, NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Loading from '../components/Loading'

function Dashboard() {
	const [decodedToken, setDecodedToken] = useState(null)
	const getCookieValue = (name) => {
		const cookies = document.cookie.split(';')
		for (let cookie of cookies) {
			const [cookieName, cookieValue] = cookie.trim().split('=')
			if (cookieName === name) {
				return cookieValue
			}
		}
		return null
	}

	const refreshToken = async () => {
		const refreshToken = getCookieValue('refreshToken')

		try {
			const response = await axios.get('http://127.0.0.1:3000/auth/token', {
				withCredentials: true,
				headers: { Authorization: `Bearer ${refreshToken}` },
			})
			const newAccessToken = response.data.accessToken
			const date = new Date()
			date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000)
			const expires = `expires=${date.toUTCString()}`
			document.cookie = `accessToken=${newAccessToken};${expires}`
		} catch (error) {
			console.error('Error refreshing token:', error)
		}
	}

	const fetchData = async () => {
		// eslint-disable-next-line no-useless-catch
		try {
			const token = getCookieValue('accessToken')
			const response = await axios.get('http://127.0.0.1:3000/posts', {
				withCredentials: true,
				headers: { Authorization: `Bearer ${token}` },
			})
			return response.data
		} catch (error) {
			throw error
		}
	}

	const fetchDataWithRetry = async () => {
		try {
			return await fetchData()
		} catch (error) {
			const statusCode = error.response ? error.response.status : null
			if (statusCode === 403 || statusCode === 401) {
				await refreshToken()
				return await fetchData()
			} else {
				throw error
			}
		}
	}

	const useFetchData = () => {
		useEffect(() => {
			fetchDataWithRetry()
				.then((data) => {
					// Handle successful data retrieval
					console.log('Data retrieved:', data)
				})
				.catch((error) => {
					// Handle error during data retrieval
					console.error('Error fetching data:', error)
				})
		}, [])
	}
	const [isModal, setIsModal] = useState(true)

	function closeModal() {
		setIsModal((prev) => !prev)
	}
	// Usage
	useFetchData()

	useEffect(() => {
		const refreshToken = getCookieValue('refreshToken')
		const decode = jwtDecode(refreshToken)
		setDecodedToken(decode)
	}, [])

	return (
		<div>
			<div className="flex w-full gap-4">
				<div className="w-[20%]">
					<Sidebar />
				</div>
				<div className="flex flex-col w-full px-6">
					<div className="pt-6 pb-4">
						{!decodedToken ? (
							<Loading />
						) : (
							<>
								<h1 className="text-3xl text-gray-700 font-poppins">
									Welcome back, {decodedToken.username}!
								</h1>
								<span className="text-sm text-gray-600">
									You are logged in as {decodedToken.email}
								</span>
							</>
						)}
					</div>
					{isModal && (
						<div className="relative p-6 bg-yellow-500 rounded-lg">
							<button
								className="absolute text-white transition-all duration-300 ease-in-out rounded-full top-3 right-3 hover:bg-yellow-100 hover:bg-opacity-35"
								onClick={closeModal}>
								<IconX />
							</button>

							<div className="flex flex-col w-2/3">
								<h1 className="text-2xl font-medium text-white">
									Let's share your thoughts
								</h1>
								<p className="text-xs text-white text-medium">
									Where Ideas Flourish and Perspectives Unfold. Dive into a
									world of inspiration, exploration, and intellectual discovery.
									Our platform serves as a sanctuary for diverse thoughts,
									fostering creativity, dialogue, and personal growth.
								</p>
								<div className="flex gap-2 pt-4">
									<button className="px-4 py-1.5 text-sm text-yellow-500 bg-white rounded-md">
										Start writing
									</button>
									<button className="text-sm text-white bg-yellow-50 px-4 py-1.5 rounded-md bg-opacity-35">
										I'll do it later
									</button>
								</div>
							</div>
						</div>
					)}
					<div className="pt-8 pb-6">
						<HeaderSection
							title={'Start creating your thought'}
							desc={
								'Begin your journey of creative expression with Thought, where your ideas find voice and vision.'
							}
						/>
					</div>
					<div className="flex items-center justify-between gap-8">
						<ActionCard to={'/dashboard/thought/new'} icon={<IconEditCircle />}>
							Create your thought
							<p className="text-xs">Dive into Notion editor</p>
						</ActionCard>
						<ActionCard to={'/thought/details'} icon={<IconListDetails />}>
							Add your thought details
							<p className="text-xs">Add the details of your thought</p>
						</ActionCard>
						<ActionCard
							to={'/thought/navigation-setup'}
							icon={<IconArrowsSplit />}>
							Setup your thought navigation
							<p className="text-xs">Add links to your navigation</p>
						</ActionCard>
					</div>
					<div className="pt-8 pb-6">
						<HeaderSection
							title={'Quick Stats'}
							desc={
								'Get instant insights on your thought performance. Track traffic, engagement, and top-performing content effortlessly.'
							}
						/>
					</div>
					<div className="flex items-center justify-between gap-8">
						<QuickStats
							to={'/dashboard/analyze/thoughts'}
							details={'20%'}
							icon={<IconArrowUp size={15} />}>
							<h1 className="font-medium">Total thoughts</h1>
							<h1 className="text-4xl font-bold">20</h1>
						</QuickStats>
						<QuickStats
							to={'/dashboard/analyze/followers'}
							details={'20%'}
							icon={<IconArrowDown size={15} />}>
							<h1 className="font-medium">Total followers</h1>
							<h1 className="text-4xl font-bold">1320</h1>
						</QuickStats>
						<QuickStats
							to={'/dashboard/analyze/likes'}
							details={'20%'}
							icon={<IconArrowUp size={15} />}>
							<h1 className="font-medium">Total thought likes</h1>
							<h1 className="text-4xl font-bold">2018</h1>
						</QuickStats>
					</div>
					<div className="pt-8 pb-6">
						<div className="flex items-center justify-between">
							<HeaderSection
								title={'Recent thoughts'}
								desc={
									'Dive into your most recent articles covering a diverse range of topics, including breaking news, tutorials, product reviews, and helpful tips and tricks.'
								}
							/>
							<NavLink
								to={'/dashboard/recent'}
								className={
									'bg-white px-3 py-1 flex gap-2 rounded-lg border-2 text-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out items-center'
								}>
								See all
								<IconArrowRight size={15} />
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ActionCard({ children, to, icon }) {
	return (
		<Link
			to={to}
			className="flex items-center justify-start w-1/3 gap-2 p-6 text-sm text-gray-600 transition-all duration-300 ease-in-out bg-white border-2 rounded-lg hover:text-gray-800 hover:bg-gray-200">
			<div className="p-3 bg-gray-100 rounded-full">{icon}</div>
			<div className="flex flex-col">{children}</div>
		</Link>
	)
}
function QuickStats({ children, to, details, icon }) {
	return (
		<NavLink
			to={to}
			className="flex items-center justify-between w-1/3 gap-2 p-6 text-gray-600 transition-all duration-300 ease-in-out bg-white border-2 rounded-lg hover:text-gray-800 hover:bg-gray-200">
			<div className="flex flex-col gap-2">{children}</div>
			<div className="flex items-center gap-2 px-3 py-1 text-green-800 bg-green-100 rounded-xl">
				{icon}
				{details}
			</div>
		</NavLink>
	)
}

function HeaderSection({ title, desc }) {
	return (
		<div className="flex flex-col">
			<h1 className="text-xl font-medium text-gray-800">{title}</h1>
			<p className="text-xs text-gray-600">{desc}</p>
		</div>
	)
}

export default withAuth(Dashboard)
