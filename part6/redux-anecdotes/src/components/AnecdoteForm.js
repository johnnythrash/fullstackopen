import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => { 

	const add = async (event) => {
		event.preventDefault()
		const content = event.target.content.value
		console.log(content)
		event.target.content.value = ''
		props.addAnecdote(content)
		props.setNotification(`added ${content}`,5000)
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

const mapDispatchToProps = {
	addAnecdote,
	setNotification
}

export default connect(
	null,
	mapDispatchToProps)(AnecdoteForm)