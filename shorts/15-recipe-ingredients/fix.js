// From the recipe finder in projects/05-recipe-finder/src/api.js

export function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) list.push({ name, measure });
  }
  return list;
}

// RecipeDetails.jsx
{getIngredients(meal).map((item) => (
  <li key={item.name}>
    <strong>{item.measure}</strong> {item.name}
  </li>
))}
