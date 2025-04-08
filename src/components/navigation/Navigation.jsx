import React from "react";
import "./Navigation.css";
import logo from "../../assets/images/liquid library white logo.png";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular, faUser, faCircleQuestion} from "@fortawesome/free-regular-svg-icons"
import {faMartiniGlass} from "@fortawesome/free-solid-svg-icons";


function Navigation() {
    return (
        <nav>
                <NavLink to="/"><img src={logo} className="logo" alt="Logo"/></NavLink>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/">
                            <FontAwesomeIcon icon={faCircleQuestion} className="icon"/>
                            Surprise me!
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/cocktails">
                            <FontAwesomeIcon icon={faMartiniGlass} className="icon"/>
                            Cocktails
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/favourites">
                            <FontAwesomeIcon icon={faHeartRegular} className="icon"/>
                            Favourites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "active-menu-link" : "default-menu-link"}
                            to="/login">
                            <FontAwesomeIcon icon={faUser} className="icon"/>Sign In</NavLink>
                    </li>
                </ul>
        </nav>
    );
}

export default Navigation;