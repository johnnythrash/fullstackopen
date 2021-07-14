import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { anecdoteVoteNotify, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
	const anecdotes = useSelector(state => state.anecdotes.slice().sort((a,b) => b.votes - a.votes))
  const dispatch = useDispatch()

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