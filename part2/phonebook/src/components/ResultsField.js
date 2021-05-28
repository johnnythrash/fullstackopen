import React from 'react'
import personServices from '../services/personServices'


const ResultsField = ( {namesToShow, setPersons, setConfirmMessage} ) => {

  const handleClick = (event) => {
    event.preventDefault()
    const name = event.target.name
    const id = parseInt(event.target.id)
    
    if(window.confirm(`do you really want to remove ${name}?`)){
        personServices.removePerson(id).then(
        personServices.getAll().then(res=>{
          setPersons(res.data)
          console.log(res.data)
          setConfirmMessage({
            type:'error',
            message: `removed ${name} from phonebook`
          })
          setTimeout(()=>{
            setConfirmMessage(null)
          }, 5000)
        }))              
        .catch(err=>{
          setConfirmMessage({type:'error',
          message: "error, name does not exist on server!"})
          console.log(err)
        })
    }
  }

  return (
    <div>
      <h2>Numbers:</h2>
    <ul>
      {namesToShow.map(name=>
      <li key={name.id}>Name:{name.name} {name.number} <button id={name.id} name={name.name} onClick={handleClick}>delete</button></li>
      )}
    </ul>
    </div>
  )
}


export default ResultsField