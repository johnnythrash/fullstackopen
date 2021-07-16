import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} 

export const anecdoteVote = (id) => {
	console.log(id)
	return {
		type: 'VOTE',
		data: { id }
	}
}

export const initAnecdotes = (anecdotes) => {
	console.log('init db')
	return {
		type: 'INIT',
		data: anecdotes
	}
}

export const addAnecdote = (content) => {
	console.log('adding', content)
	return {
		type: 'ADD',
		data: {
			content: content,
			votes: 0,
			id: getId()
		}
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