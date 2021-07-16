import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote, initAnecdotes } from '../reducers/anecdoteReducer'
import { anecdoteVoteNotify, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'




const AnecdoteList = (props) => {
	
	const anecdotes = useSelector(state => {
		if (state.filter === 'ALL'){
			return state.anecdotes.slice().sort((a,b) => b.votes - a.votes)
		} else 
			return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
		})
  
		const dispatch = useDispatch()
		useEffect(() => {
			anecdoteService.getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
		}, [dispatch])

  const vote = (id, content) => {
    console.log('vote', id, content)
		dispatch(anecdoteVote(id))
		dispatch(anecdoteVoteNotify(content))
		setTimeout(() => {
			dispatch(clearNotification())
		},5000)
		
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
					<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
				</div>
			</div>
		)}
		</div>
	)

}

export default AnecdoteList