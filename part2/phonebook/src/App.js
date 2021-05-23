import React, { useState } from 'react'
import Form from './components/Form'
import PersonForm from './components/PersonForm'
import ResultsField from './components/ResultsField'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', key: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', key: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', key: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', key: 'Mary Poppendieck', number: '39-23-6423122' }
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
      <Form text="filter" value={showAll} onChange={handleFilterChange} />
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <ResultsField namesToShow={namesToShow} />
    </div>
  )
}

export default App