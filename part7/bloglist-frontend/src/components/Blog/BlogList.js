import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initBlogs } from '../../reducers/blogReducer'
import BlogForm from './BlogForm'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Box } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
	root: {
		width: '80vw',
		backgroundColor: theme.palette.background.paper,
		marginTop: '2rem'
	},
	link: {
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem',
		color: theme.palette.text.primary,
		'&:visited':{
			color: theme.palette.text.primary
		}
	},
	customListItem: {
		border: '1px solid black',
		'&:hover':{
			backgroundColor: theme.palette.grey[300]
		}
	}
}))


const BlogList = ( ) => {
	const classes = useStyles()
	const blogs = useSelector(state => state.blogs)
	const dispatch = useDispatch()

	useEffect(( ) => {
		dispatch(initBlogs())
	}, [])

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
		>
			<List className={classes.root}>
				{blogs.map(blog =>
					<>
						<ListItem className={classes.customListItem} key={blog.id+Math.random()} component={Link} to={ `/blogs/${blog.id }`}>
							<ListItemText  className={classes.link} primary={blog.title} > {blog.title} by {blog.author} </ListItemText>
							{blog.likes} {blog.likes !== 1? 'Likes': 'Like' }
						</ListItem>
					</>)}
			</List>
			<BlogForm />
		</Box>
	)
}

export default BlogList