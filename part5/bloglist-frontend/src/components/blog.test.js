import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('component only renders blog title and author by default', () => {

	let blog, component, div

	beforeEach( () => {
		blog = {
			title: 'Component testing is done with react-testing library',
			author: 'test man',
			url: 'test.com',
			likes: 5,
			user: {
				name: 'test',
				username: 'testuser'
			}
		}

		component = render(
			<Blog blog={blog} />
		)

		div = component.container.querySelector('.titleAuthor')
	})

	test('renders title and author', () => {

		expect(div).toHaveTextContent(
			'Component testing is done with react-testing library'
		)
	})

	test('does not render url', () => {
		expect(div).not.toHaveTextContent('URL:')
	})

	test('does not render likes', () => {
		expect(div).not.toHaveTextContent('Likes:')
	})

	test('does not render user who posted', () => {
		expect(div).not.toHaveTextContent('Posted By:')
	})


})