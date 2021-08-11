
import React, { useState } from 'react'
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initBlogs, likeBlog } from '../../reducers/blogReducer'
import CommentForm from './CommentForm'
import blogService from '../../services/blogs'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Divider,
	Typography, Button, Paper, Box,
	Link, Dialog, DialogActions, DialogContent,
	DialogContentText, DialogTitle, useMediaQuery, Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import BackButton from '../Nav/BackButton'



const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		maxHeight:500,
		overflow: 'auto',
		marginTop: '1rem'

	},
	userLink:{
		'&:hover':{
			textDecoration: 'none'
		}
	},
	customListItem: {
		'&:hover':{
			backgroundColor: theme.palette.grey[300]
		}
	},
	likes:{
		fontSize: '1.1rem'
	}

}))

const BlogPage = ({ blogs, user }) => {
	const id = useParams().id
	const blog = blogs.find(blog => blog.id === id)
	const dispatch = useDispatch()
	const history = useHistory()
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen ] = useState(false)
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleLike = (event) => {
		dispatch(likeBlog(event))
	}

	const handleDelete = async (event) => {
		await blogService.deleteBlog(event.id)
		dispatch(initBlogs())
		history.push('/')
		setOpen(false)
	}

	if (!blog){
		return (
			<h2>blog not found</h2>
		)
	}
	return (
		<Box>			<BackButton />
			<Box
				width='100vw'
				alignItems='center'
				justifyContent='center'
				display='flex'
				flexDirection='column'
				mt={'1rem'}
			>

				<Box
					display='flex'
					justifyContent='center'
					flexDirection='column'
					width='80vw'
					component={Paper}
					pb={'3rem'}
				>
					<Box
						flexDirection='row'
						display='flex'
					>
						<Box
							display='flex'
							justifyContent='center'
							flexDirection='column'
							width='100%'
						>
							<Typography align='center' variant='h4'>{blog.title}</Typography>
							<Typography align='center' variant='body1' id='urlName'><Link href={blog.url}>{blog.url}</Link></Typography>
							<Typography align='center' variant='h6'><em>{blog.author}</em></Typography>
							<Box mt={'1rem'} flexDirection='row' justifyContent='center' alignSelf='center' mb={'1.5rem'}>
								<Typography className={classes.likes} display='inline' alignSelf='center' variant='body1' id='likes'>Likes: {blog.likes} </Typography>
								<Button variant='contained'size='small' fullWidth={false} color='primary' startIcon={ <ThumbUpIcon />} onClick={() => handleLike(blog)}>  like</Button>
							</Box>
							<Box alignSelf='center' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
								<Typography align='center' variant='body1' id='postedBy'>Posted By: </Typography>
								<Link to={`/user/${blog.user.id}`} className={classes.userLink} component={RouterLink} >
									<Avatar align='center'>{blog.user.name[0].toUpperCase()}</Avatar>
								</Link>
								<Typography component={Box} alignSelf='center' variant='body1'>{blog.user.name}</Typography>
							</Box>
						</Box>

					</Box>
					{ user?
						user.username === blog.user.username?
							<>
								<Button variant='contained' color='secondary' size='small' onClick={handleClickOpen}>
								delete blog
								</Button>
								<Dialog
									fullScreen={fullScreen}
									open={open}
									onClose={handleClose}
									aria-labelledby='responsive-dialog-title'
								>
									<DialogTitle id='responsive-dialog-title'>Confirm Delete</DialogTitle>
									<DialogContent>
										<DialogContentText>
										Are you sure you want to delete {blog.title} by {blog.author}?
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose} color='primary'>
										Cancel
										</Button>
										<Button onClick={() => handleDelete(blog)} color='primary' autofocus>
										Delete Blog
										</Button>
									</DialogActions>
								</Dialog>
							</>
							: null
						: null
					}
					<Typography variant='h6' component="h1" style={{ fontWeight: 600, marginLeft:'0.5rem', marginTop:'0.5rem' }}>Comments:</Typography>
					{blog.comments.length <1 ?  <Typography variant='body1'>no comments yet...</Typography>
						:
						<List  className={classes.root}>
							{blog.comments.map(comment =>
								<>
									<ListItem className={classes.customListItem} key={comment + Math.random()}>
										<ListItemText primary={comment}>{comment}</ListItemText>
									</ListItem>
									<Divider />
								</>
							)}
						</List>}
					<Box
						width="100%"
					>
						<Box className={classes.commentFormBox}>
							{ user ? <CommentForm blog={blog}/>: ''}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default BlogPage

