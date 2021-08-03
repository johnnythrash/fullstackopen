import React from 'react'
import {useParams} from "react-router-dom"



const AnecdoteView = ({anecdotes}) => {
	const id = useParams().id
	
	const anecdoteFilter = anecdotes.filter(anecdote=> anecdote.id === id)
	const anecdote = anecdoteFilter[0]
	return (
		<div>
			<h2>{anecdote.content}</h2>
			<p>has {anecdote.vote} {anecdote.votes > 1 ? 'votes': anecdote.votes === 0? '0 votes': 'vote'}</p>
		</div>
	)
}

export default AnecdoteView