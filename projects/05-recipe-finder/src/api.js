const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query, signal) {
  const url = `${BASE}/search.php?s=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMeal(id, signal) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  return data.meals?.[0] ?? null;
}

export function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) list.push({ name, measure });
  }
  return list;
}
