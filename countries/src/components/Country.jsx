const Country = ({ country }) => {
    const tempInF = Math.round((country.weather.temp-273.15)*(9/5)+32)
    const iconUrl = `https://openweathermap.org/img/wn/${country.weather.icon}@2x.png`
    return (
        <>
            <h1>{country.name}</h1>
            {country.capital != null && <div>capital: {country.capital[0]}</div>}
            <div>area: {country.area}</div>
            <h3>languages</h3>
            <ul>
                {Object
                    .entries(country.languages)
                    .map(language => 
                        <li key={language[0]}>{language[1]}</li>
                    )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            <h2>Weather in {country.capital}</h2>
            <div>temperature: {tempInF}</div>
            <img src={iconUrl} />
            <div>wind: {country.weather.wind}</div>
        </>   
    )
    
}

export default Country