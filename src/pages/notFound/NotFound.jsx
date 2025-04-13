import "./NotFound.css"
import {Link} from "react-router-dom";
import Footer from "../../components/footer/Footer.jsx";

function NotFound() {
    return (
        <>
            <h3>Oops... This page doesn't exist.</h3>
            <p><Link to="/">Take me back to the homepage.</Link></p>
            <Footer />
        </>
    );
}

export default NotFound;