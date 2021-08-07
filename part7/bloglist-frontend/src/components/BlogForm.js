import React, { useState } from 'react'




const BlogForm = ({ submitBlog, title, author, url }) => {

	const [ blog, setBlog ] = useState({ title: '', url: '', author: '',	})
	const handleTitleChange = (event) => setBlog({ ...blog, title:event.target.value })
	const handleAuthorChange = (event) => setBlog({ ...blog, author: event.target.value })
	const handleUrlChange = (event) => setBlog({ ...blog, url: event.target.value })

	const addBlog = (event) => {
		event.preventDefault()
		submitBlog(blog)
		setBlog({})
	}

	return (
		<div className='formDiv'>
			<form className='form' onSubmit={addBlog}>
				<h2>create new</h2>
				<div>
					title:
					<input
						id='title'
						type='text'
						value={title}
						name='title'
						onChange={handleTitleChange}
					/>
				</div>
				<div>
					author:
					<input
						id='author'
						type='text'
						value={author}
						name='author'
						onChange={handleAuthorChange}
					/>
				</div>
				<div>
					url:
					<input
						id='url'
						type='text'
						value={url}
						name='url'
						onChange ={handleUrlChange}
					/>
				</div>
				<button id='submit-button' type='submit'>create</button>
			</form>
		</div>
	)
}
export default BlogForm