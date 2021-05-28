import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import PersonForm from './components/PersonForm'
import ResultsField from './components/ResultsField'
import personServices from './services/personServices'
import SuccessField from './components/ConfirmField'
import './index.css'


const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(' ')
  const [ showAll, setShowAll ] = useState('')
  const [ confirmMessage, setConfirmMessage ] = useState(null)

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
      if(window.confirm(`${newName} is already in phonebook. do you want to replace the number?`)){
        const index = persons.map(p=>p.name).indexOf(newName)
        if (index){
          personServices.update(persons[index].id,nameObject)
          .then(personServices.getAll()
          .then(res=>{
              setPersons(res.data)
              setConfirmMessage({
                type: 'success',
                message:`changed number for ${nameObject.name}`
              })
              setTimeout(()=>{
                setConfirmMessage(null)
              }, 5000)
            
          }))
        } else {
          window.alert("error! couldn't find entry in database")
        }
      } }
    else { 
        setPersons(persons.concat(nameObject))
        personServices.createPerson(nameObject).then(res=>{
        personServices.getAll().then(res=>{
          setPersons(res.data)
          setNewName('')
          setNewNumber('')
          setConfirmMessage({
            type: 'success',
            message: `added ${nameObject.name} to database`
          })
          setTimeout(()=>{
            setConfirmMessage(null)
          }, 5000)
        })
        
        })
     }
    }
  
  const handleNameChange = (event) =>  setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowAll(event.target.value)

  const namesToShow = showAll.length < 1? persons: persons.filter(name=>name.name.toUpperCase() === showAll.toUpperCase())

  return (
    <div>
      <SuccessField confirmMessage={confirmMessage} />
      <Form text="filter" value={showAll} onChange={handleFilterChange} />
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <ResultsField namesToShow={namesToShow} setConfirmMessage={setConfirmMessage} setPersons={setPersons} />
    </div>
  )
}

export default App