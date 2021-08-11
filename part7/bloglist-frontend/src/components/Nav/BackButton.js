import React from 'react'
import { Button, Box } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	boxItem: {
		marginTop: '1rem',
		marginLeft: '1rem'
	}
}))

const BackButton = () => {
	const classes = useStyles()
	const history = useHistory()
	const handleClick = () => {
		history.goBack()
	}
	return (
		<Box>
			<Button className={classes.boxItem} startIcon={ <ChevronLeftIcon />} variant="contained" color="primary" size="medium" onClick={handleClick}>go back</Button>
		</Box>
	)
}
export default BackButton