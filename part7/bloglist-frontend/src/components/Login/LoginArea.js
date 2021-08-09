import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'


const LoginArea = () => {
	const user = useSelector(state => state.user)
	return (
		<div>
			{ user !== null ? '':<LoginForm /> }
		</div>
	)
}

export default LoginArea