const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		"title":"blog1",
		"author":"author1",
		"id":1
	},
	{
		"title":"blog2",
		"author":"author2",
		"id":2
	}
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'author1' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
