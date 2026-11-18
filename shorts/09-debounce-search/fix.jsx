// From the recipe finder in projects/05-recipe-finder

// useDebounce.js — wait until typing stops
import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// App.jsx — use it, and cancel an in-flight request
const debouncedQuery = useDebounce(query.trim(), 500);

useEffect(() => {
  if (!debouncedQuery) return;
  const controller = new AbortController();
  searchMeals(debouncedQuery, controller.signal)
    .then((meals) => setResult({ query: debouncedQuery, meals, error: "" }))
    .catch((err) => {
      if (err.name === "AbortError") return;
      setResult({ query: debouncedQuery, meals: [], error: "Could not load recipes. Check your connection." });
    });
  return () => controller.abort();
}, [debouncedQuery]);
