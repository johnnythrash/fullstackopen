import React from 'react'


  const NotifyField = ({ successMessage }) => {

    if (successMessage === null){
      return null
    } 
    
    return (
      <div className="notify">
        {successMessage}
      </div>
     )
  }

export default NotifyField