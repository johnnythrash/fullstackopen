import React, {useState, useEffect} from 'react'
import CountryData from './CountryData'

  const CountryList = ({filteredCountries}) => {
  
    const [clicked, setClicked] = useState(false)
    const [countryIndex, setCountryIndex] = useState(0)
    const [countryName, setCountryName] = useState('')

    const handleClick = (e) => {
      e.preventDefault()
      setClicked(true)
      setCountryName(e.target.name)
    }

    useEffect(() =>{
      const foundIndex = filteredCountries.findIndex(a=>a.name ===countryName)
      setCountryIndex(foundIndex)
    },[clicked])
    
    if (clicked){
      return (
        <CountryData country={filteredCountries} index={countryIndex} />
      )
    }
    return (
      <ul>
        {filteredCountries.map(country=>
        <li key={country.name}>{country.name}
          <button onClick={handleClick} name={country.name}>show more</button>
        </li>)}
      </ul>
     )
  }

export default CountryList