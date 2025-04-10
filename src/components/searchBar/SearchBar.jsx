import React from "react";
import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function SearchBar({placeholder, value, onChange, onSubmit, variant}) {
    return (
        <form onSubmit={onSubmit} className="searchbar-form">
            <span className="searchbar-icon-wrapper">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
            </span>
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