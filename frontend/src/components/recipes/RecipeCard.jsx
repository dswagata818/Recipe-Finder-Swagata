import { FiClock, FiHeart, FiArrowUpRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RecipeCard({ recipe, isFavorite = false, onFavorite }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleFavorite() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/recipes/${recipe._id}` } });
      return;
    }
    onFavorite?.(recipe);
  }

  return (
    <article className="recipe-card">
      <div className={`recipe-art ${recipe.category === "Vegetarian" ? "art-green" : "art-coral"}`}>
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
        <span className="art-plate"><span className="art-plate-inner" /></span>
        <span className="recipe-category">{recipe.category}</span>
        <button
          className={`favorite-icon-button ${isFavorite ? "is-favorite" : ""}`}
          type="button"
          onClick={handleFavorite}
          aria-label={isFavorite ? `Remove ${recipe.name} from favorites` : `Add ${recipe.name} to favorites`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart aria-hidden="true" />
        </button>
      </div>
      <div className="recipe-card-body">
        <div className="recipe-card-meta"><FiClock aria-hidden="true" /> {recipe.cookingTime} min</div>
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <Link className="recipe-link" to={`/recipes/${recipe._id}`}>
          View recipe <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
