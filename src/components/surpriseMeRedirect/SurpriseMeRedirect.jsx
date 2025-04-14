import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function SurpriseMeRedirect() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRandomCocktail = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
                const randomCocktail = response.data.drinks[0];
                navigate(`/cocktail/${randomCocktail.idDrink}`);
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomCocktail();
    }, [navigate]);

    return <p className="loading-message">Mixing... 🍹</p>;
}

export default SurpriseMeRedirect;