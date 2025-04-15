import React from "react";
import "./Register.css"
import InputField from "../../components/inputField/InputField.jsx";
import cocktailImage from "../../assets/images/signin cocktail.jpg";
import {useForm} from "react-hook-form";
import Footer from "../../components/footer/Footer.jsx";

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {

    };

    return (
        <>
            <main className="outer-container">
                <section className="inner-container register">
                    <div className="register-form-container">
                        <h2>Welcome to Liquid Library!</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                            <InputField
                                label="Username"
                                type="text"
                                id="username-field"
                                name="username"
                                register={register}
                                placeholder="Username"
                                validation={{required: {value: true, message: "Username is required"}}}
                            />
                            {errors.username && <p className="form-error-message">{errors.username.message}</p>}
                            <InputField
                                label="Email"
                                type="email"
                                id="email-field"
                                name="email"
                                register={register}
                                placeholder="Email"
                                validation={{required: {value: true, message: "Email is required"}}}
                            />
                            {errors.email && <p className="form-error-message">{errors.email.message}</p>}
                            <InputField
                                label="Password"
                                type="password"
                                id="password-field"
                                name="password"
                                register={register}
                                placeholder="Password"
                                validation={{required: {value: true, message: "Password is required"}}}
                            />
                            {errors.password && <p className="form-error-message">{errors.password.message}</p>}
                            <button type="submit">Sign up</button>
                        </form>
                    </div>
                    <img
                        src={cocktailImage}
                        alt="A cocktail"
                        className="register-image"/>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Register;