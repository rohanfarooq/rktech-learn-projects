import { useEffect, useState } from "react";
import { searchMeals } from "./api.js";
import { useDebounce } from "./useDebounce.js";
import { useFavorites } from "./useFavorites.js";
import SearchBar from "./components/SearchBar.jsx";
import MealList from "./components/MealList.jsx";
import RecipeDetails from "./components/RecipeDetails.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({ query: "", meals: [], error: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [tab, setTab] = useState("search");
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const debouncedQuery = useDebounce(query.trim(), 500);

  useEffect(() => {
    if (!debouncedQuery) return;
    const controller = new AbortController();
    searchMeals(debouncedQuery, controller.signal)
      .then((meals) => setResult({ query: debouncedQuery, meals, error: "" }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        const error = "Could not load recipes. Check your connection.";
        setResult({ query: debouncedQuery, meals: [], error });
      });
    return () => controller.abort();
  }, [debouncedQuery]);

  const loading = debouncedQuery !== "" && result.query !== debouncedQuery;
  const meals = debouncedQuery && !loading ? result.meals : [];
  const error = loading ? "" : result.error;
  const shown = tab === "search" ? meals : favorites;

  return (
    <div className="app">
      <header>
        <h1>Recipe Finder</h1>
        <nav>
          <button
            className={tab === "search" ? "active" : ""}
            onClick={() => setTab("search")}
          >
            Search
          </button>
          <button
            className={tab === "favorites" ? "active" : ""}
            onClick={() => setTab("favorites")}
          >
            Favorites ({favorites.length})
          </button>
        </nav>
      </header>

      {tab === "search" && <SearchBar query={query} setQuery={setQuery} />}

      {tab === "search" && loading && <p className="status">Loading...</p>}
      {tab === "search" && error && <p className="status error">{error}</p>}
      {tab === "search" && !debouncedQuery && (
        <p className="status">Type a meal name to start searching.</p>
      )}
      {tab === "search" && debouncedQuery && !loading && !error &&
        meals.length === 0 && (
          <p className="status">No recipes found for "{debouncedQuery}".</p>
        )}
      {tab === "favorites" && favorites.length === 0 && (
        <p className="status">No favorites yet. Tap ♡ on a recipe.</p>
      )}

      {!(tab === "search" && (loading || error)) && (
        <MealList
          meals={shown}
          onOpen={setSelectedId}
          isFavorite={isFavorite}
          onToggle={toggleFavorite}
        />
      )}

      {selectedId && (
        <RecipeDetails
          id={selectedId}
          onClose={() => setSelectedId(null)}
          isFavorite={isFavorite}
          onToggle={toggleFavorite}
        />
      )}
    </div>
  );
}
