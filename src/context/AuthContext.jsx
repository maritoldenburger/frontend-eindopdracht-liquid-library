import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {checkTokenValidity} from "../helpers/checkTokenValidity";

export const AuthContext = createContext(null);

export function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && checkTokenValidity(storedToken)) {
            login(storedToken);
        } else {
            logout();
        }
    }, []);

    const login = async (jwtToken) => {
        localStorage.setItem("token", jwtToken);

        try {
            const response = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
    };

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        token: localStorage.getItem("token"),
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Mixing... 🍹</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;