// From the recipe finder in projects/05-recipe-finder/src/api.js
// The one-line fix: treat null like an empty list.

export async function searchMeals(query, signal) {
  const url = `${BASE}/search.php?s=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  return data.meals ?? [];
}
