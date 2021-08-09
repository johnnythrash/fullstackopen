import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { initBlogs } from '../../reducers/blogReducer'
import { initUsers } from '../../reducers/usersReducer'
import { clearUser, setUser } from '../../reducers/userReducer'
import BlogList from '../Blog/BlogList'
import BlogForm from '../Blog/BlogForm'
import UserPage from '../User/UserPage'
import UsersList from '../User/UsersList'
import BlogPage from '../Blog/BlogPage'
import LoginArea from '../Login/LoginArea'
import blogService from '../../services/blogs'

const Navbar = () => {
	const padding = {
		paddingRight: 5
	}

	const paddingL = {
		paddingLeft: 5
	}

	const flexClass = {
		display: 'flex',
		width: '100 vw',
		border: '1px solid black',
		alignItems: 'end'
	}

	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs)
	const users = useSelector(state => state.users)
	const user = useSelector(state => state.user)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON){
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [dispatch])

	useEffect(() => {
		dispatch(initBlogs())
		dispatch(initUsers())
	}, [])

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(clearUser())
	}

	return(
		<Router>
			<div style={flexClass}>
				<Link style={padding} to='/'>Home</Link>
				<Link style={padding} to='/users'>User List</Link>
				{user? <div><em>{user.name} logged-in</em><button style={paddingL} onClick={handleLogout}>logout</button></div> : <Link style={padding} to='/login'>login</Link>}
			</div>

			<Switch>
				<Route path='/blogs/:id'>
					<BlogPage blogs={blogs} user={user}/>
				</Route>
				<Route path ='/user/:id'>
					<UserPage users={users} />
				</Route>
				<Route path='/users'>
					<UsersList />
				</Route>
				<Route path='/create'>
					<BlogForm />
				</Route>
				<Route path='/login'>
					<LoginArea />
				</Route>
				<Route path='/'>
					<BlogList />
				</Route>
			</Switch>
		</Router>
	)
}

export default Navbar