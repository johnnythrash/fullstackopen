
	const dummy = (blogs) => {
		return 1
	}
	
	
const totalLikes = (blogs) => {
	
	return blogs.length === 0
	? 0
	: blogs.map(blog => blog.likes).reduce((a,b)=> a+b)
}


const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce((max,blog)=> max.likes > blog.likes ? max : blog)
	return favorite
}


const mostBlogs = (blogs) => {
	
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}