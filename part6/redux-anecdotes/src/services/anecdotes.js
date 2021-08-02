import axios from 'axios'


const baseUrl = 'http://localhost:3003/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
	const response = await axios.get(baseUrl)
	console.log(response.data)
	return response.data
}


const createNew = async (content) => {
	console.log(content)
	const object = {content, votes: 0 }
	const response = await axios.post(baseUrl, object)
	return response.data
}

const voteForAnecdote = async (anecdote) => {
	const id = anecdote.id
	const updatedAnecdote = {
		...anecdote, votes:anecdote.votes+=1
	}
	const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
	return response.data
}



export default { getAll, createNew, voteForAnecdote } 