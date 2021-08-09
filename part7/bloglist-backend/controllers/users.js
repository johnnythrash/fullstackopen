const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.post('/', async (request, response) => {
	const body = request.body
	console.log(body)
	if (body.password.length < 3 || body.username.length < 3) {
		response.status(400).end() 
	} 
	else {
	
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User ({
		username: body.username,
		name: body.name,
		passwordHash,
		})

	const savedUser = await user.save()
	
	response.json(savedUser)
	}
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs')
	response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const person = await User.findById(id)
	if (person){
		response.json(person)
	} else {
		console.log('notfound')
		response.status(404).end
	}
})

module.exports = usersRouter