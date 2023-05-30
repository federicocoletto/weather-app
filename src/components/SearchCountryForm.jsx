import { useRef } from "react";

/* eslint-disable react/prop-types */
const SearchCountryForm = ({setInputValue, setSearch}) => {

    const inputSearch = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(inputSearch.current.value.trim());
        setSearch(true);
        
        // if (mode === 'celcuis') {
        //     setMode('fahrenheit')
        //     document.querySelectorAll('.celcius-mode').classList.add(`${mode}-mode`)            
        // }
    }

    return (
        <form className="searchCountryForm" onSubmit={handleSubmit}>
            <input 
                type="text" 
                ref={inputSearch} />
            <button><i className="fa-solid fa-magnifying-glass celcuis-mode"></i></button>
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