import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginService from './services/login'
import './index.css'

const App = () => {

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)
	const [ blogs, setBlogs] = useState([])
	const [ blog, setBlog ] = useState({ title: '', url: '', author: '',	})
	const [ message, setMessage ] = useState(null)

	useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
			console.log("error handling")
			setMessage({ type: 'error', message: 'Wrong Credentials!' })
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} 
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

 	const submitBlog = async (event) => {
		event.preventDefault()
		const createdBlog = await blogService.create(blog)
		setMessage({ type: 'success', message: `${createdBlog.title} by ${createdBlog.author} added!` })
		console.log('message', message)
		setTimeout(() => {
				setMessage(null)
			}, 5000)
		setBlogs(blogs.concat(createdBlog))
		setBlog({title: '', url: '', author:'',})
	}
 

	const handleTitleChange = (event) => setBlog({...blog, title:event.target.value})
	const handleAuthorChange = (event) =>setBlog({ ...blog, author: event.target.value})
	const handleUrlChange = (event) => setBlog({...blog, url: event.target.value})
	

	if (user === null){
		return(
		<div>
			<h2>login</h2>
			<Notification message={message} />
			<LoginForm 
				onSubmit={handleLogin} 
				username={username}
				password={password}
				setUsername={setUsername}
				setPassword={setPassword}
			/>
		</div>
	 )
}
	
	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			<div><p>{user.name} logged-in</p><button onClick={handleLogout}>logout</button></div>
			{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
			)}

			<BlogForm 
				submitBlog={submitBlog}
				handleAuthorChange={handleAuthorChange}
				handleTitleChange={handleTitleChange}
				handleURLChange={handleUrlChange}
				title={blog.title}
				url={blog.url}
				author={blog.author}
			/>
		</div>
	)

}

export default App