import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {

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
				<div>Likes: {blog.likes} <button>like</button></div>
			</div>
		</Togglable>
  </div>  
	)
}

export default Blog