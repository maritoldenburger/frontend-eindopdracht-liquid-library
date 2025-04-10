import React, {useEffect, useState} from "react";
import "./CocktailCard.css"
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";

function CocktailCard({cocktail}) {
    return (
        <div className="cocktail-card">
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