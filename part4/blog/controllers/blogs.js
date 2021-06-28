const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

require('express-async-errors')



blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
		}
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	if(!body.title || !body.url){
		res.status(400).end()
	}	
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!req.token || !decodedToken.id){
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	
	if (!req.user){
		return res.status(401).json({error: 'no username proided'})
	}

	const user = req.user

	const blog = new Blog({
		title: body.title,
		url: body.url,
		likes: body.likes === undefined ? 0: body.likes,
		user: user._id
	})
	



	const savedBlog =	await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	res.status(201).json(savedBlog)
	
})

blogsRouter.delete('/:id', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!req.token || !decodedToken.id){
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	const user = req.user
	if (!user){
		return res.status(401).json({ error: 'could not find user' }).end()
	} else {
		const blog = await Blog.findById(req.params.id)
		if (!blog){
			return res.status(401).json({ error: 'could not find blog'})
		}
		if (blog.user.id.toString() === req.body.userId.toString() ){
			await Blog.findByIdAndRemove(req.params.id)
			res.status(204).end()
	} else {
		return res.status(401).json({ error: 'unathorized user' })
	}
	}
}) 

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body
	const updatedBlog = await Blog
		.findByIdAndUpdate(req.params.id, body, { new: true } )
	res.json(updatedBlog)
})

module.exports = blogsRouter
