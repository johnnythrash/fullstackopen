import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import '@fontsource/roboto'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
	<React.Fragment>
		<CssBaseline />
		<Provider store={store}>
			<App />
		</Provider>
	</React.Fragment>,
	document.getElementById('root')
)