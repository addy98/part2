import { useState, useEffect } from 'react'
import Search from './components/Search'
import FilteredContent from './components/FilteredContent'
import countries_service from './services/countries'
import weather_service from './services/weather'

const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    countries_service.getCountries()
    .then(response => setCountries(response.data))
    .catch(error => console.log(error))
  }, [])

  const loadCountry = (country) => {
    weather_service.getCoordinates(country.capital)
    .then(response => weather_service.getWeatherFromCoordinates(response.data[0].lat, response.data[0].lon))
    .then(response => setCountry(
      {
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flags: country.flags,
        weather: 
          {
            temp: response.data.current.temp,
            icon: response.data.current.weather[0].icon,
            wind: response.data.current.wind_speed
          }
      }
      ))
    .catch(error => console.log(error))
  }

  // event handlers
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFiltered(filtered)
    if (filtered.length == 1) {
      loadCountry(filtered[0])
    }
    setCountry(null)
  }

  const handleClick = (country) => {
    loadCountry(country)
  }

  return (
    <>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <FilteredContent filtered={filtered} country={country} handleClick={handleClick} />
    </>
  )
}

export default App
