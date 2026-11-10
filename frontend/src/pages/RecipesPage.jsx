import { useCallback, useEffect, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/recipes/CategoryFilter.jsx";
import RecipeGrid from "../components/recipes/RecipeGrid.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { addFavorite, getFavorites, removeFavorite } from "../services/favoriteService.js";
import { getErrorMessage } from "../services/api.js";
import { getRecipes } from "../services/recipeService.js";

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeSearch, setActiveSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "All";
    setSearch(urlSearch);
    setActiveSearch(urlSearch);
    setCategory(urlCategory);
  }, [searchParams]);

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = {};
    if (activeSearch.trim()) params.search = activeSearch.trim();
    if (category !== "All") params.category = category;
    try {
      const result = await getRecipes(params);
      setRecipes(result.recipes || []);
      if (isAuthenticated) {
        try {
          const favoriteResult = await getFavorites();
          setFavorites(favoriteResult.favorites || []);
        } catch {
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't load these recipes."));
    } finally {
      setLoading(false);
    }
  }, [activeSearch, category, isAuthenticated]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  function handleSearch(event) {
    event.preventDefault();
    const next = new URLSearchParams();
    if (search.trim()) next.set("search", search.trim());
    if (category !== "All") next.set("category", category);
    setSearchParams(next);
    setActiveSearch(search.trim());
  }

  function changeCategory(value) {
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value === "All") next.delete("category");
    else next.set("category", value);
    if (search.trim()) next.set("search", search.trim());
    setSearchParams(next);
    setActiveSearch(search.trim());
  }

  function clearFilters() {
    setSearch("");
    setActiveSearch("");
    setCategory("All");
    setSearchParams({});
  }

  async function toggleFavorite(recipe) {
    setFeedback("");
    try {
      const existing = favorites.find((item) => String(item.recipeId) === String(recipe._id));
      if (existing) {
        await removeFavorite(recipe._id);
        setFavorites((current) => current.filter((item) => String(item.recipeId) !== String(recipe._id)));
        setFeedback(`${recipe.name} removed from your favorites.`);
      } else {
        const result = await addFavorite(recipe._id);
        setFavorites((current) => [...current, result.favorite]);
        setFeedback(`${recipe.name} saved to your favorites.`);
      }
    } catch (requestError) {
      setFeedback(getErrorMessage(requestError, "We couldn't update your favorites."));
    }
  }

  const hasFilters = Boolean(search.trim() || activeSearch.trim()) || category !== "All";

  return (
    <section className="page-container page-section">
      <div className="page-intro">
        <span className="eyebrow">The recipe collection</span>
        <h1>Find your next <em>favorite.</em></h1>
        <p>Browse comforting classics and fresh new ideas for every kind of table.</p>
      </div>
      <div className="recipe-controls">
        <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} />
        <div className="filter-toolbar">
          <div className="filter-label"><FiSliders aria-hidden="true" /> Filter by</div>
          <CategoryFilter value={category} onChange={changeCategory} />
          {hasFilters && <button className="text-button clear-filter" type="button" onClick={clearFilters}>Clear filters</button>}
        </div>
      </div>
      <div className="results-heading">
        <h2>{category === "All" ? "All recipes" : category}</h2>
        {!loading && <span>{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}</span>}
      </div>
      {feedback && <p className="inline-feedback" role="status">{feedback}</p>}
      {loading ? <LoadingSpinner label="Gathering recipes..." /> : error ? <ErrorMessage message={error} onRetry={loadRecipes} /> : <RecipeGrid recipes={recipes} favorites={favorites} onFavorite={toggleFavorite} />}
    </section>
  );
}
