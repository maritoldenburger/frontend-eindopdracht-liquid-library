import React, {useContext, useState} from "react";
import "./ProfilePage.css";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import cocktailImage from "../../assets/images/signin cocktail.jpg";

function ProfilePage() {
    const {user, token, logout} = useContext(AuthContext);

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: {errors: emailErrors},
        reset: resetEmailForm,
    } = useForm();

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: {errors: passwordErrors},
        reset: resetPasswordForm,
    } = useForm();

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateEmail = async (data) => {
        setLoading(true);

        try {
            const response = await axios.put(
                "https://frontend-educational-backend.herokuapp.com/api/user",
                {email: data.email},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccessMessage("🍹 Email updated successfully! Please refresh the page.");
                resetEmailForm();
            }
        } catch (error) {
            console.error("Email update failed:", error);
            setError(error.message || "Something went wrong while updating your email.");
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (data) => {
        setLoading(true);

        try {
            const response = await axios.put(
                "https://frontend-educational-backend.herokuapp.com/api/user",
                {password: data.password},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccessMessage("🍹 Password updated successfully! Please refresh the page.");
                resetPasswordForm();
            }
        } catch (error) {
            console.error("Password update failed:", error);
            setError(error.message || "Something went wrong while updating password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="outer-container">
                <section className="inner-container account-details">
                    <img src={cocktailImage} alt="A cocktail" className="account-image"/>
                    <div className="account-details-container">
                        <h2>Hi {user?.username}!</h2>
                        <h3>These are your account details.</h3>
                        <ul className="account-details-list">
                            <li className="account-details-item">
                                <p className="account-details-text">Username:</p>
                                {user.username}
                            </li>
                            <li className="account-details-item">
                                <p className="account-details-text">Email:</p>
                                {user.email}
                            </li>
                        </ul>
                        <form onSubmit={handleSubmitEmail(updateEmail)} className="update-form">
                            <InputField
                                label="Update your email"
                                type="email"
                                id="email"
                                name="email"
                                placeholder={user?.email}
                                register={registerEmail}
                                validation={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /@/,
                                        message: "Email must include @",
                                    },
                                }}
                                errors={emailErrors}
                                className="input-field"
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="account-details-container-button">
                                Update Email
                            </Button>
                        </form>
                        <form onSubmit={handleSubmitPassword(updatePassword)} className="update-form">
                            <InputField
                                label="Update your password"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter new password"
                                register={registerPassword}
                                validation={{
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                }}
                                errors={passwordErrors}
                                className="input-field"
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="account-details-container-button">
                                Update Password
                            </Button>
                        </form>
                        {successMessage && <p>{successMessage}</p>}
                        {errorMessage && <p>{errorMessage}</p>}
                        <div className="logout-button-wrapper">
                            <Button
                                type="button"
                                onClick={logout}
                                className="logout-button"
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default ProfilePage;