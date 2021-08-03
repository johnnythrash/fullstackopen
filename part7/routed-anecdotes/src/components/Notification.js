import React from 'react'


const Notification = ({ message }) => {
	if (message === null){
		return null
	}
	
	if(message === ''){
		return null
	}
	return (
		<div className="notifySuccess">
			{message}
		</div>
	)
}

export default Notification