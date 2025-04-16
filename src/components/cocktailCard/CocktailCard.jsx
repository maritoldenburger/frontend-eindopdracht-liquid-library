import React, {useEffect, useState} from "react";
import "./CocktailCard.css";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

function CocktailCard({cocktail}) {
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setIsFavourite(storedFavourites.some((fav) => fav.idDrink === cocktail.idDrink));
    }, [cocktail.idDrink]);

    const toggleFavourite = () => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        let updatedFavourites;

        if (isFavourite) {
            updatedFavourites = storedFavourites.filter((fav) => fav.idDrink !== cocktail.idDrink);
        } else {
            updatedFavourites = [...storedFavourites, cocktail];
        }

        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
        setIsFavourite(!isFavourite);
    };

    return (
        <div className="cocktail-card">
            <div
                className={`favourite-icon ${isFavourite ? "is-favourite" : ""}`}
                onClick={toggleFavourite}
            >
                <FontAwesomeIcon icon={isFavourite ? faHeartSolid : faHeartRegular}/>
                <span className="tooltip-text">
        {isFavourite ? "Unfavourite" : "Favourite"}
    </span>
            </div>
            <Link to={`/cocktail/${cocktail.idDrink}`} className="cocktail-card-link">
                <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    className="cocktail-card-image"
                />
                <h3 className="cocktail-card-title">{cocktail.strDrink}</h3>
            </Link>
        </div>
    );
}

export default CocktailCard;