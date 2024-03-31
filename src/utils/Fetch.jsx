import axios from 'axios'

const fetch = {}

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

fetch.getAllPosts = async () => {
	try {
		const response = await axios.get('http://localhost:3000/posts')

		return response.data
	} catch (error) {
		console.error('Error:', error.message)
		return null
	}
}

fetch.Dashboard = async () => {
	try {
		let accessToken = getCookieValue('accessToken')
	} catch (error) {
		console.log(error)
	}
}

export default fetch
