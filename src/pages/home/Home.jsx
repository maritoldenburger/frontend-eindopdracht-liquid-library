import React, {useState, useEffect} from "react";
import "./Home.css"
import Header from "../../components/header/Header.jsx";
import Button from "../../components/button/Button.jsx";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CocktailCard from "../../components/cocktailCard/CocktailCard.jsx";
import axios from "axios";
import Footer from "../../components/footer/Footer.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCocktails = async () => {
            setLoading(true);
            try {
                const classicCocktailNames = [
                    "Mojito", "Margarita", "Tequila Sunrise", "Bellini"
                ];

                const fetchedCocktails = [];

                for (let name of classicCocktailNames) {
                    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
                    if (response.data.drinks) {
                        fetchedCocktails.push(response.data.drinks[0]);
                    }
                }

                setCocktails(fetchedCocktails);
            } catch (error) {
                setError(error.message);
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCocktails();
    }, []);

    return (
        <>
            <header>
                <Header className="outer-container">
                    <div className="inner-container"></div>
                </Header>
            </header>
            <main className="outer-container">
                <section className="inner-container">
                    <h2 className="homepage-title">In the spotlight: the classics</h2>
                    <div className="classic-cocktail-container">
                        {cocktails.map((cocktail) => (
                            <CocktailCard key={cocktail.idDrink} cocktail={cocktail}/>
                        ))}
                    </div>
                    <div className="homepage-button-wrapper">
                        <Button onClick={() => navigate("/cocktails")}>
                            Find more classics <FontAwesomeIcon icon={faChevronRight} className="button-icon"/>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;
