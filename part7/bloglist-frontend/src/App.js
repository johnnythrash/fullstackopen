import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginService from './services/login'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import './index.css'

const App = () => {

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const blogFormRef = useRef()
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

		if (loggedUserJSON){
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [dispatch])



	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await LoginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(setNotification({ type: 'error', message: 'Invalid Credentials!' }, 5000 ))
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(clearUser())
	}

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		const createdBlog = await blogService.create(blogObject)

		dispatch(setNotification({
			type: 'success',
			message:`${createdBlog.title} by ${createdBlog.author} added! ` }, 5000))

		dispatch(initBlogs())
	}

	return(
		<div>
			<Notification />
			{ user !== null ? '':<Togglable buttonOpenLabel = 'login' buttonCloseLabel= 'hide'>
				<LoginForm
					onSubmit={handleLogin}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
			</Togglable>}
			{user? <div><p>{user.name} logged-in</p><button onClick={handleLogout}>logout</button></div> : ''}

			<BlogList user={user} />


			{ user?
				<Togglable buttonOpenLabel = 'create new blog' buttonCloseLabel = 'hide form' ref={blogFormRef}>
					<BlogForm submitBlog={addBlog}/>
				</Togglable>
				: ''
			}
		</div>
	)

}

export default App