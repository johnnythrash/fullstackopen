import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, handleLike}) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	
	const titleStyle = {
		fontSize: '1.2em',
		fontWeight: 'bold'
	}

return (		
<div style={blogStyle}>
	<div style={titleStyle}>{blog.title} by {blog.author}</div>
		<Togglable buttonLabel='view'>
			<div>
				<div>URL: <a href={blog.url}>{blog.url}</a></div>
				<div>Likes: {blog.likes} <button onClick={(e) => handleLike(blog)}>like</button></div>
				<div>Posted By: {blog.user.name}</div>
			</div>
			
		</Togglable>
  </div>  
	)
}

export default Blog