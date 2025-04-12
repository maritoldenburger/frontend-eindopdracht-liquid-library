import React, {useEffect, useState} from "react";
import "./CocktailDetails.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";

function CocktailDetails() {
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const fetchCocktail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                if (response.data.drinks && response.data.drinks.length > 0) {
                    setCocktail(response.data.drinks[0]);
                } else {
                    setCocktail(null);
                }
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCocktail();
    }, [id]);

    const fetchIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`${measure || ""} ${ingredient}`.trim());
            }
        }
        return ingredients;
    };

    return (
        <>
            <div className="outer-container">
                <main className="small-inner-container">
                    {loading && <p className="loading-message">Mixing... 🍹</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!loading && !error && !cocktail && (
                        <p className="error-message">This drink went missing.</p>
                    )}

                    {cocktail && (
                        <section className="cocktail-details">
                            <div className="image-title-wrapper">
                                <img
                                    src={cocktail.strDrinkThumb}
                                    alt={cocktail.strDrink}
                                    className="cocktail-image"
                                />
                                <div className="cocktail-stats">
                                    <h1 className="drink-title">{cocktail.strDrink}</h1>
                                    <p className="rating">⭐️⭐️⭐️⭐️☆</p>
                                    <div className="favourites-button">
                                        <Button
                                        type="button"
                                        // onClick={onClick}
                                    >
                                        Add to favourites
                                    </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="ingredients-instructions-content">
                                <div className="ingredients">
                                    <h2>Ingredients</h2>
                                    <ul>
                                        {fetchIngredients().map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="instructions">
                                    <h2>Instructions</h2>
                                    {cocktail.strInstructions
                                        .split(". ")
                                        .map((step, index) => (
                                            <p key={index}>{step.trim()}.</p>
                                        ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
            <Footer/></>
    );
}

export default CocktailDetails;