import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
	const submitBlog = jest.fn()

	const component = render(
		<BlogForm submitBlog={submitBlog} />
	)

	const title= component.container.querySelector('#title')
	const author = component.container.querySelector('#author')
	const url = component.container.querySelector('#url')
	const form = component.container.querySelector('.form')

	fireEvent.change(title, {
		target: { value: 'testing of forms could be easier' }
	})
	fireEvent.change(author, {
		target: { value: 'test author' }
	})
	fireEvent.change(url, {
		target: { value: 'http://www.test.com' }
	})

	fireEvent.submit(form)


	expect(submitBlog.mock.calls).toHaveLength(1)
	console.log(submitBlog.mock)
	expect(submitBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
	expect(submitBlog.mock.calls[0][0].author).toBe('test author')
	expect(submitBlog.mock.calls[0][0].url).toBe('http://www.test.com')

})