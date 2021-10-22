import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const EditAuthorForm = ({ authors }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo } })
    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Author name:
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((author) => (
              <option value={author.name} key={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <input
            value={setBornTo}
            onChange={({ target }) =>
              setSetBornTo(parseInt(target.value))
            }
          ></input>
        </div>
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default EditAuthorForm
