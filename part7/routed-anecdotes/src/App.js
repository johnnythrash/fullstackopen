import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import AnecdoteView from './components/AnecdoteView'

const Menu = ({addNew,anecdotes}) => {
  const padding = {
    paddingRight: 5
  }
  return (
		<Router>
			<div>
				<Link style={padding} to='/'>anecdotes</Link>
				<Link style={padding} to= '/create'>create new</Link>
				<Link style={padding} to='/about'>about</Link>
			</div>

			<Switch>
				<Route path='/anecdotes/:id'>
					<AnecdoteView anecdotes={anecdotes} />
				</Route>
				<Route path="/create">
				<CreateNew addNew={addNew} />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/">
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>
		</Router>
  )
}



const App = () => {
	const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu addNew={addNew} anecdotes={anecdotes}/>
 
      <Footer />
    </div>
  )
}

export default App;