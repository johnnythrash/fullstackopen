import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initBlogs } from '../../reducers/blogReducer'
import BlogForm from './BlogForm'

const BlogList = ( ) => {
	const blogs = useSelector(state => state.blogs)
	const dispatch = useDispatch()

	useEffect(( ) => {
		dispatch(initBlogs())
	}, [])

	return (
		<div>
			<h1>Blogs</h1>
			<ul>
				{blogs.map(blog =>
					<li key={blog.id}><Link to={ `/blogs/${blog.id }`}> {blog.title}</Link></li>)}
			</ul>
			<BlogForm />
		</div>
	)
}

export default BlogList