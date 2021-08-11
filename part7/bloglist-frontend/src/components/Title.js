import React from 'react'
import { Typography, createTheme, ThemeProvider } from '@material-ui/core'

const theme = createTheme()

theme.typography.h1 = {
	fontSize: '1.5rem',
	'@media (min-width:600px)': {
		fontSize: '1.5rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '2.0rem',
	},
}
const Title = () => (
	<ThemeProvider theme={theme}>
		<Typography variant='h1'>Blog List App</Typography>
	</ThemeProvider>
)

export default Title