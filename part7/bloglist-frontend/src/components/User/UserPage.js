import React from 'react'
import { useParams, Link } from 'react-router-dom'


const UserPage = ({ users }) => {
	const id = useParams().id
	const user = users.find(user => user.id === id)

	if (!user){
		return (
			<h2>user not found...</h2>
		)
	}

	return(
		<div>
			<h2>{user.name}</h2>
			<ul>
				{user.blogs.map(blog => <Link key={blog.id} to={`/blogs/${blog.id}`}><li>{blog.title}</li></Link>)}
			</ul>
		</div>
	)

}

export default UserPage