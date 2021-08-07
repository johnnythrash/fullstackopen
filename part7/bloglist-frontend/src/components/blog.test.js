import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'



describe('blog rendering', () => {

	let blog, component, div, togglableContent

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
		togglableContent = component.container.querySelector('.togglableContent')
	})

	test('renders title and author', () => {
		expect(div).toHaveTextContent(
			'Component testing is done with react-testing library'
		)
	})

	test('does not render url,likes,user who posted', () => {
		expect(togglableContent).toHaveStyle('display: none')
	})

})


describe('button tests', () => {

	const mockHandler = jest.fn()
	let component, blog

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
			<Blog blog={blog} handleLike={mockHandler} />
		)
	})

	test('additional content is shown when button is clicked', () => {
		const button = component.getByText('view')
		fireEvent.click(button)
		const div = component.container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('if like button is clicked twice, event handler is called twice', () => {
		const likeButton = component.getByText('like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)
		expect(mockHandler.mock.calls).toHaveLength(2)
	})

})