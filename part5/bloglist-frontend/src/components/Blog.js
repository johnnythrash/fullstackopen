import React from 'react'
import Togglable from './Togglable'


const Blog = ({ blog, handleLike, handleDelete, user }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const titleStyle = {
		fontWeight: 'bold'
	}


	return (
		<div style={blogStyle}>
			<div style={titleStyle}>{blog.title} by {blog.author}</div>
			<Togglable buttonOpenLabel='view' buttonCloseLabel='hide'>
				<div>
					<div>URL: <a href={blog.url}>{blog.url}</a></div>
					<div>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
					<div>Posted By: {blog.user.name}</div>
					{user === blog.user.username?
						<button onClick={() => handleDelete(blog)}>delete blog</button>
						: ''
					}
				</div>
			</Togglable>
		</div>
	)
}

export default Blog