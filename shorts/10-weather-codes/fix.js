// From the weather app in projects/02-weather-app/script.js

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

// In render():
const { icon, text } = describe(weather.current.weather_code);
// then use icons/${icon}.svg and the text label
