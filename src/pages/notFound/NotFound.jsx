import "./NotFound.css"
import {Link} from "react-router-dom";
import Footer from "../../components/footer/Footer.jsx";

function NotFound() {
    return (
        <>
            <div className="inner-container not-found-container">
                <h3>Oops... This page doesn't exist.</h3>
                <p className="not-found-link"><Link to="/">Take me back to the homepage.</Link></p>
            </div>
            <Footer/></>

    );
}

export default NotFound;