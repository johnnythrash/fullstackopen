import React from 'react'


const Notification = ({ message }) => {
	if (message === null){
		return null
	}

	if (message.type === 'success'){
		return (
			<div className="notifySuccess">
				{message.message}
			</div>
		)
	}

	if (message.type === 'error'){
		return (
			<div className="notifyError">
				{message.message}
			</div>
		)
	}
}

export default Notification