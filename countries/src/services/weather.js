import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const getCoordinates = (countryCapital) => axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${countryCapital}&limit=1&appid=${api_key}`)

const getWeatherFromCoordinates = (lat, lon) => axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)

export default { getCoordinates, getWeatherFromCoordinates }