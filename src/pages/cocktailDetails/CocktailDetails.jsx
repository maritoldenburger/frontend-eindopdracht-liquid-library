import React, {useEffect, useState} from "react";
import "./CocktailDetails.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import {useForm} from "react-hook-form";
import StarRating from "../../components/starRating/StarRating.jsx";

function CocktailDetails() {
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState(null);

    const {id} = useParams();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        const fetchCocktail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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

    useEffect(() => {
        const storedComments = localStorage.getItem(`comments-${id}`);
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, [id]);

    const onSubmit = (data) => {
        if (rating === 0) {
            setRatingError("Rating is required");
            return;
        } else {
            setRatingError("");
        }

        const newComment = {
            name: data.name,
            comment: data.comment,
            rating: rating
        };

        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
        reset();
        setRating(0);
    };

    const averageRating = comments.length > 0
        ? comments.reduce((acc, cur) => acc + cur.rating, 0) / comments.length
        : 0;

    return (
        <>
            <div className="outer-container">
                <main className="small-inner-container cocktaildetails">
                    {loading && <p className="loading-message">Mixing... 🍹</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!loading && !error && !cocktail && <p className="error-message">This drink went missing.</p>}

                    {cocktail && (
                        <>
                            <section className="cocktail-details">
                                <div className="image-title-wrapper">
                                    <img
                                        src={cocktail.strDrinkThumb}
                                        alt={cocktail.strDrink}
                                        className="cocktail-image"
                                    />
                                    <div className="cocktail-stats">
                                        <h1 className="drink-title">{cocktail.strDrink}</h1>
                                        <div className="average-rating">
                                            <StarRating value={averageRating} readOnly maxWidth={150}/>
                                        </div>
                                        <div className="favourites-button">
                                            <Button type="button">Add to favourites</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="ingredients-instructions-wrapper">
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
                                </div>
                            </section>

                            <section>
                                <div className="comments-wrapper">
                                    <div className="comments-form-container">
                                        <h3>Leave a comment</h3>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <InputField
                                                label="Name"
                                                type="text"
                                                id="name-field"
                                                name="name"
                                                register={register}
                                                placeholder="Enter your name"
                                                validation={{required: {value: true, message: "Name is required"}}}
                                            />
                                            {errors.name && <p className="form-error-message">{errors.name.message}</p>}

                                            <div className="input-field">
                                                <label htmlFor="rating">Rating</label>
                                                <StarRating
                                                    value={rating}
                                                    onChange={setRating}
                                                    maxWidth={100}
                                                />
                                                {ratingError && <p className="form-error-message">{ratingError}</p>}
                                            </div>

                                            <div className="input-field">
                                                <label htmlFor="comment">Comment</label>
                                                <textarea
                                                    id="comment"
                                                    rows="5"
                                                    placeholder="Type your comment here"
                                                    className="input-field-input"
                                                    {...register("comment", {
                                                        required: "Comment is required"
                                                    })}
                                                />
                                                {errors.comment &&
                                                    <p className="form-error-message">{errors.comment.message}</p>}
                                            </div>

                                            <Button type="submit">Submit your comment</Button>
                                        </form>
                                    </div>

                                    <div className="reviews-container">
                                        {comments.map((item, index) => (
                                            <div className="review-container" key={index}>
                                                <div className="review-header">
                                                    <h4>{item.name}</h4>
                                                    <StarRating value={item.rating} readOnly maxWidth={80}/>
                                                </div>
                                                <p className="review-text">{item.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default CocktailDetails;