export const getSearchSuggestions = (query, cocktails) => {

    const filteredSuggestions = cocktails.filter((cocktail) =>
        cocktail.strDrink.toLowerCase().includes(query.toLowerCase())
    );
    return filteredSuggestions.slice(0, 5);
};