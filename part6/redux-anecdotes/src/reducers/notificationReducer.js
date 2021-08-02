let alert = 0

export const setNotification = (text,time) => {
	console.log(`NOTIFY ${text}`)
	return async dispatch => {
		clearTimeout(alert)
		alert=setTimeout(()=>{
			dispatch({
				type: 'CLEAR'
			})
			
		},time)  
		dispatch({
			type: 'NOTIFY',
			data: { text }
		})
		}
	}




export const clearNotification = () => {
	return {
		type: 'CLEAR'
	}
}

const notificationReducer = (state ='', action) => {
	switch(action.type){
		case 'NOTIFY':
			console.log('VOTE')
			return action.data.text 
		case 'CLEAR':
			return ''
		default:
			return state
	}
}



export default notificationReducer