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
	await User.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)


	let token; 
	const result = await api
										.post('/api/login')
										.send({'username' : 'test',
													'password' : 'test' 
													})

	token = result.body.token
		
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
//		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
	//.set('Authorization', `Bearer ${token}`)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
	//.set('Authorization', `Bearer ${token}`)

  const titles = response.body.map(r => r.title)
	expect(titles).toContain(
		'blog1'
	)
})

test('unique identifier is named id', async () => {
	const response = await api.get('/api/blogs')
	//.set('Authorization', `Bearer ${token}`)
	let firstItem = response.body[0].id
	expect(firstItem).toBeDefined()
})

test('a valid blog can be added', async () => {

	const newBlog = {
		"title": "async/await simplifies making async calls",
		"author":"author2",
		"url":"test"
	}
	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(newBlog)
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
  const newBlog = {
    
  }

  await api
    .post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
		.set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
	const user = {
		userId: userId
	}

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
		.set('Authorization', `Bearer ${token}`)
		.send(user)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog added without likes defaults to 0 likes', async () => {
	const blogWithNoLikes = {
		"title": "test",
		"author": "test",
		"userId": userId,
		"user": "tom paris",
		"url":"test"
	}

	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(blogWithNoLikes)
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
		.set('Authorization', `Bearer ${token}`)
		.send(blogWithNoLikes)
		.expect(401)

})


afterAll(() => {
	mongoose.connection.close()
})
