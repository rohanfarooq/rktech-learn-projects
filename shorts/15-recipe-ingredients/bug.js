// TheMealDB sends up to 20 numbered fields, and unused ones are empty:
const meal = {
  strIngredient1: "Chicken",
  strMeasure1: "1 kg",
  strIngredient2: "Salt",
  strMeasure2: "1 tsp",
  strIngredient3: "",
  strMeasure3: "",
  // ... through strIngredient20
};

// Writing strIngredient1, strIngredient2, ... by hand is messy,
// and you would still render the empty ones.
