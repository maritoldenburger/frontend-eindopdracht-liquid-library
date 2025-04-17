import React, {useContext, useState} from "react";
import "./Navigation.css";
import logo from "../../assets/images/liquid library white logo.png";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular, faUser, faCircleQuestion} from "@fortawesome/free-regular-svg-icons";
import {faMartiniGlass, faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {
    const {isAuth} = useContext(AuthContext);
    const [openMenu, toggleOpenMenu] = useState(false);

    const toggleMenu = () => {
        toggleOpenMenu(!openMenu);
    };

    return (
        <header className="outer-container">
            <nav className="inner-container">
                <NavLink to="/"><img src={logo} className="logo" alt="Logo"/></NavLink>
                <button className="menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={openMenu ? faXmark : faBars} className="menu-icon"/>
                </button>
                <ul className={`nav-links ${openMenu ? "open" : ""}`}>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/surprise"
                        >
                            <FontAwesomeIcon icon={faCircleQuestion} className="nav-icon"/>
                            Surprise me!
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/cocktails"
                        >
                            <FontAwesomeIcon icon={faMartiniGlass} className="nav-icon"/>
                            Cocktails
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/favourites"
                        >
                            <FontAwesomeIcon icon={faHeartRegular} className="nav-icon"/>
                            Favourites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                            to={isAuth ? "/profile" : "/login"}
                        >
                            <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                            {isAuth ? "Profile" : "Sign In"}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;