import TooMany from "./TooMany"
import Countries from "./Countries"
import Country from "./Country"

const FilteredContent = ({ country, filtered, handleClick }) => {
    if (country != null) {
        return <Country country={country} />
    } else {
        if (filtered.length == 1) {
            return
        } else if (filtered.length < 10) {
            return <Countries countries={filtered} handleClick={handleClick} />
        } else {
            return <TooMany />
        }
    }
}

export default FilteredContent
