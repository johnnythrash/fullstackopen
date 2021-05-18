import React from 'react'


const Content = (props)=> {
 const parts = props.parts;
console.log(parts[0].name);
  return (
    <div>
      <p>{parts[0].name}</p>
      <p>{parts[1].name}</p>
      <p>{parts[2].name}</p>
    </div>

  )
}

export default Content