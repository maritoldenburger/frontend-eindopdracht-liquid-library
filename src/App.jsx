import "./app.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Cocktails from "./pages/cocktails/Cocktails.jsx";
import CocktailDetails from "./pages/cocktailDetails/CocktailDetails.jsx";
import Favourites from "./pages/favourites/Favourites.jsx";
import Login from "./pages/login/login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import SurpriseMeRedirect from "./components/surpriseMeRedirect/SurpriseMeRedirect.jsx";

function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cocktails" element={<Cocktails/>}/>
                <Route path="/cocktail/:id" element={<CocktailDetails/>}/>
                <Route path="/surprise" element={<SurpriseMeRedirect/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;