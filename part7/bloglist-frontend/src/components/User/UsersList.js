import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { initUsers } from '../../reducers/usersReducer'
import { Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow, Paper, Toolbar, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	root: {
		marginTop: '2rem'
	}
}))


const UsersList = () => {
	const classes = useStyles()
	const users = useSelector( state => state.users)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initUsers())
	}, [dispatch])

	return (
		<Toolbar className={classes.root}>
			<TableContainer component={Paper}>
				<Table aria-label='users table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>User</TableCell>
							<TableCell align='center'>Blogs Created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user =>
							<TableRow key={user.id}>
								<TableCell align='center'>	<Link to={`/user/${user.id}`} component={RouterLink}>{user.name}</Link></TableCell>
								<TableCell align='center'>{user.blogs.length}</TableCell>
							</TableRow>
						)}
					</TableBody>

				</Table>
			</TableContainer>
		</Toolbar>
	)


}


export default UsersList