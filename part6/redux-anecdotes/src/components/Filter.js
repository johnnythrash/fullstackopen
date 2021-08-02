import React from 'react'
import { connect } from 'react-redux'
import { setFilter, clearFilter } from '../reducers/filterReducer'


const Filter = (props) => {
  

	const handleChange = (event) => {
    // input-field value is in variable event.target.value
		event.target.value === ''? props.clearFilter()
		: props.setFilter(event.target.value)
		
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapDispatchToProps ={
	setFilter, 
	clearFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter