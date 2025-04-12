import React, {useEffect, useState} from "react";
import "./Cocktails.css";
import CocktailCard from "../../components/cocktailCard/CocktailCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import Button from "../../components/button/Button.jsx";
import axios from "axios";
import Filters from "../../components/filters/Filters.jsx";

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

    const [categoryFilter, setCategoryFilter] = useState("");
    const [alcoholFilter, setAlcoholFilter] = useState("");
    const [ingredientFilter, setIngredientFilter] = useState("");
    const [glassFilter, setGlassFilter] = useState("");

    const [categories, setCategories] = useState([]);
    const [glasses, setGlasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");

                setCocktails(response.data.drinks);
                setVisibleCocktails(response.data.drinks.slice(0, 12));
                setCanLoadMore(response.data.drinks.length > 12);

                const categoryResponse = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
                if (categoryResponse.data.drinks) {
                    setCategories(categoryResponse.data.drinks.map((c) => c.strCategory));
                }

                const glassResponse = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
                if (glassResponse.data.drinks) {
                    setGlasses(glassResponse.data.drinks.map((g) => g.strGlass));
                }

            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchFiltered = async () => {
            if (!categoryFilter && !alcoholFilter && !ingredientFilter && !glassFilter) {
                setVisibleCocktails(cocktails.slice(0, 12));
                setCanLoadMore(cocktails.length > 12);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                let url = "";

                if (categoryFilter) url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryFilter}`;
                else if (glassFilter) url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassFilter}`;
                else if (alcoholFilter) url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholFilter}`;
                else if (ingredientFilter) url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientFilter}`;

                const response = await axios.get(url);
                if (response.data.drinks) {
                    setVisibleCocktails(response.data.drinks.slice(0, 12));
                    setCanLoadMore(response.data.drinks.length > 12);
                } else {
                    setVisibleCocktails([]);
                    setCanLoadMore(false);
                }
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFiltered();
    }, [categoryFilter, alcoholFilter, ingredientFilter, glassFilter, cocktails]);

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
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
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
            <div className="outer-container cocktails">
                <main className="inner-container cocktails">
                    <aside className="cocktail-filters-wrapper">
                        <Filters
                            categories={categories}
                            glasses={glasses}
                            categoryFilter={categoryFilter}
                            alcoholFilter={alcoholFilter}
                            ingredientFilter={ingredientFilter}
                            glassFilter={glassFilter}
                            setCategoryFilter={setCategoryFilter}
                            setAlcoholFilter={setAlcoholFilter}
                            setIngredientFilter={setIngredientFilter}
                            setGlassFilter={setGlassFilter}
                        />
                    </aside>
                    <section className="cocktail-content-section">
                        <div className="cocktail-searchbar-container">
                            <SearchBar
                                placeholder="Search for a specific drink or ingredient..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onSubmit={handleSearch}
                                handleReset={handleReset}
                                variant="searchbar-default"
                            />
                        </div>
                        <div className="cocktail-grid">
                            {loading && <p className="loading-message">Mixing... 🍹</p>}
                            {error && <p className="error-message">{error}</p>}
                            {!loading && visibleCocktails.length === 0 && foundMatches !== "" && (
                                <p className="error-message">No matches found. Please try a different search term.</p>
                            )}
                            {visibleCocktails.map((cocktail) => (
                                <CocktailCard key={cocktail.idDrink} cocktail={cocktail}/>
                            ))}
                        </div>

                        <div className="load-more-cocktails-button">
                            {!loading && canLoadMore && (
                                <Button onClick={loadMoreCocktails}>Load more cocktails</Button>
                            )}
                        </div>
                    </section>
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default Cocktails;