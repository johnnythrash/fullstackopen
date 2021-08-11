import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { clearUser, setUser } from '../../reducers/userReducer'
import blogService from '../../services/blogs'
import { makeStyles, AppBar, Tab, Toolbar, Box, IconButton, Menu, MenuItem, Typography, Button, Avatar, ListItemIcon, ListItemText } from '@material-ui/core/'
import { TabContext, TabList }from '@material-ui/lab/'
import green from '@material-ui/core/colors/green'
import { AccountBox } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	button: {
		'&:hover':{
			backgroundColor: 'transparent'
		}
	},
	green: {
		color: theme.palette.getContrastText(green[500]),
		backgroundColor: green[500]
	}
}))



const Navbar = () => {
	const classes = useStyles()
	const [value, setValue] = useState('1')
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const user = useSelector(state => state.user)
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON){
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [dispatch])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(clearUser())
		setAnchorEl(null)
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleChange = (event, newValue) => {
		setValue(newValue)
		history.push(newValue)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}


	return(
		<div className={classes.root}>
			<TabContext value={value !== '/' || value !== '/users' ? false: value }>
				<AppBar position="static">
					<Toolbar>
						<Box display='flex' flexGrow={1}>
							<TabList onChange={handleChange} aria-label="site nav menu">
								<Tab label="Blogs" value="/" />
								<Tab label="User List" value="/users" />
							</TabList>
						</Box>
						{user ?
							<Button
								size='large'
								className={classes.button}
								disableElevation={true}
								variant='contained'
								color='primary'
								component={Link}
								to={`/user/${user.id}`}
							>
								<Typography variant="button">{user.username}</Typography></Button>
							:null}
						<IconButton
							aria-label='user menu'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
						>
							{ user? <Avatar className={classes.green}>{user.username[0]}</Avatar>:<Avatar />}
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={open}
							keepMounted
							onClose={handleClose}
							getContentAnchorEl={null}
						>
							{user?
								<div >
									<MenuItem component={Link}  to={`/user/${user.id}`} onClick={handleClose}>
										<ListItemIcon><AccountBox /></ListItemIcon>
										<ListItemText primary={user.name} />
									</MenuItem>
									<MenuItem  onClick={handleLogout}>Logout</MenuItem>
								</div>
								:
								<MenuItem component={Link} to={'/login'} onClick={handleClose}>log in</MenuItem>
							}
						</Menu>
					</Toolbar>
				</AppBar>
			</TabContext>


		</div>
	)
}

export default Navbar