export const setNotification = (text,time) => {
	console.log(`NOTIFY ${text}`)
	setTimeout(()=>{
		return {
			type: 'CLEAR'
	}
	},time)  
	return {
		type: 'VOTE',
		data: { text }
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
			return action.data.text 
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