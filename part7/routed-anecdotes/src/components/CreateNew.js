import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'


const CreateNew = ({setNotification, addNew }) => {
  const {clear:clearContent, ...content} = useField()
  const {clear:clearAuthor, ...author} = useField()
  const {clear:clearInfo, ...info} = useField()

	
	
	let history = useHistory()

  const handleSubmit = (e) => {
    let anecdoteContent = content.value,
				anecdoteInfo = info.value,
				anecdoteAuthor = author.value
		e.preventDefault()
    addNew({
      content:anecdoteContent,
      author:anecdoteAuthor,
      info:anecdoteInfo,
      votes: 0
    })
		setTimeout(()=>{
			setNotification('')
		},10000)
		setNotification(`added ${anecdoteContent}`)
		history.push('/')
  }

	const handleReset = (e) =>{
		e.preventDefault()
		clearAuthor()
		clearContent()
		clearInfo()

	}
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}	 />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
			<button onClick={handleReset}>reset</button>
    </div>
  )

}

export default CreateNew