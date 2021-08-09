import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initBlogs } from '../../reducers/blogReducer'
import Togglable from '../Togglable'
import blogService from '../../services/blogs'




const BlogForm = () => {
	const [ blog, setBlog ] = useState({ title: '', url: '', author: '',	})
	const handleTitleChange = (event) => setBlog({ ...blog, title:event.target.value })
	const handleAuthorChange = (event) => setBlog({ ...blog, author: event.target.value })
	const handleUrlChange = (event) => setBlog({ ...blog, url: event.target.value })
	const blogFormRef = useRef()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const addBlog = async (event) => {
		event.preventDefault()
		blogFormRef.current.toggleVisibility()
		const createdBlog = await blogService.create(blog)
		setBlog({})
		dispatch(setNotification({
			type: 'success',
			message:`${createdBlog.title} by ${createdBlog.author} added! ` }, 5000))

		dispatch(initBlogs())
	}

	if (user !== null){
		return (
			<Togglable buttonOpenLabel = 'create new' buttonCloseLabel = 'hide form' ref={blogFormRef}>
				<div className='formDiv'>
					<form className='form' onSubmit={addBlog}>
						<h2>create new</h2>
						<div>
							title:
							<input
								id='title'
								type='text'
								// value={title}
								name='title'
								onChange={handleTitleChange}
							/>
						</div>
						<div>
							author:
							<input
								id='author'
								type='text'
								// value={author}
								name='author'
								onChange={handleAuthorChange}
							/>
						</div>
						<div>
							url:
							<input
								id='url'
								type='text'
								// value={url}
								name='url'
								onChange ={handleUrlChange}
							/>
						</div>
						<button id='submit-button' type='submit'>create</button>
					</form>
				</div>
			</Togglable>
		)
	} return null
}
export default BlogForm