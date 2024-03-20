const Countries = ({ countries, handleClick }) => {
    return (
        <ul>
            {countries.map(country => 
            <li key={country.name.common}>
                {country.name.common} 
                <button onClick={() => handleClick(country)}>show</button>
            </li>)}
        </ul>
    )
}

export default Countries