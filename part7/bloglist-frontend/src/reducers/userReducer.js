export const setUser = (user) => {
	return async dispatch =>
		dispatch({
			type: 'SET',
			data: user
		})
}

export const clearUser = ( ) => {
	return async dispatch =>
		dispatch({
			type: 'CLEARUSER',
		})
}


const userReducer = (state=null, action) => {
	switch (action.type){
	case 'SET':{
		const user = action.data
		return user
	}
	case 'CLEARUSER':{
		return null
	}
	default:
		return state
	}
}

export default userReducer