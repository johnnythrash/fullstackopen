import React from 'react'

const Sum = ({ course }) => {
  const parts = course.parts
  let holderArr = []
  parts.map(a=> holderArr.push(a.exercises))
  const sum = holderArr.reduce((a,b)=>a+b)

  return (
    <div>
      <p key={sum}>total of {sum} exercises</p>
    </div>
  )
}


export default Sum