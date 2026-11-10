import { useEffect, useState } from "react";
import { FiArrowRight, FiClock, FiSearch, FiStar } from "react-icons/fi";
import { GiCookingPot, GiHerbsBundle } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import RecipeGrid from "../components/recipes/RecipeGrid.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";
import { getRecipes } from "../services/recipeService.js";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function loadRecipes() {
    setLoading(true);
    setError("");
    try {
      const result = await getRecipes();
      setRecipes(result.recipes || []);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't load recipes right now."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  const latest = [...recipes].sort(
    (first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0),
  );
  const featured = [...recipes]
    .sort((first, second) => first.cookingTime - second.cookingTime)
    .slice(0, 3);

  function search(event) {
    event.preventDefault();
    navigate(`/recipes${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`);
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-inner page-container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> A little inspiration for your table</span>
            <h1>Find joy in<br /><em>every bite.</em></h1>
            <p>Discover delicious recipes made for real life, shared around the table, and remembered long after the last bite.</p>
            <SearchBar value={query} onChange={setQuery} onSubmit={search} />
            <div className="hero-proof"><span><FiStar aria-hidden="true" /> Thoughtful recipes</span><span><FiClock aria-hidden="true" /> Everyday cooking</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a freshly prepared meal" role="img">
            <div className="hero-art-sun" />
            <div className="hero-art-label"><GiCookingPot aria-hidden="true" /><span>Made to be shared</span></div>
            <div className="hero-art-plate"><div className="hero-art-food"><span /><span /><span /><i /><i /><b /></div></div>
            <div className="hero-art-leaf leaf-one"><GiHerbsBundle /></div>
            <div className="hero-art-leaf leaf-two"><GiHerbsBundle /></div>
            <div className="hero-art-caption"><strong>Gather around</strong><small>Something good is cooking</small></div>
          </div>
        </div>
        <div className="hero-bottom page-container">
          <span>Find a new favorite</span><span className="hero-scroll-line" /><span>Scroll to explore</span>
        </div>
      </section>

      <section className="section-block page-container category-shortcuts">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow">What's on your mind?</span><h2>Start with a craving</h2></div>
          <Link className="subtle-link" to="/recipes">Browse all recipes <FiArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="category-cards">
          <Link className="category-card category-card-green" to="/recipes?category=Vegetarian">
            <span className="category-icon"><GiHerbsBundle aria-hidden="true" /></span><span className="category-copy"><strong>Plant-forward</strong><small>Fresh vegetarian favorites</small></span><FiArrowRight className="category-arrow" />
          </Link>
          <Link className="category-card category-card-peach" to="/recipes?category=Non-Vegetarian">
            <span className="category-icon"><GiCookingPot aria-hidden="true" /></span><span className="category-copy"><strong>Hearty &amp; satisfying</strong><small>Non-vegetarian comfort food</small></span><FiArrowRight className="category-arrow" />
          </Link>
        </div>
      </section>

      <section className="section-block section-tinted">
        <div className="page-container">
          <div className="section-heading">
            <div><span className="eyebrow">A good place to begin</span><h2>Quick &amp; lovely</h2><p>Delicious ideas for the days when time is short and appetites are big.</p></div>
            <Link className="button button-outline" to="/recipes">Explore recipes <FiArrowRight aria-hidden="true" /></Link>
          </div>
          {loading ? <LoadingSpinner label="Finding something delicious..." /> : error ? <ErrorMessage message={error} onRetry={loadRecipes} /> : featured.length ? <RecipeGrid recipes={featured} /> : <EmptyState title="Your recipe box is waiting" message="Recipes will appear here as soon as they're available." />}
        </div>
      </section>

      <section className="section-block page-container latest-section">
        <div className="section-heading">
          <div><span className="eyebrow">Fresh from the kitchen</span><h2>Latest recipes</h2><p>New inspiration for your next home-cooked meal.</p></div>
          <Link className="subtle-link" to="/recipes">See all recipes <FiArrowRight aria-hidden="true" /></Link>
        </div>
        {loading ? <LoadingSpinner label="Loading the latest recipes..." /> : error ? <ErrorMessage message={error} onRetry={loadRecipes} /> : <RecipeGrid recipes={latest.slice(0, 3)} />}
      </section>

      <section className="cta-section page-container">
        <div className="cta-card">
          <div className="cta-ornament" aria-hidden="true">✳</div>
          <span className="eyebrow">Your kitchen, your story</span>
          <h2>Good things happen<br />around the table.</h2>
          <p>Save the recipes you love and make your next meal one to remember.</p>
          <Link className="button button-light" to={isAuthenticated ? "/favorites" : "/register"}>
            {isAuthenticated ? "See your favorites" : "Join the table"} <FiArrowRight aria-hidden="true" />
          </Link>
          <FiSearch className="cta-art-icon cta-search" aria-hidden="true" />
          <GiCookingPot className="cta-art-icon cta-pot" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
