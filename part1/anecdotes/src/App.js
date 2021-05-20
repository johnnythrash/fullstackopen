import React, { useState } from 'react'




const Button = ({text, handleClick }) => {
  return ( 
    <button onClick={handleClick}>{text}</button>
  )
}

const MostVoteDisplay = ({votes, quotes}) => {
  const indexofHighest = votes.indexOf(Math.max.apply(Math, votes))
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      
      <p>{quotes[indexofHighest]}</p>
      <p>has {votes[indexofHighest]} votes</p>
      
      
      </div>
  )
}

const VoteDisplay = ({votes, selected}) => {
 
  return (
    <div>
     <p> has {votes[selected]} votes! </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  
 
  const randClick = () => {
    let rand = Math.floor(Math.random()* anecdotes.length);
    setSelected(rand);
    }

  const voteClick = () => {
    const vote = [...votes]
    vote[selected] += 1
    setVotes(vote)
  }

  return (
    <div>
      <h1> Anecdote of the Day </h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={randClick} text="new quote" />
      <VoteDisplay votes={votes} selected={selected}/>
      <MostVoteDisplay votes={votes} quotes={anecdotes} />
      
     
    </div>
  )
}

export default App
