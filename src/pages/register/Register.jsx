import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import AuthenticationForm from "../../components/authenticationForm/AuthenticationForm.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import Footer from "../../components/footer/Footer.jsx";

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: ["user"]
                }
            );

            if (response.status === 200 || response.status === 201) {
                const loginResponse = await axios.post(
                    "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                    {
                        username: data.username,
                        password: data.password,
                    }
                );
                await login(loginResponse.data.accessToken);
                navigate("/");
            }
        } catch (error) {
            console.error("Sign up failed:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthenticationForm
                isLogin={false}
                onSubmit={handleSubmit(handleRegister)}
                error={error}
                loading={loading}
            >
                <InputField
                    label="Username"
                    type="text"
                    id="username-field"
                    name="username"
                    placeholder="Username"
                    register={register}
                    validation={{
                        required: "Username is required",
                        minLength: {
                            value: 6,
                            message: "Username must be at least 6 characters"
                        }
                    }}
                    errors={errors}
                />
                <InputField
                    label="Email"
                    type="email"
                    id="email-field"
                    name="email"
                    placeholder="Email"
                    register={register}
                    validation={{
                        required: "Email is required",
                        pattern: {
                            value: /@/,
                            message: "Email must include @"
                        }
                    }}
                    errors={errors}
                />
                <InputField
                    label="Password"
                    type="password"
                    id="password-field"
                    name="password"
                    placeholder="Password"
                    register={register}
                    validation={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    }}
                    errors={errors}
                />
            </AuthenticationForm>
            <Footer/>
        </>
    );
}

export default Register;