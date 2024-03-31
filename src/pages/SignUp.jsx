import {
	IconAlertCircleFilled,
	IconCircleCheckFilled,
	IconEye,
	IconEyeOff,
	IconLockFilled,
	IconMailFilled,
	IconUserFilled,
} from '@tabler/icons-react'
import Illustration from '../assets/illustration.webp'
import Form from '../components/Form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
const SignUp = () => {
	const navigate = useNavigate()
	const [isTyping, setIsTyping] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [isValid, setIsValid] = useState(false)
	const [isInvalid, setIsInvalid] = useState(false)
	const [isNotif, setIsNotif] = useState('')
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
	})

	function HandleTyping(e) {
		setForm({ ...form, [e.target.name]: e.target.value })
		setIsTyping(e.target.value.length > 0)
	}

	function showPassword() {
		setIsVisible((prev) => !prev)
	}

	function ShowPasswordButton() {
		return (
			<button
				type="button"
				className="transition-all duration-300 hover:text-gray-600"
				onClick={showPassword}>
				{!isVisible ? <IconEye /> : <IconEyeOff />}
			</button>
		)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(
				'http://127.0.0.1:3000/user/register',
				form
			)
			setIsValid(!isValid)
			setIsNotif(response.data.payload.message)
			setTimeout(() => {
				setIsValid((prev) => !prev)
				navigate('/signin')
			}, 2000)
		} catch (error) {
			let message = error.response.data.payload.message
			setIsInvalid(!isInvalid)
			setIsNotif(message)
			setTimeout(() => {
				setIsInvalid((prev) => !prev)
			}, 2000)
		}
	}

	useEffect(() => {
		const accessToken = document.cookie.includes('accessToken')
		if (accessToken) {
			navigate('/dashboard')
		} else {
			setIsAuthenticated(true)
		}
	}, [])

	if (!isAuthenticated) return null

	return (
		<div>
			<div className="relative flex items-center w-full min-h-screen bg-white">
				{isValid && (
					<Toast message={isNotif}>
						<IconCircleCheckFilled size={20} />
					</Toast>
				)}{' '}
				{isInvalid && (
					<Toast className="text-red-800 bg-red-200" message={isNotif}>
						<IconAlertCircleFilled size={20} />
					</Toast>
				)}
				<div className="items-center justify-center hidden w-1/2 h-screen bg-white lg:flex rounded-e-full">
					<img className={'w-72 h-72'} src={Illustration} />
				</div>
				<div className="w-full lg:w-1/2">
					<Form onSubmit={handleSubmit} action="/">
						<Form.Header description={'Please enter your detail bellow'}>
							Sign Up
						</Form.Header>
						<Form.Input
							placeholder={'Username'}
							type="text"
							name="username"
							value={form.username}
							onChange={HandleTyping}>
							<IconUserFilled />
						</Form.Input>
						<Form.Input
							placeholder={'example@email.com'}
							type="email"
							name="email"
							value={form.email}
							onChange={HandleTyping}>
							<IconMailFilled />
						</Form.Input>
						<Form.Input
							placeholder={'Password'}
							type={!isVisible ? 'password' : 'text'}
							onChange={HandleTyping}
							value={form.password}
							name="password"
							option={isTyping && <ShowPasswordButton />}>
							<IconLockFilled />
						</Form.Input>
						<Form.Footer>Sign Up</Form.Footer>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default SignUp
