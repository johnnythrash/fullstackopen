const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  
	console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodNum = state.good
			return { ...state, good: goodNum += 1 }
    case 'OK':
      let okNum = state.good
			return { ...state, ok: okNum += 1 }
    case 'BAD':
			let badNum = state.good
			return { ...state, bad: badNum += 1 } 
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0}
    default: return state
  }
  
}

export default counterReducer