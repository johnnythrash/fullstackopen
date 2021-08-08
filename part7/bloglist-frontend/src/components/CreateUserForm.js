/* eslint-disable no-unused-vars */

// for testing - not currently used

import React, { useState, useEffect } from 'react'
import userService from '../services/users'


const CreateUserForm = () => {
	const [newUsername, setNewUsername] = useState('')
	const [newName, setNewName] = useState('')
	const [newPassword,setNewPassword] = useState('')
	const [newUserObj, setNewUserObj ] = useState({})

	const onSubmit = (e) => {
		e.preventDefault()
		setNewUserObj({ username:newUsername, name: newName, password:newPassword })
		userService.createUser(newUserObj)
		setNewUsername('')
		setNewPassword('')
		setNewName('')
	}

	return(
		<div>
			<h2>create new</h2>
			<form onSubmit={onSubmit}>
				<div>
					username
					<input
						id="username"
						type="text"
						value={newUsername}
						name="Username"
						onChange={({ target }) => setNewUsername(target.value)}
					/>
				</div>
				<div>
					name
					<input
						id="name"
						type="text"
						value={newName}
						name="Name"
						onChange={({ target }) => setNewName(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="password"
						value={newPassword}
						name="Password"
						onChange={({ target }) => setNewPassword(target.value)}
					/>
				</div>
				<button id="login-button" type="submit">create</button>
			</form>
		</div>
	)
}

export default CreateUserForm