import CountryData from './CountryData'

const Results = ({filteredCountries}) => {


  return (
   <div>
     {filteredCountries.length>10?
     <p>too many matches, specify another filter</p>:
     filteredCountries.length===1?
     <CountryData country={filteredCountries} />:
     <ul>{filteredCountries.map(country=><li key={country.name}>{country.name}</li>)}</ul>}

   </div>
  )
}

export default Results