import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import PersonForm from './components/PersonForm'
import ResultsField from './components/ResultsField'
import personServices from './services/personServices'


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(' ')
  const [ showAll, setShowAll ] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(res=>{
        setPersons(res.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
 
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(name=> name.name === newName )){
      alert(`${newName} is already in phonebook!`)
    } else { 
      personServices.createPerson()
        .then(res => {
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')
        })
       }
  
 
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