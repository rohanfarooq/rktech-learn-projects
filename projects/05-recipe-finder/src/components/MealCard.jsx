export default function MealCard({ meal, onOpen, isFavorite, onToggle }) {
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      <div className="card-body">
        <h3>{meal.strMeal}</h3>
        <p className="tags">
          {meal.strArea} · {meal.strCategory}
        </p>
        <div className="card-actions">
          <button onClick={() => onOpen(meal.idMeal)}>View recipe</button>
          <button
            className="fav"
            aria-label="Toggle favorite"
            onClick={() => onToggle(meal)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}
