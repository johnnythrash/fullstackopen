const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')
require('dotenv').config()



beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
	
})


describe('getting blogs', () => {

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')
		const titles = response.body.map(r => r.title)
		expect(titles).toContain(
			'React patterns'
		)
	})

	test('unique identifier is named id', async () => {
		const response = await api.get('/api/blogs')
		let firstItem = response.body[0].id
		expect(firstItem).toBeDefined()
	})

	test('a specific blog can be viewed', async () => {
		const blogsAtStart = await helper.blogsInDb()
	
		const blogToView = blogsAtStart[0]
	
		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	
		const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
	
		expect(resultBlog.body).toEqual(processedBlogToView)
	})

})

describe('actions that require authentication', () => {
 	beforeEach(async () => {
		
		let userId, token;

		await User.deleteMany({})
		const userObj = {
			"username": "test",
			"name": "testname",
			"password": "password"
		}
		// create user
		await api
				.post('/api/users')
				.send(userObj)
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.then((res) => {
					userObj.userId = res.body.id
				})
		

		}) 

	test('a valid blog can be added', async () => {
	
		const user = ( {"username": "test", "password": "password"})
		// login and get token
		const loggedInUser = await api 
					.post('/api/login')
					.send({ "username": user.username, "password": user.password })
					.expect('Content-Type', /application\/json/)

					
		
		const newBlog = {
			"title": "async/await simplifies making async calls",
			"author":"author2",
			"url":"test",
			"user": user.username
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set('Authorization', `Bearer ${loggedInUser.body.token}`)
			.expect(201)
			.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		
			const titles = blogsAtEnd.map(n => n.title)
			expect(titles).toContain(
				'async/await simplifies making async calls'
			)
		
	})

	test('a blog without title or url is not added', async () => {
		const user = ( {"username": "test", "password": "password"})
		// login and get token
		const loggedInUser = await api 
					.post('/api/login')
					.send({ "username": user.username, "password": user.password })
					.expect('Content-Type', /application\/json/)

					
		
		const newBlog = {
			
			"author":"author2",
	
			"user": user.username
		}


		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${loggedInUser.body.token}`)
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

	})

	test('a blog can be deleted', async () => {
		
		// login and get token	
		const user = ( {"username": "test", "password": "password"})
		const loggedInUser = await api 
					.post('/api/login')
					.send(user)
					.expect('Content-Type', /application\/json/)
		
	
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${loggedInUser.body.token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
		const titles = blogsAtEnd.map(r => r.title)
		expect(titles).not.toContain(blogToDelete.title)

	})

	test('a blog added without likes defaults to 0 likes', async () => {
		const user = ( {"username": "test", "password": "password"})
		// login and get token
		const loggedInUser = await api 
					.post('/api/login')
					.send({ "username": user.username, "password": user.password })
					.expect('Content-Type', /application\/json/)

					
		
		const newBlog = {
			"title": "async/await simplifies making async calls",
			"author":"author2",
			"url":"test",
			"user": user.username
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set('Authorization', `Bearer ${loggedInUser.body.token}`)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogs = await helper.blogsInDb()
		expect(blogs[blogs.length-1].likes).toEqual(0)

	})

	test('adding a blog fails with 401 Unathorized if token is not provided', async () => {
		const blogWithNoLikes = {
			"title": "test",
			"author": "test",
			"user": "tom paris",
			"url":"test"
		}

		await api
			.post('/api/blogs')
			.send(blogWithNoLikes)
			.expect(401)

	})

})

afterAll(() => {
	mongoose.connection.close()
})
