import { Routes, Route } from 'react-router-dom'
import SignUp from '../../src/pages/SignUp'
import SignIn from '../../src/pages/SignIn'
import { useState } from 'react'
import Homepage from '../../src/pages/Homepage'
import Dashboard from '../../src/pages/Dashboard'
import CreatePost from '../../src/pages/CreatePost'

function RouterHandler() {
	const [token, setToken] = useState('')

	return (
		<Routes>
			<Route path="/" element={<Homepage token={token} />} />
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/signin"
				element={!token && <SignIn setToken={setToken} />}
			/>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/dashboard/thought/new" element={<CreatePost />} />
		</Routes>
	)
}

export default RouterHandler
