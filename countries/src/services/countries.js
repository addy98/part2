import axios from 'axios'

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = () => axios.get(countriesUrl)

export default { getCountries }