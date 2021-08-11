import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { addComment, initBlogs } from '../../reducers/blogReducer'
import { Button, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
	input:{
		margin: theme.spacing(1),
		height: '2rem',
	},

}))

const CommentForm = ({ blog }) => {
	const classes = useStyles()
	const [comment, setComment ] = useState('')
	const dispatch = useDispatch()
	const handleCommentChange = (event) => setComment(event.target.value)
	useEffect(() => {
		console.log(comment)
	}, [comment])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (comment && comment.length > 0){
			dispatch(addComment(blog, comment))
			dispatch(setNotification({
				type: 'success',
				message: `successfully added '${comment}'`
			},5000))
			dispatch(initBlogs())
			setComment('')
		} else {
			dispatch(setNotification({
				type: 'error',
				message: 'invalid comment'
			}, 5000))
		}

	}


	return (
		<Box display='flex' flexDirection='row' alignContent='center' height='1.5rem'>

			<form noValidate autoComplete='off' onSubmit={handleSubmit} >
				<TextField
					id='commentField'
					variant='outlined'
					type='text'
					name='title'
					label="Add Comment"
					value={comment}
					onChange={handleCommentChange}
					InputProps={{
						className:classes.input
					}}
				/>
				<Button className={classes.input}  variant='contained' id='submit-button' type='submit'>add</Button>
			</form>

		</Box>
	)
}

export default CommentForm