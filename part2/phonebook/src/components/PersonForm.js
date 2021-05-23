import React from 'react'
import Form from './Form'



const PersonForm = (props) => {
  
  return (
    <div>
      <h2>Phonebook:</h2>
      <form onSubmit={props.onSubmit}>
        <Form text='name: ' value={props.newName} onChange={props.handleNameChange} />
        <Form text='number: ' value={props.newNumber} onChange={props.handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>

      </form>
    </div>
  )
}

export default PersonForm