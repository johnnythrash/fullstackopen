import React from 'react'


const Form = ({ value, text, onChange }) => {
 return(
 <div>
    {text}<input value={value} onChange={onChange} />
  </div>
 )
}


export default Form