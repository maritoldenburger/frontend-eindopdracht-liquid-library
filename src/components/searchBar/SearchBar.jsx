import React from "react";
import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

function SearchBar({placeholder, value, onChange, onSubmit, variant, handleReset}) {
    return (

        <div className="searchbar-container">
            <div className="searchbar-wrapper">
                <form onSubmit={onSubmit}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                    <input
                        type="text"
                        name="searchbar"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className={`searchbar ${variant}`}
                    />
                    {value && (
                        <button
                            type="button"
                            className="searchbar-reset-button"
                            onClick={handleReset}
                        >
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SearchBar;