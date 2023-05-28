/* eslint-disable react/prop-types */
const SearchCountryForm = ({setInputValue, setSearch}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(e.target.searchCountry.value.trim());
        setSearch(true);
    }

    return (
        <form className="searchCountryForm" onSubmit={handleSubmit}>
            <input type="text" id="searchCountry" />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default SearchCountryForm