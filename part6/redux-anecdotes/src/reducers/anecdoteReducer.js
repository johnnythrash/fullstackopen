import anecdoteService from '../services/anecdotes'



export const anecdoteVote = (anecdote) => {
	return async dispatch => {
		const changedAnecdote = await anecdoteService.voteForAnecdote(anecdote)
		return {
			type: 'VOTE',
			data: changedAnecdote.id
		}
	}
}

export const addAnecdote = (data) => {
	console.log('adding', data)
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(data)
		console.log(newAnecdote)
		dispatch({
			type: 'ADD',
			data:  newAnecdote
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT',
			data: anecdotes
		})
	}
}

const anedcoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
	switch (action.type){
		case 'VOTE':
			console.log('VOTE')
			const id = action.data.id
			return state.map(anecdote => {
				return anecdote.id === id ? {...anecdote, votes: anecdote.votes += 1} : anecdote 
			})
		case 'ADD':
			console.log('ADD')
			return state.concat(action.data)
		case 'INIT':
			return action.data
		default: 
			return state
	}
 
}

export default anedcoteReducer