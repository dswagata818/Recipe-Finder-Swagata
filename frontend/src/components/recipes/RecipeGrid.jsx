import EmptyState from "../common/EmptyState.jsx";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeGrid({ recipes, favorites = [], onFavorite }) {
  if (recipes.length === 0) {
    return (
      <EmptyState
        title="No recipes found"
        message="Try a different search or clear your filters to see more delicious ideas."
      />
    );
  }

  const favoriteIds = new Set(favorites.map((favorite) => String(favorite.recipeId)));
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          isFavorite={favoriteIds.has(String(recipe._id))}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
