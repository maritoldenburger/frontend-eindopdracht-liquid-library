import React from "react";
import Header from "../../components/header/Header.jsx";
import Button from "../../components/button/Button.jsx";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Home() {
    return (
        <>
            <Header className="outer-container">
                <div className="inner-container">
                </div>
            </Header>
            <div className="inner-container">
                <Button
                >Browse more classics <FontAwesomeIcon icon={faChevronRight} className="button-icon"/></Button>
            </div>
        </>
    );
}

export default Home;