export const anecdoteVoteNotify = (anecdote) => {
	console.log(`NOTIFY ${anecdote}`)
	return {
		type: 'VOTE',
		data: { anecdote }
	}
}

export const addAnecdoteNotify = (content) => {
	console.log('adding', content)
	return {
		type: 'ADDED_NOTE',
		data: {
			content: content,
		}
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR'
	}
}

const notificationReducer = (state ='', action) => {
	switch(action.type){
		case 'VOTE':
			console.log('VOTE')
			return `voted for: ${action.data.anecdote}` 
		case 'ADDED_NOTE':
			console.log('ADD')
			return `added ${action.data.content}`
		case 'CLEAR':
			return ''
		default:
			return state
	}
}



export default notificationReducer