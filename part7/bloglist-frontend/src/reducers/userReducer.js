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
			type: 'CLEAR',
		})
}

const userReducer = (state=null, action) => {
	switch (action.type){
	case 'SET':{
		const user = action.data
		return user
	}
	case 'CLEAR':{
		return null
	}
	default:
		return state
	}
}

export default userReducer