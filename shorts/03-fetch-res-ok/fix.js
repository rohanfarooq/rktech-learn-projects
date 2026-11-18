// From the weather app in projects/02-weather-app/script.js

async function getJSON(url) {
  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error("Network error. Check your internet and try again.");
  }
  if (!res.ok) throw new Error(`The weather service said ${res.status}. Try again.`);
  return res.json();
}
