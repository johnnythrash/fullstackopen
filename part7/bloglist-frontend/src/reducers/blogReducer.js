import blogService from '../services/blogs'


export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT',
			data: blogs
		})
	}
}

export const createBlog = (data) => {
	return async dispatch => {
		const newBlog = await blogService.create(data)
		dispatch({
			type: 'CREATE',
			data: newBlog
		})
	}
}

export const likeBlog = (blog) => {
	return async dispatch => {
		const changedBlog = await blogService.likeBlog(blog)
		dispatch({
			type: 'LIKE',
			data: changedBlog.id
		})
	}
}

export const addComment = (blog, comment) => {
	return async dispatch => {
		const changedBlog = await blogService.addComment(blog, comment)
		dispatch({
			type: 'ADDCOMMENT',
			data: changedBlog.id
		})
	}
}

export const deleteBlog = ( ) => {
	return async dispatch => {
		//const blogToDelete = await blogService.deleteBlog(id)
		dispatch({
			type: 'DELETE',
			data: ''
		})
	}
}


const blogReducer = (state =[], action) => {
	switch (action.type){
	case 'CREATE':
		console.log('CREATE')
		return state.concat(action.data)
	case 'INIT':
		console.log('INIT')
		return action.data
	case 'LIKE':{
		console.log('LIKE')
		return state.map(blog => {
			return blog
		})
	}
	case 'ADDCOMMENT':{
		console.log('ADD')
		return state.map(blog => {
			return blog
		})
	}
	default:
		return state
	}
}


export default blogReducer