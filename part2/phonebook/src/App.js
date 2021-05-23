import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', key: 'Arto Hellas', number: "123-456-789" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(' ')

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      key: newName,
      number: newNumber
    }
    
    if (persons.some(name=> name.name === newName )){
      alert(`${newName} is already in phonebook!`)
    } else { setPersons(persons.concat(nameObject)) }
  
 
  }
  
  const handleNameChange = (event) => {
  
   setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(name=>
          <li key={name.key}>Name:{name.name} {name.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App