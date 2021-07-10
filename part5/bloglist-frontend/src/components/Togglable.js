import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none': '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button id='openButton' onClick={toggleVisibility}>{props.buttonOpenLabel}</button>
			</div>
			<div className='togglableContent' style={showWhenVisible}>
				{props.children}
				<button id='closeButton' onClick={toggleVisibility}>{props.buttonCloseLabel}</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonOpenLabel: PropTypes.string.isRequired,
	buttonCloseLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable