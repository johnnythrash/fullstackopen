import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initBlogs } from '../../reducers/blogReducer'

import blogService from '../../services/blogs'
import { Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '80vw',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	input: {
		width: '3rem'
	},
	form: {
		display:'flex',
		width: '100%',
		flexDirection: 'column',
		alignContent: 'center',
		alignSelf: 'center',
		margin: '0 auto',
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '100%',
		},
	},
	textInput: {
		width: 'inherit'
	}

}))


const BlogForm = () => {
	const [ blog, setBlog ] = useState({ title: '', url: '', author: '', })
	const handleTitleChange = (event) => setBlog({ ...blog, title:event.target.value })
	const handleAuthorChange = (event) => setBlog({ ...blog, author: event.target.value })
	const handleUrlChange = (event) => setBlog({ ...blog, url: event.target.value })
	const blogFormRef = useRef()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const classes = useStyles()

	const addBlog = async (event) => {
		event.preventDefault()
		blogFormRef.current.reset()
		const createdBlog = await blogService.create(blog)
		setBlog({})
		dispatch(setNotification({
			type: 'success',
			message:`${createdBlog.title} by ${createdBlog.author} added! ` }, 5000))
		dispatch(initBlogs())
	}

	if (user !== null){
		return (
			<Accordion className={classes.root}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='create-new-blog-content'
					id="create-new-blog-header"
				>
					<Typography className={classes.heading}>Add New Blog</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<form className={classes.form} onSubmit={addBlog} ref={blogFormRef}>
						<TextField
							className={classes.textInput}
							id='title'
							autoFocus={true}
							variant='outlined'
							type='text'
							name='title'
							label='title'
							multiline
							onChange={handleTitleChange}
						/>
						<TextField
							id='author'
							variant='outlined'
							type='text'
							name='author'
							label='author'
							multiline
							onChange={handleAuthorChange}
						/>
						<TextField
							id='url'
							variant='outlined'
							type='text'
							name='url'
							label='url'
							multiline
							fullWidth
							onChange ={handleUrlChange}
						/>

						<Button className={classes.input} variant='outlined' id='submit-button' type='submit'>add</Button>
					</form>
				</AccordionDetails>
			</Accordion>
		)
	} return null
}
export default BlogForm