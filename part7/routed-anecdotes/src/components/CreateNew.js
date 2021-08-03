import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const CreateNew = ({setNotification, addNew }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

	
	let history = useHistory()

  const handleSubmit = (e) => {
    
		e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
		setTimeout(()=>{
			setNotification('')
		},10000)
		setNotification(`added ${content}`)
		history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew