import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import Results from './components/Results'



const App = () => {
  
  const [ countries, setCountries ] = useState([''])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res=>{
      setCountries(res.data)
    })
  }, [])
  
  
  useEffect(()=>{

    const filter = searchTerm.toLowerCase()
    if (filter){
      const countriesToShow = countries.filter(
        country=> country.name.toLowerCase().includes(filter)
      )
      setFilteredCountries(countriesToShow)
        console.log(countriesToShow)
    }
  },[searchTerm,countries]);

 
  const handleInputChange = (event) => {
    
    setSearchTerm(event.target.value)

    }
  
  return (
    <div>
      <Form text="find countries" value={searchTerm} onChange={handleInputChange}/>  
      <Results filteredCountries={filteredCountries} />  
    </div>
  )
}


export default App
