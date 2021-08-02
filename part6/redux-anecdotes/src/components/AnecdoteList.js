import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { anecdoteVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
	const anecdotesToShow = () => {
		if (props.filter === 'ALL'){
			return props.anecdotes.slice().sort((a,b) => b.votes - a.votes)
		} else 
			return props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
		}
		
		useEffect(() => {
			props.initializeAnecdotes()
		}, [])

  
		const vote = (anecdote) => {
			props.anecdoteVote(anecdote)
			props.setNotification(`you voted for ${anecdote.content}`,5000)
	  }

	return (
		<div>
		<h2>Anecdotes</h2>
		{anecdotesToShow().map(anecdote =>
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

const mapDispatchToProps ={
	initializeAnecdotes,
	anecdoteVote,
	setNotification,
}

const mapStateToProps = (state) =>{
	return{
		anecdotes: state.anecdotes,
		filter: state.filter
	}
}

const ConnectedAnecdotes = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes