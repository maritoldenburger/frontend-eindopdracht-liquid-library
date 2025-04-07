import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import recepten from "./constants/recipes.json"; // JSON importeren
import "./styles.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecipeList recepten={recepten} />} />
                <Route path="/recept/:id" element={<RecipeDetail recepten={recepten} />} />
            </Routes>
        </Router>
    );
}

export default App;