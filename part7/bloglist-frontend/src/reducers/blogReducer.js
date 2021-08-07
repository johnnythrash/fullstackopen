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



const blogReducer = (state =[], action) => {
	switch (action.type){
	case 'CREATE':
		console.log('CREATE')
		return state.concat(action.data)
	case 'INIT':
		console.log('INIT')
		return action.data
	default:
		return state
	}
}


export default blogReducer