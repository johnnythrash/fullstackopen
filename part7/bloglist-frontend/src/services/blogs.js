/* eslint-disable no-unused-vars */

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getById = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`)
	return response.data
}

const create = async newObject => {

	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data

}

const deleteBlog = async id => {
	const config = {
		headers: { Authorization: token },
	}
	await axios.delete(`${baseUrl}/${id}`, config)
}

const likeBlog = async (blog) => {
	const blogID = blog.id
	const newID = { username: blog.user.username, name: blog.user.name, _id: blog.user.id }
	const { id, user, ...remaining } = blog
	const updatedBlog = {
		...remaining,
		'_id': blog.id,
		'user': newID,
		likes: blog.likes +=1
	}
	const response = await axios.put(`${baseUrl}/${blogID}`, updatedBlog)
	return response.data
}

export default { getAll, create, setToken, deleteBlog, likeBlog, getById }