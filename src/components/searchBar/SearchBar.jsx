import React from "react";
import "./SearchBar.css";

function SearchBar({placeholder, value, onChange, onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="searchbar"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </form>
    );
}

export default SearchBar;