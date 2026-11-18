// From the portfolio in projects/06-portfolio/script.js

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("theme", theme);
}

themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

// Read it back on load (default to light if nothing was saved)
setTheme(localStorage.getItem("theme") || "light");
