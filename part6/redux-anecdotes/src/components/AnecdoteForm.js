import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addAnecdoteNotify, clearNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = (props) => { 
	const dispatch  = useDispatch()

	const add = (event) => {
		event.preventDefault()
		const content = event.target.content.value
		console.log(content)
		event.target.content.value = ''
		dispatch(addAnecdote(content))
		dispatch(addAnecdoteNotify(content))
		setTimeout(() => {
			dispatch(clearNotification())
		},5000)
	}

	return(
	<div>
		<h2>create new</h2>
		<form onSubmit={add}>
			<div><input name="content" /></div>
			<button type="submit">create</button>
		</form>
	</div>
	)
}

export default AnecdoteForm