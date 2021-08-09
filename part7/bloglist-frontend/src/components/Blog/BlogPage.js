import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initBlogs, likeBlog } from '../../reducers/blogReducer'
import CommentForm from './CommentForm'
import blogService from '../../services/blogs'

const BlogPage = ({ blogs, user }) => {
	const id = useParams().id
	const blog = blogs.find(blog => blog.id === id)
	const dispatch = useDispatch()
	const history = useHistory()

	const handleLike = (event) => {
		dispatch(likeBlog(event))
	}

	const handleDelete = async (event) => {
		if (window.confirm(`are you sure you want to delete ${event.title} by ${event.author}?`)){
			await blogService.deleteBlog(event.id)
			dispatch(initBlogs())
			history.push('/')
		}
	}

	if (!blog){
		return (
			<h2>blog not found</h2>
		)
	}
	return (
		<div>
			<h2>{blog.title}</h2>
			<h4><em>{blog.author}</em></h4>
			<div>
				<div id='urlName'>URL: <a href={blog.url}>{blog.url}</a></div>
				<div id='likes'>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
				<div id='postedBy'>Posted By: {blog.user.name}</div>
				{ user?
					user.username === blog.user.username?
						<button onClick={() => handleDelete(blog)}>delete blog</button>
						: ''
					: ''
				}
				<h2>Comments</h2>
				{blog.comments.length > 0? <ul>
					{blog.comments.map(comment => <li key={comment}>{comment}</li>)}
				</ul>: <p>no comments yet...</p>}
			</div>
			{ user ? <CommentForm blog={blog}/>: ''}
		</div>
	)
}

export default BlogPage

