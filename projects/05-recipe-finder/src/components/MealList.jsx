import MealCard from "./MealCard.jsx";

export default function MealList({ meals, onOpen, isFavorite, onToggle }) {
  return (
    <div className="grid">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          onOpen={onOpen}
          isFavorite={isFavorite(meal.idMeal)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
