import React, {useEffect, useState} from "react";
import "./Header.css";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Button from "../button/Button.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";

function Header() {
    return (
        <header className="outer-container header-container">
            <section className="inner-container">
                <h1><NavLink to="/signup">Sign up</NavLink> and find your new favourite drink!</h1>
                <SearchBar className="searchbar-default">
                </SearchBar>
            </section>
        </header>
    );
}

export default Header;