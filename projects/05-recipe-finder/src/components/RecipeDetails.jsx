import { useEffect, useState } from "react";
import { getMeal, getIngredients } from "../api.js";

export default function RecipeDetails({ id, onClose, isFavorite, onToggle }) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    getMeal(id, controller.signal)
      .then(setMeal)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, [id]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="details" onClick={(e) => e.stopPropagation()}>
        <button className="close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        {error && <p className="status error">{error}</p>}
        {!meal && !error && <p className="status">Loading recipe...</p>}
        {meal && (
          <>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h2>{meal.strMeal}</h2>
            <p className="tags">
              {meal.strArea} · {meal.strCategory}
            </p>
            <button className="fav-big" onClick={() => onToggle(meal)}>
              {isFavorite(meal.idMeal) ? "♥ Saved" : "♡ Save to favorites"}
            </button>
            <h3>Ingredients</h3>
            <ul className="ingredients">
              {getIngredients(meal).map((item) => (
                <li key={item.name}>
                  <strong>{item.measure}</strong> {item.name}
                </li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p className="instructions">{meal.strInstructions}</p>
          </>
        )}
      </div>
    </div>
  );
}
