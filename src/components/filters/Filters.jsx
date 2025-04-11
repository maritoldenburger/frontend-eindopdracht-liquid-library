import React from "react";
import "./Filters.css"

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
    return (
        <div className="filters-wrapper">
            <h4>Categories</h4>
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

            <h4>Contains alcohol</h4>
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

            <h4>Drink base</h4>
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

            <h4>Glass type</h4>
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
    );
}

export default Filters;