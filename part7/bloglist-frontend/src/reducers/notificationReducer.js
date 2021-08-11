let alert = 0

export const setNotification = (obj, duration) => {
	const { type, message } = obj

	return async dispatch => {
		clearTimeout(alert)
		alert = setTimeout(() => {
			dispatch({
				type: 'CLEAR'
			})
		},duration)
		dispatch({
			type: 'NOTIFY',
			data: { message:message, type:type, autoCloseDuration:duration }
		})
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR'
	}
}



const notificationReducer = (state='', action) => {
	switch(action.type){
	case 'NOTIFY':
		console.log('NOTIFY')
		return action.data
	case 'CLEAR':
		console.log('CLEAR')
		return {}
	default:
		return state
	}
}


export default notificationReducer