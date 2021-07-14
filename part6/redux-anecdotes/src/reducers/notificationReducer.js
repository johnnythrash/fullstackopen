
const notificationReducer = (state ='test notification', action) => {
	switch(action.type){
		case 'CHANGE':
			console.log('CHANGE')
			return action.message
		default:
			return state
	}
}



export default notificationReducer