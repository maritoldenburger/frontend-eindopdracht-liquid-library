import React from "react";
import "./Footer.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faPinterest, faTiktok} from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <footer>
            <div className="footer-content-wrapper">
                <p>© {new Date().getFullYear()} Liquid Library</p>
                <div className="footer-icons-wrapper">
                    <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} className="button-icon"/></a>
                    <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} className="button-icon"/></a>
                    <a href="https://pinterest.com/"><FontAwesomeIcon icon={faPinterest} className="button-icon"/></a>
                    <a href="https://www.tiktok.com/"><FontAwesomeIcon icon={faTiktok} className="button-icon"/></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;