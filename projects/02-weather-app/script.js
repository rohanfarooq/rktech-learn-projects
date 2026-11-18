const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city");
const statusEl = document.querySelector("#status");
const currentEl = document.querySelector("#current");
const forecastEl = document.querySelector("#forecast");
const unitBtn = document.querySelector("#unit-btn");

let unit = "C";        // "C" or "F"
let lastData = null;   // the last place + weather we loaded

function showStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

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

async function getCoords(city) {
  const params = new URLSearchParams({ name: city, count: 1 });
  const data = await getJSON(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  if (!data.results) throw new Error(`Sorry, no city called "${city}" was found.`);
  return data.results[0];
}

async function getWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: 5,
  });
  return getJSON(`https://api.open-meteo.com/v1/forecast?${params}`);
}

function describe(code) {
  if (code === 0) return { icon: "sun", text: "Clear sky" };
  if (code <= 2) return { icon: "partly", text: "Partly cloudy" };
  if (code === 3) return { icon: "cloud", text: "Cloudy" };
  if (code <= 48) return { icon: "fog", text: "Fog" };
  if (code <= 57) return { icon: "rain", text: "Drizzle" };
  if (code <= 67) return { icon: "rain", text: "Rain" };
  if (code <= 77) return { icon: "snow", text: "Snow" };
  if (code <= 82) return { icon: "rain", text: "Rain showers" };
  if (code <= 86) return { icon: "snow", text: "Snow showers" };
  return { icon: "storm", text: "Thunderstorm" };
}

function formatTemp(celsius) {
  const value = unit === "C" ? celsius : (celsius * 9) / 5 + 32;
  return `${Math.round(value)}°${unit}`;
}

function render() {
  const { place, weather } = lastData;
  const now = describe(weather.current.weather_code);
  currentEl.innerHTML = `
    <h2>${place.name}, ${place.country}</h2>
    <img src="icons/${now.icon}.svg" alt="${now.text}" width="96" height="96" />
    <p class="temp">${formatTemp(weather.current.temperature_2m)}</p>
    <p>${now.text}, wind ${Math.round(weather.current.wind_speed_10m)} km/h</p>
  `;
  forecastEl.innerHTML = weather.daily.time.map((date, i) => {
    const day = describe(weather.daily.weather_code[i]);
    const name = new Date(`${date}T12:00`)
      .toLocaleDateString("en-US", { weekday: "short" });
    return `
      <div class="day">
        <p><b>${name}</b></p>
        <img src="icons/${day.icon}.svg" alt="${day.text}" width="44" height="44" />
        <p>${formatTemp(weather.daily.temperature_2m_max[i])}</p>
        <p>${formatTemp(weather.daily.temperature_2m_min[i])}</p>
      </div>`;
  }).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return showStatus("Please type a city name.", true);

  const button = form.querySelector("button");
  button.disabled = true;
  showStatus("Loading...");
  try {
    const place = await getCoords(city);
    const weather = await getWeather(place.latitude, place.longitude);
    lastData = { place, weather };
    render();
    showStatus("");
  } catch (err) {
    lastData = null;
    currentEl.innerHTML = "";
    forecastEl.innerHTML = "";
    showStatus(err.message, true);
  } finally {
    button.disabled = false;
  }
});

unitBtn.addEventListener("click", () => {
  unit = unit === "C" ? "F" : "C";
  unitBtn.textContent = unit === "C" ? "Show °F" : "Show °C";
  if (lastData) render();
});
