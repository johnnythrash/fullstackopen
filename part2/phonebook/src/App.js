import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', key: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      key: newName
    }

    setPersons(persons.concat(nameObject))
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        
        <div>
          name: <input value={newName}  onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(name=>
          <li key={name.key}>{name.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App