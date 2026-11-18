// One request per key. Typing "chicken" (7 letters) fires 7 requests.
useEffect(() => {
  if (!query) return;
  searchMeals(query).then(setMeals);
}, [query]);
