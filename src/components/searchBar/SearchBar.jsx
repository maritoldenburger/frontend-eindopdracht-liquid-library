import React from "react";
import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function SearchBar({placeholder, value, onChange, onSubmit, variant}) {
    return (

        <div className="searchbar-container">
            <div className="searchbar-wrapper">
                <form onSubmit={onSubmit}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                    <input
                        type="text"
                        name="searchbar"
                        placeholder={placeholder}
                        value={value} // zet je op query
                        onChange={onChange} // zet je op {(e) => setQuery(e.target.value)}
                        className={`searchbar ${variant}`}
                    />
                </form>
            </div>
        </div>
    );
}

export default SearchBar;