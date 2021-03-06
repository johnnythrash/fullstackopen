import React from 'react'
import { gql, useQuery } from '@apollo/client'
import EditAuthorForm from './EditAuthorForm'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>...loading</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthorForm authors={authors} />
    </div>
  )
}

export default Authors
