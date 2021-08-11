import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import { Button, TextField, Typography, Paper, Container } from '@material-ui/core'
console.log(Button,TextField, Typography)
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
	root: {
		display:'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignSelf: 'center',
		margin: '0 auto',
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	loginFormDiv: {
		display: 'flex',
		margin: '0 auto',
		width: '50%',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(36),
			height: theme.spacing(30),
		},
	},
	input: {
		width: '3rem'
	}
}))


const LoginForm = () => {
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			history.push('/')
		} catch (exception) {
			dispatch(setNotification({ type: 'error', message: 'Invalid Credentials!' }, 5000 ))
		}
	}

	return(
		<Container maxWidth='sm'>
			<div className={classes.loginFormDiv}>
				<Paper className={classes.root}>
					<form className={classes.root} onSubmit={handleLogin} noValidate autoComplete='off'>
						<div>
							<Typography align='center' variant="subtitle1">Login</Typography>
							<TextField
								id="username"
								autoFocus={true}
								type="text"
								variant='outlined'
								value={username}
								name="Username"
								label="username"
								onChange={({ target }) => setUsername(target.value)}
							/>
						</div>
						<div>
							<TextField
								id="password"
								variant='outlined'
								type="password"
								value={password}
								name="Password"
								label='password'
								onChange={({ target }) => setPassword(target.value)}
							/>
						</div>
						<Button className={classes.input} variant='outlined' id="login-button" type="submit">login</Button>
					</form>
				</Paper>
			</div>
		</Container>



	)}


export default LoginForm