import axios from 'axios'
const baseUrl = '/api/users'


const createUser = async (userObj) => {
	const response = await axios.post(baseUrl, userObj)
	return response.data
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const findUserId = async (user) => {
	const response = await axios.get(baseUrl)
	const foundUser = response.data.find(item => item.username === user.username)
	const editedUser = { ...user, id:foundUser.id }
	return editedUser
}
export default { createUser, getAll, findUserId }


