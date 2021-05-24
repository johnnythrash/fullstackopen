import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import Results from './components/Results'



const App = () => {
  
  const [ countries, setCountries ] = useState([''])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState(' ')
  

  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res=>{
      setCountries(res.data)
    })
  }, [])
  

  const handleFilterChange = (event) => {

    setSearchTerm(event.target.value)
    
    const resultsArr = countries.filter(ele => ele.name.toLowerCase().indexOf(searchTerm) > -1)
    
    setFilteredCountries(resultsArr)
      
    console.log(filteredCountries)


  }

  
  return (
    <div>
      <Form text="find countries" value={searchTerm} onChange={handleFilterChange}/>
      <Results filteredCountries={filteredCountries} />
    </div>
  )
}


export default App
