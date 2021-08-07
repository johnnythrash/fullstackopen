import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	if (notification.type !== ''){
		if (notification.type === 'success'){
			return (
				<div className="notifySuccess">
					{notification.message}
				</div>
			)
		}
		if (notification.type === 'error'){
			return (
				<div className="notifyError">
					{notification.message}
				</div>
			)
		}
	}
	return null
}

export default Notification