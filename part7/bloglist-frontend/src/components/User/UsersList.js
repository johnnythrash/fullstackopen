import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initUsers } from '../../reducers/usersReducer'


const UsersList = () => {
	const users = useSelector( state => state.users)
	console.log(users)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initUsers())
	}, dispatch)

	return (
		<div>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr>
						<th>User</th>
						<th>Blogs Created</th>
					</tr>
					{users.map(user =>
						<tr key={user.id}>
							<Link to={`/user/${user.id}`}><td>{user.name}</td></Link>
							<td>{user.blogs.length}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)


}


export default UsersList