


export const setFilter = (searchTerm) => {
	return {
		type: 'SET',
		data: { searchTerm }
	}
}

export const clearFilter = () => {
	return {
		type: 'CLEAR'
	}
}




const filterReducer = (state= 'ALL' , action) => {
	switch(action.type){
		case 'SET':
			console.log('SET')
			console.log(action.data.searchTerm)
			const searchTerm = action.data.searchTerm
			return searchTerm
		case 'CLEAR':
			return 'ALL'	
		default:
			return state
	}	
}

export default filterReducer