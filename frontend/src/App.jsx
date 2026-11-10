import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RecipeDetailsPage from "./pages/RecipeDetailsPage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
