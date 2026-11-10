import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import EmptyState from "../components/common/EmptyState.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { getErrorMessage } from "../services/api.js";
import { getFavorites, removeFavorite } from "../services/favoriteService.js";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getFavorites();
      setFavorites(result.favorites || []);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't load your favorites."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  async function handleRemove(recipeId) {
    try {
      await removeFavorite(recipeId);
      setFavorites((current) => current.filter((favorite) => favorite.recipeId !== recipeId));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't remove this favorite."));
    }
  }

  return (
    <section className="page-container page-section">
      <div className="page-intro favorites-intro">
        <span className="eyebrow">Kept close, cooked often</span>
        <h1>Your <em>favorites.</em></h1>
        <p>A little collection of the recipes you want to make again.</p>
      </div>
      {loading ? <LoadingSpinner label="Opening your recipe box..." /> : error ? <ErrorMessage message={error} onRetry={loadFavorites} /> : favorites.length === 0 ? (
        <EmptyState
          title="Your recipe box is ready"
          message="Save a recipe you love and it will be waiting here next time."
          action={<Link className="button button-primary" to="/recipes">Explore recipes</Link>}
        />
      ) : (
        <div className="recipe-grid favorites-grid">
          {favorites.map((favorite) => (
            <article className="recipe-card favorite-card" key={favorite._id}>
              <div className={`recipe-art ${favorite.category === "Vegetarian" ? "art-green" : "art-coral"}`}>
                <span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" />
                <span className="art-plate"><span className="art-plate-inner" /></span>
                <span className="recipe-category">{favorite.category || "Recipe"}</span>
                <button className="favorite-icon-button is-favorite" type="button" onClick={() => handleRemove(favorite.recipeId)} aria-label={`Remove ${favorite.recipeName} from favorites`} title="Remove from favorites"><FiHeart aria-hidden="true" /></button>
              </div>
              <div className="recipe-card-body">
                <div className="recipe-card-meta"><FiHeart aria-hidden="true" /> Saved for later</div>
                <h3>{favorite.recipeName}</h3>
                <p>A favorite to bring back to your table.</p>
                <Link className="recipe-link" to={`/recipes/${favorite.recipeId}`}>View recipe <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
