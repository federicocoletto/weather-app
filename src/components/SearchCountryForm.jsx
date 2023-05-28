import { useState } from "react";

/* eslint-disable react/prop-types */
const SearchCountryForm = ({setInputValue}) => {

    const [search, setSearch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(e.target.searchCountry.value.trim());
        setSearch(!search);
        console.log(search);
    }

    return (
        <div className="searchCountryForm">
            <form onSubmit={handleSubmit}>
                <input type="text" id="searchCountry" />
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchCountryForm