import "./NotFound.css"
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <>
            <h2>Oops... This page doesn't exist.</h2>
            <p><Link to="/">Take me back to the homepage.</Link></p>
        </>
    );
}

export default NotFound;