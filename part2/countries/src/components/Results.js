import CountryData from './CountryData'
import CountryList from './CountryList'



const Results = ({filteredCountries}) => {

  const tooMany = <div><p>too many results</p></div>
  const one = <CountryData country={filteredCountries} index={0} />
  const listLength = filteredCountries.length

  if (listLength > 10){
    return tooMany
  } else if (listLength === 1){
      return one
    } if (listLength <1 ){
      return <div></div>
    } else {

      return <CountryList filteredCountries={filteredCountries} />
    }
  
}

export default Results