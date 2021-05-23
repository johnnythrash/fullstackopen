import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(' ')
  const [ showAll, setShowAll ] = useState('')

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
  
  const handleNameChange = (event) =>  setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowAll(event.target.value)

  const namesToShow = showAll.length < 1? persons: persons.filter(name=>name.name.toUpperCase() === showAll.toUpperCase())

  return (
    <div>
      <div>
        filter <input value={showAll} onChange={handleFilterChange} />

      </div>
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
        {namesToShow.map(name=>
          <li key={name.key}>Name:{name.name} {name.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App