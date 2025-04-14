import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {checkTokenValidity} from "../helpers/checkTokenValidity";

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken);
        } else {
            void logout()
        }
    }, []);

    const login = async (jwtToken) => {
        localStorage.setItem("token", jwtToken);

        try {
            const response = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done"
            });
            navigate("/profile");
        } catch (error) {
            console.log(error)
        }
        console.log("Gebruiker is ingelogd!");
    };

    const logout = () => {
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;