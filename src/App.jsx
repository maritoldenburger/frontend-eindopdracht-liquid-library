import "./app.css";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Cocktails from "./pages/cocktails/Cocktails.jsx";
import CocktailDetails from "./pages/cocktailDetails/CocktailDetails.jsx";
import Favourites from "./pages/favourites/Favourites.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/Register.jsx";
import SurpriseMeRedirect from "./components/surpriseMeRedirect/SurpriseMeRedirect.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cocktails" element={<Cocktails/>}/>
                <Route path="/cocktail/:id" element={<CocktailDetails/>}/>
                <Route path="/surprise" element={<SurpriseMeRedirect/>}/>
                <Route path="/favourites" element={isAuth ? <Favourites/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={isAuth ? <ProfilePage/> : <Navigate to="/login"/>}
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;