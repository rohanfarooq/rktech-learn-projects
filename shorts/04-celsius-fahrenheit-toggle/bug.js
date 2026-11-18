// Easy to get wrong: the toggle calls the weather API again.
unitBtn.addEventListener("click", () => {
  unit = unit === "C" ? "F" : "C";
  loadWeather(cityInput.value); // a second network request, just to change the label
});
