import React from 'react'
import Togglable from '../Togglable'


const SingleBlog = ({ blog, handleLike, handleDelete, user }) => {
	console.log(blog)
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
		<div id='blog' style={blogStyle}>
			<div className='titleAuthor' style={titleStyle}>{blog.title} by {blog.author}</div>
			<Togglable id='#togglable' buttonOpenLabel='view' buttonCloseLabel='hide'>
				<div>
					<div id='urlName'>URL: <a href={blog.url}>{blog.url}</a></div>
					<div id='likes'>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
					<div id='postedBy'>Posted By: {blog.user.name}</div>
					{ user?
						user === blog.user.username?
							<button onClick={() => handleDelete(blog)}>delete blog</button>
							: ''
						: ''
					}
				</div>
			</Togglable>
		</div>
	)
}

export default SingleBlog