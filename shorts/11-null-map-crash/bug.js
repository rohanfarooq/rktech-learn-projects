// TheMealDB's two answers:
//   found:    { meals: [ { strMeal: "Pizza", ... } ] }
//   no match: { meals: null }   // not []

export async function searchMeals(query) {
  const res = await fetch(url);
  const data = await res.json();
  return data.meals; // null when nothing matches
}

// Later:
meals.map((meal) => <Card />); // TypeError: Cannot read properties of null
