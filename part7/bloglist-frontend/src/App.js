import React, { useEffect } from 'react'
import Navbar from './components/Nav/Navbar'
import Body from './components/Body'
import Notification from './components/Notification'
import './index.css'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
const App = () => {
	const history = useHistory()
	useEffect(() => {
		console.log(history)
	},[history])


	return (
		<>
			<Notification />
			<Router>
				<Navbar />
				<Body />
			</Router>
		</>
	)
}



export default App