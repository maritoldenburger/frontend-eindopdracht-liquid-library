import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import AuthenticationForm from "../../components/authenticationForm/AuthenticationForm.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import Footer from "../../components/footer/Footer.jsx";

function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (data) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    username: data.username,
                    password: data.password,
                }
            );

            login(response.data.accessToken);
            navigate("/profile");

        } catch (error) {
            console.error("Sign in failed:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthenticationForm
                isLogin={true}
                onSubmit={handleSubmit(handleLogin)}
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
                    validation={{required: "Username is required"}}
                    errors={errors}
                />
                <InputField
                    label="Password"
                    type="password"
                    id="password-field"
                    name="password"
                    placeholder="Password"
                    register={register}
                    validation={{required: "Password is required"}}
                    errors={errors}
                />
            </AuthenticationForm>
            <Footer/>
        </>
    );
}

export default Login;