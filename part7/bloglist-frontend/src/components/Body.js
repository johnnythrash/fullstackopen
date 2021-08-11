import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { initBlogs } from '../reducers/blogReducer'
import { initUsers } from '../reducers/usersReducer'
import BlogList from '../components/Blog/BlogList'
import BlogForm from '../components/Blog/BlogForm'
import UserPage from '../components/User/UserPage'
import UsersList from '../components/User/UsersList'
import BlogPage from '../components/Blog/BlogPage'
import LoginArea from '../components/Login/LoginArea'

const Body = () => {
	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs)
	const users = useSelector(state => state.users)
	const user = useSelector(state => state.user)


	useEffect(() => {
		dispatch(initBlogs())
		dispatch(initUsers())
	}, [])
	return(
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
	)
}


export default Body