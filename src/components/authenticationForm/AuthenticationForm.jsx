import React from "react";
import "./AuthenticationForm.css"
import {NavLink} from "react-router-dom";
import cocktailImage from "../../assets/images/signin cocktail.jpg";

function AuthenticationForm({isLogin = false, onSubmit, children, error, loading}) {
    return (
        <main className="outer-container">
            <section className="inner-container authentication-form">
                <div className="authentication-form-container">
                    <h2>
                        {isLogin
                            ? <>Welcome back!</>
                            : <>Welcome to Liquid Library!</>
                        }
                    </h2>
                    <form onSubmit={onSubmit} className="authentication-form">
                        {children}
                        {error && <p className="form-error-message">{error}</p>}
                        <button type="submit" disabled={loading}>
                            {isLogin ? "Sign in" : "Sign up"}
                        </button>
                    </form>
                    <p className="form-bottom-text">
                        {isLogin
                            ? <>Don't have an account? <NavLink to="/register">Click here to sign up.</NavLink></>
                            : <>Already have an account? <NavLink to="/login">Click here to sign in.</NavLink></>
                        }
                    </p>
                </div>
                <img src={cocktailImage} alt="A cocktail" className="authentication-image"/>
            </section>
        </main>
    );
}

export default AuthenticationForm;