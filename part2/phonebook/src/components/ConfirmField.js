import React from 'react'


  const NotifyField = ({ confirmMessage }) => {

    if (confirmMessage === null){
      return null
    } 
    
    if (confirmMessage.type === 'success'){
      return (
        <div className="notifySuccess">
          {confirmMessage.message}
        </div>
       )
    }

    if (confirmMessage.type === 'error'){
      return (
        <div className="notifyError">
          {confirmMessage.message}
        </div>
       )      
    }


  }

export default NotifyField