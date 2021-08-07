import React from 'react'


const LoginForm = ({ onSubmit, username, password, setUsername, setPassword }) => {

	return(
		<div>
			<h2>login</h2>
			<form onSubmit={onSubmit}>
				<div>
					username
					<input
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id="login-button" type="submit">login</button>
			</form>
		</div>
	)}


export default LoginForm