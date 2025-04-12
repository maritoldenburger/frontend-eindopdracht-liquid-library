import React, {useEffect, useState} from "react";
import "./Header.css";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../button/Button.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";
import {getSearchSuggestions} from "../../helpers/getSearchSuggestions.js";

function Header() {
    const [cocktails, setCocktails] = useState([]);
    const [query, setQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchCocktails = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
            console.log("Fetched cocktails:", response.data.drinks);
            if (response.data.drinks) {
                setCocktails(response.data.drinks);
            } else {
                setCocktails([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching cocktails:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchCocktails(query);
        } else {
            setCocktails([]);
        }
    }, [query]);

    useEffect(() => {
        if (query) {
            const filteredSuggestions = getSearchSuggestions(query, cocktails);
            setSearchSuggestions(filteredSuggestions);
            console.log("Filtered suggestions:", filteredSuggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [query, cocktails]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleChosenSuggestion = (cocktail) => {
        navigate(`/cocktail/${cocktail.idDrink}`);
    };

    return (
        <header className="outer-container header-container">
            <section className="inner-container">
                <h1><NavLink to="/signup">Sign up</NavLink> and find your new favourite drink!</h1>
                <div className="inner container searchbar-container">
                    <SearchBar
                        variant="searchbar-homepage"
                        placeholder="Start searching..."
                        value={query}
                        onChange={handleChange}
                    />
                    {query && !loading && searchSuggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {searchSuggestions.map((cocktail) => (
                                <li
                                    key={cocktail.idDrink}
                                    onClick={() => handleChosenSuggestion(cocktail)}
                                >
                                    {cocktail.strDrink}
                                </li>
                            ))}
                        </ul>
                    )}
                    {loading && <p className="loading-message">Shaking... 🍸</p>}
                </div>
            </section>
        </header>
    );
}

export default Header;