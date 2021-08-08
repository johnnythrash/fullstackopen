const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')


router.post('/reset', async (req, res) =>{
	await Blog.deleteMany({})
	await User.deleteMany({})

	res.status(204).end()
})

router.post('/populateList', async (req, res) => {
	const blogObjects = helper.initialBlogs
	.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

	res.status(200).end()
})

module.exports = router