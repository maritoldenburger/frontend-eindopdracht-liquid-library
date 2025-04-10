import React, {useEffect, useState} from "react";
import "./Header.css";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Button from "../button/Button.jsx";

function Header() {
    return (
        <header className="header-container">
            <section className="outer-container">
                <h1><NavLink to="/signup">Sign up</NavLink> and find your new favourite drink!</h1>
            </section>
        </header>
    );
}

export default Header;