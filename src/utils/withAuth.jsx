import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const withAuth = (WrappedComponent) => {
	const Wrapper = (props) => {
		const navigate = useNavigate()
		const [isAuthenticated, setIsAuthenticated] = useState(false)

		useEffect(() => {
			const accessToken = document.cookie.includes('accessToken')
			if (!accessToken) {
				navigate('/signin')
			} else {
				setIsAuthenticated(true)
			}
		}, [])

		return isAuthenticated ? <WrappedComponent {...props} /> : null
	}

	return Wrapper
}

export default withAuth
