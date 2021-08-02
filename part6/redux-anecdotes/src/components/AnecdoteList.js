import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
	
	const anecdotes = useSelector(state => {
		if (state.filter === 'ALL'){
			return state.anecdotes.slice().sort((a,b) => b.votes - a.votes)
		} else 
			return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
		})
  
		const dispatch = useDispatch()
		
		useEffect(() => {
			dispatch(initializeAnecdotes())
		}, [dispatch])

  
		const vote = (anecdote) => {
			dispatch(anecdoteVote(anecdote))
			dispatch(setNotification(`you voted for ${anecdote.content}`,5000))
	  }

	return (
		<div>
		<h2>Anecdotes</h2>
		{anecdotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote)}>vote</button>
				</div>
			</div>
		)}
		</div>
	)

}

export default AnecdoteList