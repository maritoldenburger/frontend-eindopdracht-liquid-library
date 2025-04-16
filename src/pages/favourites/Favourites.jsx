import React, { useEffect, useState } from "react";
import "./Favourites.css";
import CocktailCard from "../../components/cocktailCard/CocktailCard.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Button from "../../components/button/Button.jsx";

function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const [visibleFavourites, setVisibleFavourites] = useState([]);
    const [offset, setOffset] = useState(0);
    const [canLoadMore, setCanLoadMore] = useState(true);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourites(storedFavourites);
        setVisibleFavourites(storedFavourites.slice(0, 16));
        setCanLoadMore(storedFavourites.length > 16);
    }, []);

    const loadMoreFavourites = () => {
        const newOffset = offset + 16;
        setOffset(newOffset);
        setVisibleFavourites(favourites.slice(0, newOffset + 16));
        setCanLoadMore(favourites.length > newOffset + 16);
    };

    return (
        <>
            <div className="outer-container favourites">
                <main className="inner-container favourites">
                    <section className="cocktail-content-section">
                        <h1 className="page-title">Browse your favourites</h1>
                        <div className="cocktail-grid">
                            {visibleFavourites.length === 0 && (
                                <p className="error-message">You don't have any favourites yet. </p>
                            )}
                            {visibleFavourites.map((cocktail) => (
                                <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
                            ))}
                        </div>
                        <div className="load-more-favourites-button">
                            {canLoadMore && (
                                <Button onClick={loadMoreFavourites}>Load more favourites</Button>
                            )}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default Favourites;