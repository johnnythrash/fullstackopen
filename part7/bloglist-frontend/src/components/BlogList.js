import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs, likeBlog } from '../reducers/blogReducer'
//import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import blogService from '../services/blogs'



const BlogList = ({ user } ) => {
	const blogs = useSelector(state => state.blogs)

	const dispatch = useDispatch()

	useEffect(( ) => {
		dispatch(initBlogs())
	}, [dispatch])


	const handleLike = (event) => {
		dispatch(likeBlog(event))
	}

	const handleDelete = async (event) => {
		if (window.confirm(`are you sure you want to delete ${event.title} by ${event.author}?`)){
			await blogService.deleteBlog(event.id)
			dispatch(initBlogs())
		}
	}
	return (
		<div>
			<h1>Blogs</h1>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user === null? null:user.username} />) }
		</div>
	)
}

export default BlogList