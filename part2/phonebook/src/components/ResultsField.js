import React from 'react'


const ResultsField = ( {namesToShow} ) => {

  return (
    <div>
      <h2>Numbers:</h2>
    <ul>
      {namesToShow.map(name=>
      <li key={name.id}>Name:{name.name} {name.number}</li>
      )}
    </ul>
    </div>
  )
}


export default ResultsField