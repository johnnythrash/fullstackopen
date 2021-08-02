import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {


	const notification = props.notification
	useEffect(()=>{console.log(notification)},[notification])
	const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
	if(notification !== ''){
	return (
		<div style={style}>
			{notification}
		</div>
	)} 
	return null
}

const mapStateToProps = (state) => {
	console.log('state.notification',state.notification)
	return{
		notification: state.notification
	}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification