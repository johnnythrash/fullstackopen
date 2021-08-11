import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Box, Typography } from '@material-ui/core'
import BackButton from '../Nav/BackButton'

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
	},
	userNameTitle:{
		marginTop: '2rem'
	}
}))


const UserPage = ({ users }) => {
	const classes = useStyles()
	const id = useParams().id
	const user = users.find(user => user.id === id)

	if (!user){
		return (
			<Typography variant='h2'>user not found...</Typography>
		)
	}

	return(
		<Box>
			<BackButton />
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
			>
				<Typography variant='h4' component='h1' className={classes.userNameTitle}>{user.username}</Typography>
				{user.blogs.length > 0 ? <List className={classes.root}>
					{user.blogs.map(blog =>
						<>
							<ListItem className={classes.customListItem} key={blog.id+Math.random()} component={Link} to={ `/blogs/${blog.id }`}>
								<ListItemText  className={classes.link} primary={blog.title} > {blog.title} by {blog.author} </ListItemText>
								{blog.likes} {blog.likes !== 1? 'Likes': 'Like' }
							</ListItem>
						</>)}
				</List>
					: <Typography variant="h5" component='h2'>No Posts Yet...</Typography>}
			</Box>
		</Box>
	)

}

export default UserPage