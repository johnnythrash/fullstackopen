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
	const token = req.token
	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if ( !decodedToken.id || !token ){
			return response.status(401).json({ error: 'token missing or invalid' })
	}
	
	if(!body.title || !body.url){
		res.status(400).json({ error: 'missing url or title' })
	}	
	
	const user = await User.findById(decodedToken.id)
	const blog = new Blog({
		title: body.title,
		url: body.url,
		likes: body.likes === undefined ? 0: body.likes,
		author: body.author,
		user: user.id,
		comments: []
	})

	const savedBlog =	await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	res.status(201).json(savedBlog)
	
})

blogsRouter.delete('/:id', async (req, res) => {
	const body = req.body
	const token = req.token
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if ( !decodedToken.id || !token ){
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await User.findById(decodedToken.id)
	const blog = await Blog.findById(req.params.id)
	
	if (!blog){
			return res.status(401).json({ error: 'could not find blog'})
		}
		console.log('blog'+blog.user.toString(),'\n user:'+user._id.toString())
	if (blog.user.toString() === user._id.toString() ){
			await Blog.findByIdAndRemove(req.params.id)
			res.status(204).end()
	} else {
		return res.status(401).json({ error: 'only the user who created blog can delete it' })
	}
	
}) 

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body
	const updatedBlog = await Blog
		.findByIdAndUpdate(req.params.id, body, { new: true } )
	res.json(updatedBlog)
})

module.exports = blogsRouter
