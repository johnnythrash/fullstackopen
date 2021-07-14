import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'



const AnecdoteList = (props) => {
	const anecdotes = useSelector(state => state.anecdotes.slice().sort((a,b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
		dispatch(anecdoteVote(id))
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
					<button onClick={() => vote(anecdote.id)}>vote</button>
				</div>
			</div>
		)}
		</div>
	)

}

export default AnecdoteList