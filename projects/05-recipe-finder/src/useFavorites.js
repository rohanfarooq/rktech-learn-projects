import { useEffect, useState } from "react";

const KEY = "recipe-finder-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((m) => m.idMeal === id);
  }

  function toggleFavorite(meal) {
    if (isFavorite(meal.idMeal)) {
      setFavorites(favorites.filter((m) => m.idMeal !== meal.idMeal));
    } else {
      const { idMeal, strMeal, strMealThumb, strArea, strCategory } = meal;
      const small = { idMeal, strMeal, strMealThumb, strArea, strCategory };
      setFavorites([...favorites, small]);
    }
  }

  return { favorites, isFavorite, toggleFavorite };
}
