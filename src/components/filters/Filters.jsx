import React, {useState, useEffect} from "react";
import "./Filters.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

function Filters({
                     categories,
                     glasses,
                     categoryFilter,
                     alcoholFilter,
                     ingredientFilter,
                     glassFilter,
                     setCategoryFilter,
                     setAlcoholFilter,
                     setIngredientFilter,
                     setGlassFilter,
                 }) {
    const [openFilters, setOpenFilters] = useState({
        categories: true,
        alcohol: true,
        ingredients: true,
        glasses: true,
    });

    useEffect(() => {
        if (window.innerWidth <= 992) {
            setOpenFilters({
                categories: false,
                alcohol: false,
                ingredients: false,
                glasses: false,
            });
        }
    }, []);

    const toggleFilter = (filter) => {
        if (window.innerWidth <= 992) {
            setOpenFilters((prev) => ({
                ...prev,
                [filter]: !prev[filter],
            }));
        }
    };

    const isMobileOrTablet = window.innerWidth <= 992;

    return (
        <div className="filters-wrapper">
            <div className="filter-header" onClick={() => toggleFilter("categories")}>
                <h4>Categories</h4>
                {isMobileOrTablet && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={openFilters.categories ? "chevron-icon rotate" : "chevron-icon"}
                    />
                )}
            </div>
            <div className={`filter-content ${openFilters.categories ? "open" : "closed"}`}>
                {categories.map((category) => (
                    <label className="filter-option" key={category}>
                        <input
                            type="checkbox"
                            name="category"
                            checked={categoryFilter === category}
                            onChange={() =>
                                setCategoryFilter(categoryFilter === category ? "" : category)
                            }
                        />
                        {category}
                    </label>
                ))}
            </div>

            <div className="filter-header" onClick={() => toggleFilter("alcohol")}>
                <h4>Contains alcohol</h4>
                {isMobileOrTablet && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={openFilters.alcohol ? "chevron-icon rotate" : "chevron-icon"}
                    />
                )}
            </div>
            <div className={`filter-content ${openFilters.alcohol ? "open" : "closed"}`}>
                {["Alcoholic", "Non_Alcoholic", "Optional_alcohol"].map((alcoholic) => (
                    <label className="filter-option" key={alcoholic}>
                        <input
                            type="checkbox"
                            name="alcoholic"
                            checked={alcoholFilter === alcoholic}
                            onChange={() =>
                                setAlcoholFilter(alcoholFilter === alcoholic ? "" : alcoholic)
                            }
                        />
                        {alcoholic.replace("_", " ")}
                    </label>
                ))}
            </div>

            <div className="filter-header" onClick={() => toggleFilter("ingredients")}>
                <h4>Drink base</h4>
                {isMobileOrTablet && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={openFilters.ingredients ? "chevron-icon rotate" : "chevron-icon"}
                    />
                )}
            </div>
            <div className={`filter-content ${openFilters.ingredients ? "open" : "closed"}`}>
                {["Amaretto", "Champagne", "Gin", "Rum", "Tequila", "Vodka", "Whiskey"].map(
                    (drinkIngredient) => (
                        <label className="filter-option" key={drinkIngredient}>
                            <input
                                type="checkbox"
                                name="ingredient"
                                checked={ingredientFilter === drinkIngredient}
                                onChange={() =>
                                    setIngredientFilter(
                                        ingredientFilter === drinkIngredient ? "" : drinkIngredient
                                    )
                                }
                            />
                            {drinkIngredient}
                        </label>
                    )
                )}
            </div>

            <div className="filter-header" onClick={() => toggleFilter("glasses")}>
                <h4>Glass type</h4>
                {isMobileOrTablet && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={openFilters.glasses ? "chevron-icon rotate" : "chevron-icon"}
                    />
                )}
            </div>
            <div className={`filter-content ${openFilters.glasses ? "open" : "closed"}`}>
                {glasses.map((glassType) => (
                    <label className="filter-option" key={glassType}>
                        <input
                            type="checkbox"
                            name="glass"
                            checked={glassFilter === glassType}
                            onChange={() =>
                                setGlassFilter(glassFilter === glassType ? "" : glassType)
                            }
                        />
                        {glassType}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Filters;