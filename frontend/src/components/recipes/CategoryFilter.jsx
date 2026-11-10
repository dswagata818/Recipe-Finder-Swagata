const categories = ["All", "Vegetarian", "Non-Vegetarian"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter recipes by category">
      {categories.map((category) => (
        <button
          className={`filter-chip ${value === category ? "active" : ""}`}
          key={category}
          onClick={() => onChange(category)}
          type="button"
          aria-pressed={value === category}
        >
          {category === "All" ? "All recipes" : category}
        </button>
      ))}
    </div>
  );
}
