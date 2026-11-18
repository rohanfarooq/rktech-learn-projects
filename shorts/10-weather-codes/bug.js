// Open-Meteo (and many weather APIs) do not send the word "Rain".
// They send a WMO weather code — a number:
const current = { temperature: 12, weather_code: 61 };
// If you print weather_code, the screen says 61, not "Rain".
