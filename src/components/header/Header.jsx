import React, {useEffect, useState} from "react";
import "./Header.css";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
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
            if (response.data.drinks) {
                setCocktails(response.data.drinks);
            } else {
                setCocktails([]);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
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
        } else {
            setSearchSuggestions([]);
        }
    }, [query, cocktails]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setError(null);

        const foundCocktail = cocktails.find(
            (cocktail) =>
                cocktail.strDrink.toLowerCase() === query.toLowerCase()
        );

        if (foundCocktail) {
            navigate(`/cocktail/${foundCocktail.idDrink}`);
        } else if (!query) {
            setError("Please enter a drink name.");
        } else {
            setError("We couldn't find a drink with that name. Please try a different search term.");
        }
    };

    const handleChosenSuggestion = (cocktail) => {
        navigate(`/cocktail/${cocktail.idDrink}`);
    };

    const handleReset = () => {
        setQuery("");
        setError(null);
        setCocktails([]);
        setSearchSuggestions([]);
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
                        onSubmit={handleSearch}
                        handleReset={handleReset}
                    />
                    {loading && <p className="loading-message">Shaking... 🍸</p>}
                    {error && <p className="error-message">{error}</p>}
                    {query && !loading && searchSuggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {searchSuggestions.map((cocktail) => (
                                <li className="suggestion-item"
                                    key={cocktail.idDrink}
                                    onClick={() => handleChosenSuggestion(cocktail)}
                                >
                                    {cocktail.strDrink}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </header>
    );
}

export default Header;