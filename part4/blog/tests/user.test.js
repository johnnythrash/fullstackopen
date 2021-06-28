const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
require('dotenv').config()

const token = process.env.TOKEN
const userId = process.env.USERID


describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'root', passwordHash})

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mlukkai',
			name: 'Matti Luukkainen',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.set('Authorization', token)
			.send(newUser)
			.expect(200)
			.expect('Content-Type',/application\/json/)
	
	
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
			.set('Authorization', token)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

	test('creation fails if password is less than 3 characters', async () => {
		const newUser = {
			username: 'coolguy',
			name: 'cool guy',
			password: 'ab'
		}
		
		const result = await api
			.post('/api/users')
			.set('Authorization', token)
			.send(newUser)
			.expect(400)

		expect(result.status).toBe(400)
	})

})

afterAll(() => {
	mongoose.connection.close()
})