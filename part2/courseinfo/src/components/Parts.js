import React from 'react'
 

const Parts = ({ course }) => {
 
  return(
         course.map(a=>
         <p key={a.id}>{a.name}: {a.exercises}</p>
         )
         )
}

export default Parts