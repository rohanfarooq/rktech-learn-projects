// From the weather app in projects/02-weather-app/script.js
// Save the last result, convert in formatTemp(), and re-render.

let unit = "C";        // "C" or "F"
let lastData = null;   // the last place + weather we loaded

function formatTemp(celsius) {
  const value = unit === "C" ? celsius : (celsius * 9) / 5 + 32;
  return `${Math.round(value)}°${unit}`;
}

unitBtn.addEventListener("click", () => {
  unit = unit === "C" ? "F" : "C";
  unitBtn.textContent = unit === "C" ? "Show °F" : "Show °C";
  if (lastData) render();
});
