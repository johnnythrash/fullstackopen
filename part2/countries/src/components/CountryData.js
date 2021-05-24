

const CountryData = ({country}) => {
  const { name, flag, languages, population, capital} = country[0]

  
  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p> population: {population}</p>
      <h2>languages</h2>
      { <ul>{languages.map(language=><li key={language.name}>{language.name}</li>)}</ul> }
      <div>
        <img alt='country flag' src={flag} heignt="400" width="400"></img>
      </div>
    </div>
  )

}



export default CountryData