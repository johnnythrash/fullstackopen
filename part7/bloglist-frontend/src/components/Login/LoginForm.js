import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const LoginForm = () => {
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')

	const dispatch = useDispatch()
	const history = useHistory()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			history.push('/')
		} catch (exception) {
			dispatch(setNotification({ type: 'error', message: 'Invalid Credentials!' }, 5000 ))
		}
	}

	return(
		<div>
			<h2>login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id="login-button" type="submit">login</button>
			</form>
		</div>
	)}


export default LoginForm