import React, { useState } from "react"


const Button = ({ handleClick, text }) => {

  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


 
  const handleGood = () => {
    setGood(good+1);
  }

  const handleNeutral = () => {
    setNeutral(neutral+1);
  }

  const handleBad = () => {
    setBad(bad+1);
  }

  const Statistic = ({text, value}) =>{
    if(text !== 'positive'){
      return(
        <tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>
      )
  } return(
    <tbody><tr><td>{text}</td><td>{value} %</td></tr></tbody>
  )

}
  
  const Statistics = () => {
    if (!(good === 0 && bad === 0 && neutral === 0)){
      return (
        <table>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good+neutral+bad} />
          <Statistic text="average" value={(good+-Math.abs(bad)/(good+bad+neutral))} />
          <Statistic text="positive" value={(good/(good+bad+neutral))*100} />
        </table>
    )}
      return (
        <div> 
          <p> No feedback given</p>
        </div>
    )
  }

  
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics />

    </div>
  )
}

export default App;
