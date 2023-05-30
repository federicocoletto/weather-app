import { useRef } from "react";

/* eslint-disable react/prop-types */
const SearchCountryForm = ({setInputValue, setSearch}) => {

    const inputSearch = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(inputSearch.current.value.trim());
        setSearch(true);
    }

    return (
        <form className="searchCountryForm" onSubmit={handleSubmit}>
            <input type="text" ref={inputSearch} />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default SearchCountryForm

/*
const inpLang = useRef()
<form onSubmit={handleSubmit}>
    <input type="text" ref={inpLang} />
    <button type='button' >Search</button>
</form>
*/