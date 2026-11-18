export default function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search meals, e.g. pasta"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      autoFocus
    />
  );
}
