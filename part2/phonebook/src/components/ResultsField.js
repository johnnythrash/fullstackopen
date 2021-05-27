import React from 'react'
import personServices from '../services/personServices'


const ResultsField = ( {namesToShow, persons, setPersons} ) => {

  const handleClick = (event) => {
    event.preventDefault()
    const name = event.target.name
    const id = parseInt(event.target.id)
    
    if(window.confirm(`do you really want to remove ${name}?`)){
      if(id){  
        personServices.removePerson(id)
        personServices.getAll().then(res=>{setPersons(res.data)})
      
      }else {
        console.log('cant find id for some reason')
      }
               
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