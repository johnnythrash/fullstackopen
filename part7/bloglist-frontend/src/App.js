import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginService from './services/login'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import './index.css'

const App = () => {

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)
	const [ blogs, setBlogs] = useState([])
	// const [ message, setMessage ] = useState(null)
	const blogFormRef = useRef()

	const dispatch = useDispatch()

	useEffect(() => {
		blogService.getAll().then(blogs => {
			const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)
			setBlogs(sortedBlogs)
		}
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON){
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

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
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(setNotification({ type: 'error', message: 'Invalid Credentials!' }, 5000 ))
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		const createdBlog = await blogService.create(blogObject)

		dispatch(setNotification({
			type: 'success',
			message:`${createdBlog.title} by ${createdBlog.author} added! ` }, 5000))
		const newBlogList = await blogService.getAll()
		setBlogs(newBlogList)
	}

	const handleLike = async (event) => {
		console.log(event)
		await blogService.likeBlog(event)
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	const handleDelete = async (event) => {
		if (window.confirm(`are you sure you want to delete ${event.title} by ${event.author}?`)){
			await blogService.deleteBlog(event.id)
			const blogs = await blogService.getAll()
			setBlogs(blogs)
		}
	}





	return(
		<div>
			<Notification />
			<h2>blogs</h2>
			{ user ? '':<Togglable buttonOpenLabel = 'login' buttonCloseLabel= 'hide'>
				<LoginForm
					onSubmit={handleLogin}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
			</Togglable>}
			{user? <div><p>{user.name} logged-in</p><button onClick={handleLogout}>logout</button></div> : ''}
			{user ? blogs.map(blog =>
				<Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user.username} />)
				: blogs.map(blog =>
					<Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />)
			}
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