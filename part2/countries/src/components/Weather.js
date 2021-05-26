import axios from 'axios'
import React, { useEffect, useState } from 'react'


  const Weather = ({capital,countryName}) => {

    const [weather, setWeather] = useState()
    console.log(capital)

    useEffect(()=>{
      
      const key = process.env.REACT_APP_WEATHER_API
      const query=capital+','+countryName
      const urlbase="http://api.weatherstack.com/current?access_key="
      axios.get(urlbase+key+"&query="+query).then(res=>{
        setWeather(res.data)
        console.log(res.data)
      })
    },[capital])

    console.log(weather)

    if (!weather){
      return <div><p>no weather data available</p></div>
    }
    else if (weather){
  
      const {temp, weather_icons, wind_speed, wind_dir} = weather.current
      const {name} = weather.location
      return (
        <div>
          <h2>Weather in {name}</h2>
          <p>Temperature: {temp} °C</p>
          <img src={weather_icons[0]} alt="weather icon"></img>
          <p>Wind: {wind_speed} mph, direction: {wind_dir}</p> 
          </div>
      )
    } else {
      <p></p>
    }
  }

export default Weather