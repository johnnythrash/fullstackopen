import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { addComment, initBlogs } from '../../reducers/blogReducer'

const CommentForm = ({ blog }) => {
	const [comment, setComment ] = useState('')
	const dispatch = useDispatch()

	const handleCommentChange = (event) => setComment(event.target.value)
	useEffect(() => {
		console.log(comment)
	}, [comment])
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(comment)
		if (comment){
			dispatch(addComment(blog, comment))
			dispatch(setNotification({
				type: 'success',
				message: `successfully added '${comment}'`
			}))
			dispatch(initBlogs())
		} else {
			dispatch(setNotification({
				type: 'error',
				message: 'invalid comment'
			}, 5000))
		}

	}


	return (
		<form className='form' onSubmit={handleSubmit}>
			<h4>add comment:</h4>
			<input
				id='title'
				type='text'
				name='title'
				onChange={handleCommentChange}
			/>

			<button id='submit-button' type='submit'>add</button>
		</form>
	)
}

export default CommentForm