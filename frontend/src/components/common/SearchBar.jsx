import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, onSubmit, placeholder = "Search recipes or ingredients..." }) {
  return (
    <form className="search-bar" role="search" onSubmit={onSubmit}>
      <FiSearch aria-hidden="true" />
      <input
        aria-label="Search recipes by name or ingredient"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      <button className="button button-primary search-submit" type="submit">Search</button>
    </form>
  );
}
