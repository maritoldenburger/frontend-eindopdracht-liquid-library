import React, {useEffect, useState} from "react";
import "./Cocktails.css";
import CocktailCard from "../../components/cocktailCard/CocktailCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import Button from "../../components/button/Button.jsx";
import axios from "axios";

function Cocktails() {
    const [cocktails, setCocktails] = useState([]);
    const [visibleCocktails, setVisibleCocktails] = useState([]);
    const [matchingCocktails, setMatchingCocktails] = useState([]);
    const [foundMatches, setFoundMatches] = useState("");
    const [query, setQuery] = useState("");
    const [offset, setOffset] = useState(0);
    const [searchOffset, setSearchOffset] = useState(12);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");

                setCocktails(response.data.drinks);
                setVisibleCocktails(response.data.drinks.slice(0, 12));
                setCanLoadMore(response.data.drinks.length > 12);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (e) => {

        e.preventDefault();
        setOffset(0);
        setSearchOffset(12);
        setError(null);
        setLoading(true);
        setFoundMatches(query);

        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
            const fetchedCocktails = response.data.drinks || [];

            const filtered = fetchedCocktails.filter((cocktail) => {
                const lowerQuery = query.toLowerCase();
                return (
                    cocktail.strDrink.toLowerCase().includes(lowerQuery) ||
                    Object.keys(cocktail)
                        .filter(key => key.startsWith("strIngredient") && cocktail[key])
                        .some(ingredientKey =>
                            cocktail[ingredientKey].toLowerCase().includes(lowerQuery)
                        )
                );
            });

            setMatchingCocktails(filtered);
            setVisibleCocktails(filtered.slice(0, 12));
            setCanLoadMore(filtered.length > 12);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = () => {
        setQuery("");
        setFoundMatches("");
        setMatchingCocktails([]);
        setVisibleCocktails(cocktails.slice(0, 12));
        setOffset(0);
        setSearchOffset(12);
        setCanLoadMore(cocktails.length > 12);
    };

    const loadMoreCocktails = () => {
        if (foundMatches === "") {
            const newOffset = offset + 12;
            setOffset(newOffset);
            setVisibleCocktails(cocktails.slice(0, newOffset + 12));
            setCanLoadMore(cocktails.length > newOffset + 12);
        } else {
            const newSearchOffset = searchOffset + 12;
            setSearchOffset(newSearchOffset);
            setVisibleCocktails(matchingCocktails.slice(0, newSearchOffset));
            setCanLoadMore(matchingCocktails.length > newSearchOffset);
        }
    };

    return (
        <>
            <div className="outer-container">
                <main className="inner-container">
                    <div className="cocktails-content-wrapper">
                        <SearchBar
                        placeholder="Search for a specific drink or ingredient..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onSubmit={handleSearch}
                        handleReset={resetSearch}
                        variant="searchbar-default"
                    />

                        {loading && <p>Shaking... 🍸</p>}
                        {error && <p>{error}</p>}

                        {!loading && visibleCocktails.length === 0 && foundMatches !== "" && (
                            <p>We couldn't find any matching cocktails. Please try again with a different search
                                term.</p>
                        )}

                        <div className="cocktail-grid">
                            {visibleCocktails.map((cocktail) => (
                                <CocktailCard key={cocktail.idDrink} cocktail={cocktail}/>
                            ))}

                            {!loading && canLoadMore && (
                                <Button onClick={loadMoreCocktails}>Load more cocktails</Button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default Cocktails;