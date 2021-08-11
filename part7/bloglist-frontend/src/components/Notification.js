import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import { clearNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'





const Notification = () => {
	const { message, autoCloseDuration, type } = useSelector(state => state.notification)
	const dispatch = useDispatch()
	const [ open, setOpen ] = useState(true)

	useEffect(() => console.log(open),[open])
	useEffect(() => console.log(type),[type])


	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
		dispatch(clearNotification())
	}


	if (type === 'success'){
		return (
			<Snackbar open={open} onClose={handleClose} autoHideDuration={autoCloseDuration} message={<Alert onClose={handleClose} severity="success">{message}</Alert>} />
		)
	}
	if (type === 'error'){
		return (

			<Snackbar open={open} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">{message}</Alert>
			</Snackbar>

		)
	}

	else return null

}

export default Notification