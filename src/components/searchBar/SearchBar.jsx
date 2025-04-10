import React from "react";
import "./SearchBar.css";

function SearchBar({placeholder, value, onChange, onSubmit, variant}) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="searchbar"
                placeholder={placeholder}
                value={value} // zet je op query
                onChange={onChange} // zet je op {(e) => setQuery(e.target.value)}
                className={`searchbar ${variant}`}
            />
        </form>
    );
}

export default SearchBar;