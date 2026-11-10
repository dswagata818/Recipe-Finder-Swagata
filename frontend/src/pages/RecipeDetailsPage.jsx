import { useCallback, useEffect, useState } from "react";
import { FiArrowLeft, FiClock, FiHeart } from "react-icons/fi";
import { GiHerbsBundle } from "react-icons/gi";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { addFavorite, getFavorites, removeFavorite } from "../services/favoriteService.js";
import { getErrorMessage } from "../services/api.js";
import { getRecipeById } from "../services/recipeService.js";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const loadRecipe = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getRecipeById(id);
      setRecipe(result.recipe);
      if (isAuthenticated) {
        try {
          const favoriteResult = await getFavorites();
          setIsFavorite((favoriteResult.favorites || []).some(
            (favorite) => String(favorite.recipeId) === String(id),
          ));
        } catch (favoriteError) {
          setIsFavorite(false);
          setFeedback(getErrorMessage(favoriteError, "Favorite status is temporarily unavailable."));
        }
      } else {
        setIsFavorite(false);
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't load this recipe."));
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    loadRecipe();
  }, [loadRecipe]);

  async function toggleFavorite() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/recipes/${id}` } });
      return;
    }
    setFeedback("");
    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
        setFeedback("Removed from your favorites.");
      } else {
        await addFavorite(id);
        setIsFavorite(true);
        setFeedback("Saved to your favorites.");
      }
    } catch (requestError) {
      setFeedback(getErrorMessage(requestError, "We couldn't update your favorites."));
    }
  }

  if (loading) return <section className="page-container page-section"><LoadingSpinner label="Setting the table..." /></section>;
  if (error) return <section className="page-container page-section"><ErrorMessage message={error} onRetry={loadRecipe} /><Link className="button button-outline back-button" to="/recipes"><FiArrowLeft /> Back to recipes</Link></section>;
  if (!recipe) return null;

  return (
    <section className="page-container page-section detail-page">
      <Link className="back-link" to="/recipes"><FiArrowLeft aria-hidden="true" /> Back to recipes</Link>
      <div className="detail-hero">
        <div className={`detail-art ${recipe.category === "Vegetarian" ? "art-green" : "art-coral"}`}>
          <span className="detail-sun" />
          <div className="detail-plate"><span /><span /><span /><i /><i /></div>
          <span className="recipe-category detail-category">{recipe.category}</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">A recipe to remember</span>
          <h1>{recipe.name}</h1>
          <p className="detail-description">{recipe.description}</p>
          <div className="detail-meta"><span><FiClock aria-hidden="true" /> {recipe.cookingTime} minutes</span><span><GiHerbsBundle aria-hidden="true" /> {recipe.category}</span></div>
          <button className={`button ${isFavorite ? "button-outline" : "button-primary"}`} type="button" onClick={toggleFavorite}>
            <FiHeart aria-hidden="true" /> {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
          {feedback && <p className="inline-feedback" role="status">{feedback}</p>}
        </div>
      </div>
      <div className="detail-content">
        <section className="detail-panel">
          <span className="eyebrow">What you'll need</span>
          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {(recipe.ingredients || []).map((ingredient, index) => <li key={`${ingredient}-${index}`}><span className="ingredient-bullet">✓</span>{ingredient}</li>)}
          </ul>
        </section>
        <section className="detail-panel instructions-panel">
          <span className="eyebrow">Let's get cooking</span>
          <h2>Method</h2>
          <ol className="instruction-list">
            {(recipe.instructions || []).map((instruction, index) => <li key={`${index}-${instruction}`}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><p>{instruction}</p></li>)}
          </ol>
        </section>
      </div>
    </section>
  );
}
